import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionPopupComponent } from '../connection-popup/connection-popup.component';
import { ClassicPreset, NodeEditor } from 'rete';

@Component({
  selector: 'app-connection-button',
  template: `<button (click)="openConnectionPopup()">Connect</button>`,
  styles: [
    `
      button {
        margin: 5px;
        padding: 5px 10px;
        background-color: #4caf50;
        color: white;
        border: none;
        cursor: pointer;
      }
    `,
  ],
})
export class ConnectionButtonComponent {
  @Input() data!: { editor: NodeEditor<any>; node: ClassicPreset.Node };

  constructor(private dialog: MatDialog) {}

  openConnectionPopup() {
    const availableNodes = this.data.editor
      .getNodes()
      .filter((node) => node !== this.data.node);

    const dialogRef = this.dialog.open(ConnectionPopupComponent, {
      data: { sourceNode: this.data.node, availableNodes },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data.editor.addConnection(
          new ClassicPreset.Connection(
            result.source,
            'out',
            result.target,
            'in'
          )
        );
      }
    });
  }
}
