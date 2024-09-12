import { Injector } from '@angular/core';
import { NodeEditor, GetSchemes, ClassicPreset } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from 'rete-connection-plugin';
import { AngularPlugin, Presets, AngularArea2D } from 'rete-angular-plugin/16';
import { CounterControlComponent } from '../counter-control/counter-control.component';
import { RemoveConnectionsButtonControl } from '../controls/remove-connections-button.control';
import { RemoveConnectionsButtonComponent } from '../remove-connections-button/remove-connections-button.component';
import { setupPanningBoundary } from './panning-boundary';
import { ConnectionButtonComponent } from '../connection-button/connection-button.component';
import { ConnectionButtonControl } from '../controls/connection-button-control';

// Add these new interfaces
interface SimpleNodeData {
  id: string;
  name: string;
  position: { x: number; y: number };
  hasInput: boolean;
}

interface SimpleConnectionData {
  sourceId: string;
  targetId: string;
}

interface SimpleGraphData {
  nodes: SimpleNodeData[];
  connections: SimpleConnectionData[];
}

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = AngularArea2D<Schemes>;
type Area = AreaPlugin<Schemes, AreaExtra>;

export async function createEditor(container: HTMLElement, injector: Injector) {
  const socket = new ClassicPreset.Socket('socket');

  // Create editor and plugins
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new AngularPlugin<Schemes, AreaExtra>({ injector });

  const selector = AreaExtensions.selector();
  // Configure area extensions
  AreaExtensions.selectableNodes(area, selector, {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  const panningBoundary = setupPanningBoundary({
    editor,
    area,
    selector: AreaExtensions.selector(),
    padding: 50,
    intensity: 3,
  });

  // Add presets
  render.addPreset(Presets.classic.setup());
  connection.addPreset(ConnectionPresets.classic.setup());
  render.addPreset(
    Presets.classic.setup({
      customize: {
        control: (data) => {
          if (data.payload instanceof RemoveConnectionsButtonControl) {
            return RemoveConnectionsButtonComponent;
          }
          return null;
        },
      },
    })
  );
  // render.addPreset(
  //   Presets.classic.setup({
  //     customize: {
  //       control(data) {
  //         if (data.payload instanceof ConnectionButtonControl) {
  //           return ConnectionButtonComponent;
  //         }
  //         return null;
  //       },
  //     },
  //   })
  // );

  render.addPreset(
    Presets.classic.setup({
      customize: {
        control: (data) => {
          if (data.payload instanceof ConnectionButtonControl) {
            return ConnectionButtonComponent;
          }
          return null;
        },
      },
    })
  );

  // Use plugins
  editor.use(area);
  area.use(connection);
  area.use(render);

  // Basic node setup
  const nodeA = createNode('A', 'hello', socket, true);
  const nodeB = createNode('B', 'hello', socket, true); // true indicates it has an input

  await editor.addNode(nodeA);
  await editor.addNode(nodeB);

  await area.translate(nodeB.id, { x: 320, y: 0 });

  // Create Connection between Node A's 'out' and Node B's 'in'
  await editor.addConnection(
    new ClassicPreset.Connection(nodeA, 'out', nodeB, 'in')
  );

  AreaExtensions.zoomAt(area, editor.getNodes());

  // Function to create a node
  function createNode(
    name: string,
    initialValue: string,
    socket: ClassicPreset.Socket,
    hasInput: boolean = true
  ) {
    const node = new ClassicPreset.Node(name);

    console.log('Creating node', node);

    // Attach custom CounterControlComponent to the node
    node.addControl('counter', new CounterControlComponent());

    node.addControl(
      'remove-connections',
      new RemoveConnectionsButtonControl(editor, 'remove-connections', node)
    );

    node.addControl(
      'text',
      new ClassicPreset.InputControl('text', { initial: initialValue })
    );

    node.addControl(
      'connect',
      new ConnectionButtonControl(editor, 'connect', node, injector)
    );

    if (hasInput) {
      node.addInput('in', new ClassicPreset.Input(socket));
    }
    node.addOutput('out', new ClassicPreset.Output(socket));
    return node;
  }

  // Function to add a new node dynamically
  const addNode = async (name: string, x: number, y: number) => {
    const node = createNode(name, name, socket);
    await editor.addNode(node);
    await area.translate(node.id, { x, y });
    return node;
  };

  // Add these new functions
  const importSimpleGraph = async (graphData: SimpleGraphData) => {
    for (const nodeData of graphData.nodes) {
      const node = createNode(
        nodeData.name,
        nodeData.name,
        socket,
        nodeData.hasInput
      );
      await editor.addNode(node);
      await area.translate(node.id, nodeData.position);
    }

    for (const connData of graphData.connections) {
      const source = editor
        .getNodes()
        .find((node) => node.label === connData.sourceId);
      const target = editor
        .getNodes()
        .find((node) => node.label === connData.targetId);
      if (source && target) {
        await editor.addConnection(
          new ClassicPreset.Connection(source, 'out', target, 'in')
        );
      }
    }

    AreaExtensions.zoomAt(area, editor.getNodes());
  };

  const exportSimpleGraph = (): SimpleGraphData => {
    const nodes = editor.getNodes();
    const connections = editor.getConnections();

    return {
      nodes: nodes.map((node) => ({
        id: node.id,
        name: node.label,
        position: area.nodeViews.get(node.id)?.position || { x: 0, y: 0 },
        hasInput: 'in' in node.inputs,
      })),
      connections: connections.map((conn) => ({
        sourceId: (editor.getNode(conn.source) as ClassicPreset.Node).label,
        targetId: (editor.getNode(conn.target) as ClassicPreset.Node).label,
      })),
    };
  };

  const clear = () => {
    editor.clear();
    AreaExtensions.zoomAt(area, editor.getNodes());
  };

  return {
    destroy: () => {
      area.destroy();
      panningBoundary.destroy();
    },
    addNode,
    zoomToFit: () => AreaExtensions.zoomAt(area, editor.getNodes()),
    importSimpleGraph,
    exportSimpleGraph,
    clear,
  };
}
