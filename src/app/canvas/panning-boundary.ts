import { BaseSchemes, NodeEditor, Root } from 'rete';
import { AreaPlugin, AreaExtensions, Area2D } from 'rete-area-plugin';
import { getFrameWeight } from './frame';
import { animate, watchPointerMove } from './utils';

type SelectorEntity = ReturnType<
  ReturnType<typeof AreaExtensions.selector>['isPicked']
> extends (node: infer T) => boolean
  ? T
  : never;
type Props = {
  editor: NodeEditor<BaseSchemes>;
  area: AreaPlugin<any, any>;
  selector: ReturnType<typeof AreaExtensions.selector>;
  padding?: number;
  intensity?: number;
};

export function setupPanningBoundary<S extends BaseSchemes, K extends object>({
  editor,
  area,
  selector,
  padding = 30,
  intensity = 2,
}: Props) {
  const pointermove = watchPointerMove();

  const ticker = animate(async () => {
    const { clientX, clientY, pageX, pageY } = pointermove.getEvent(); // Get pointer position
    const weights = getFrameWeight(
      clientX,
      clientY,
      area.container.getBoundingClientRect(),
      padding
    );

    // Calculate the panning velocity
    const velocity = {
      x: (weights.left - weights.right) * intensity,
      y: (weights.top - weights.bottom) * intensity,
    };

    //console.log('Calculated velocity:', velocity);

    // const pickedNode = editor.getNodes().find((n) => {
    //   const isPicked = selector.isPicked({ label: 'B', id: n.id });
    //   console.log(`Node ${n.id} isPicked:`, isPicked);
    //   return isPicked;
    // });

    const pickedNode = editor.getNodes().find((n) => {
      console.log('Node structure:', n);

      // Use the selected property instead of selector.isPicked
      const isPicked = (n as any).selected;
      //console.log(`Node ${n.id} selected:`, isPicked);
      return isPicked;
    });

    //console.log('Picked node:', pickedNode);

    if (pickedNode) {
      // Proceed with panning or other logic
      //console.log('Node selected for panning:', pickedNode);
    } else {
      //console.log('No node picked for panning');
    }

    if (!pickedNode) {
      //console.warn('No node is picked for panning');
      return;
    }

    // Get the node's view from the area
    const view = area.nodeViews.get(pickedNode.id);

    if (!view) {
      //console.warn('No view found for picked node:', pickedNode.id);
      return;
    }

    const { dragHandler, position } = view;

    // Set pointer start and start position
    (dragHandler as any).pointerStart = {
      x: pageX + velocity.x,
      y: pageY + velocity.y,
    };
    (dragHandler as any).startPosition = {
      ...(dragHandler as any).config.getCurrentPosition(),
    };

    // Get the current area transformation (zoom, translation)
    const { transform } = area.area;

    // Adjust node position with respect to the velocity
    const x = position.x - velocity.x / transform.k;
    const y = position.y - velocity.y / transform.k;

    //console.log('New node position:', { x, y });

    // Perform the translation for the selected node and the overall area
    await Promise.all([
      area.area.translate(transform.x + velocity.x, transform.y + velocity.y),
      area.translate(pickedNode.id, { x, y }),
    ]);

    // console.log('Panning applied to area and node');
  });

  // Start/Stop the ticker based on node picking and dragging events
  area.addPipe((context) => {
    if (context.type === 'nodepicked') {
      //console.log('Node picked, starting ticker');
      ticker.start();
    }
    if (context.type === 'nodedragged') {
      //  console.log('Node dragged, stopping ticker');
      ticker.stop();
    }
    return context;
  });

  // Return the cleanup function
  return {
    destroy() {
      pointermove.destroy(); // Clean up pointer movement tracking
      ticker.stop(); // Stop the ticker when destroyed
    },
  };
}

// export function setupPanningBoundary<S extends BaseSchemes, K extends object>({
//   editor,
//   area,
//   selector,
//   padding = 30,
//   intensity = 2,
// }: Props) {
//   const pointermove = watchPointerMove();

//   const ticker = animate(async () => {
//     const { clientX, clientY, pageX, pageY } = pointermove.getEvent(); // Get pointer position
//     const weights = getFrameWeight(
//       clientX,
//       clientY,
//       area.container.getBoundingClientRect(),
//       padding
//     );

//     const velocity = {
//       x: (weights.left - weights.right) * intensity,
//       y: (weights.top - weights.bottom) * intensity,
//     };

//     console.log('Calculated velocity:', velocity);

//     // Temporarily manually pick the first node for testing
//     const pickedNode = editor.getNodes()[0]; // Manually select the first node for now
//     console.log('Manually picked node:', pickedNode);

//     if (!pickedNode) {
//       console.warn('No node is manually picked for panning');
//       return;
//     }

//     // Get the node's view from the area
//     const view = area.nodeViews.get(pickedNode.id);
//     if (!view) {
//       console.warn('No view found for manually picked node:', pickedNode.id);
//       return;
//     }

//     const { dragHandler, position } = view;

//     // Set pointer start and start position (fix any type issues with `as any`)
//     (dragHandler as any).pointerStart = {
//       x: pageX + velocity.x,
//       y: pageY + velocity.y,
//     };
//     (dragHandler as any).startPosition = {
//       ...(dragHandler as any).config.getCurrentPosition(),
//     };

//     // Get the current area transformation (zoom, translation)
//     const { transform } = area.area;

//     // Adjust node position with respect to the velocity
//     const x = position.x - velocity.x / transform.k;
//     const y = position.y - velocity.y / transform.k;

//     console.log('New node position:', { x, y });

//     // Perform the translation for the selected node and the overall area
//     await Promise.all([
//       area.area.translate(transform.x + velocity.x, transform.y + velocity.y),
//       area.translate(pickedNode.id, { x, y }),
//     ]);

//     console.log('Panning applied to area and node');
//   });

//   // Start/Stop the ticker based on node picking and dragging events
//   // Check for node picked event
//   area.addPipe((context) => {
//     if (context.type === 'nodepicked') {
//       console.log('Node picked event triggered:', context);
//       ticker.start();
//     }
//     if (context.type === 'nodedragged') {
//       console.log('Node dragged event triggered:', context);
//       ticker.stop();
//     }
//     return context;
//   });

//   // Return the cleanup function
//   return {
//     destroy() {
//       pointermove.destroy(); // Clean up pointer movement tracking
//       ticker.stop(); // Stop the ticker when destroyed
//     },
//   };
// }
