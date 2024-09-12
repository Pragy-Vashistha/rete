import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassicPreset } from 'rete';

@Component({
  selector: 'app-connection-popup',
  template: `
    <h2 mat-dialog-title>Select a node to connect</h2>
    <mat-dialog-content>
      <mat-selection-list #nodeList [multiple]="false">
        <mat-list-option
          *ngFor="let node of data.availableNodes"
          [value]="node"
        >
          {{ node.label }}
        </mat-list-option>
      </mat-selection-list>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Cancel</button>
      <button
        mat-button
        [disabled]="!nodeList.selectedOptions.selected[0]"
        (click)="connect(nodeList.selectedOptions.selected[0]?.value)"
      >
        Connect
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        min-height: 200px;
        max-height: 400px;
        overflow-y: auto;
      }
    `,
  ],
})
export class ConnectionPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ConnectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      sourceNode: ClassicPreset.Node;
      availableNodes: ClassicPreset.Node[];
    }
  ) {}

  connect(targetNode: ClassicPreset.Node | undefined) {
    if (targetNode) {
      this.dialogRef.close({
        source: this.data.sourceNode,
        target: targetNode,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
