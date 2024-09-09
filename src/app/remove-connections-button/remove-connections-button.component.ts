import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NodeEditor, ClassicPreset, GetSchemes } from 'rete';

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;

@Component({
  selector: 'app-remove-connections-button',
  templateUrl: './remove-connections-button.component.html',
  styleUrls: ['./remove-connections-button.component.scss'],
})
export class RemoveConnectionsButtonComponent implements OnInit {
  @Input() data:
    | { editor: NodeEditor<any>; node: ClassicPreset.Node }
    | undefined;

  ngOnInit() {
    console.log('RemoveConnectionsButtonComponent initialized', this.data);
  }

  removeConnections() {
    console.log('removeConnections called', { node: this.data?.node });
    if (!this.data || !this.data.node || !this.data.editor) {
      console.error('Node or editor is undefined');
      return;
    }
    const { editor, node } = this.data;

    console.log('All connections:', editor.getConnections());

    console.log('Node inputs:', node.inputs);
    console.log('Node outputs:', node.outputs);

    let connectionsRemoved = 0;

    const connections = editor.getConnections();
    connections.forEach((connection) => {
      if (connection.source === node.id || connection.target === node.id) {
        editor.removeConnection(connection.id);
        connectionsRemoved++;
        console.log('Removed connection', connection.id);
      }
    });

    console.log(`Total connections removed: ${connectionsRemoved}`);
  }

  // removeConnections() {
  //   if (!this.data || !this.data.node) {
  //     console.error('Node is undefined');
  //     return;
  //   }
  //   const { editor, node } = this.data;
  //   console.log('removeConnections called', { node });

  //   // Remove all input connections
  //   if (node.inputs) {
  //     Object.values(node.inputs).forEach((input) => {
  //       const connections = editor
  //         .getConnections()
  //         .filter(
  //           (conn) => conn.target === node.id && conn.targetInput === input?.id
  //         );
  //       connections.forEach((connection) => {
  //         editor.removeConnection(connection.id);
  //         console.log('Removed connection', connection.id);
  //       });
  //     });
  //   }

  //   // Remove all output connections
  //   if (node.outputs) {
  //     Object.values(node.outputs).forEach((output) => {
  //       const connections = editor
  //         .getConnections()
  //         .filter(
  //           (conn) =>
  //             conn.source === node.id && conn.sourceOutput === output?.id
  //         );
  //       connections.forEach((connection) => {
  //         editor.removeConnection(connection.id);
  //       });
  //     });
  //   }
  // }
}
