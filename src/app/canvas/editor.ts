import { Injector } from '@angular/core';
import { NodeEditor, GetSchemes, ClassicPreset } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from 'rete-connection-plugin';
import { AngularPlugin, Presets, AngularArea2D } from 'rete-angular-plugin/16';

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = AngularArea2D<Schemes>;

let nodeId = 0;

export async function createEditor(container: HTMLElement, injector: Injector) {
  const socket = new ClassicPreset.Socket('socket');

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new AngularPlugin<Schemes, AreaExtra>({ injector });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(Presets.classic.setup());
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);

  // Create Node A with Output 'out'
  const a = new ClassicPreset.Node('A');
  a.addControl(
    'a',
    new ClassicPreset.InputControl('text', { initial: 'hello' })
  );
  a.addOutput('out', new ClassicPreset.Output(socket));
  await editor.addNode(a);

  // Create Node B with Input 'in'
  const b = new ClassicPreset.Node('B');
  b.addControl(
    'b',
    new ClassicPreset.InputControl('text', { initial: 'hello' })
  );
  b.addInput('in', new ClassicPreset.Input(socket));
  await editor.addNode(b);

  // Move Node B to position
  await area.translate(b.id, { x: 320, y: 0 });

  // Create Connection between Node A's 'out' and Node B's 'in'
  await editor.addConnection(new ClassicPreset.Connection(a, 'out', b, 'in'));

  AreaExtensions.zoomAt(area, editor.getNodes());

  const addNode = async (name: string, x: number, y: number) => {
    const node = new ClassicPreset.Node(name);
    node.addControl(
      'text',
      new ClassicPreset.InputControl('text', { initial: name })
    );
    node.addInput('in', new ClassicPreset.Input(socket));
    node.addOutput('out', new ClassicPreset.Output(socket));
    await editor.addNode(node);
    await area.translate(node.id, { x, y });
    return node;
  };

  return {
    destroy: () => area.destroy(),
    addNode,
  };
}
