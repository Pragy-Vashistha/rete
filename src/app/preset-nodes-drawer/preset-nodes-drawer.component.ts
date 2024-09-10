import { Component, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-preset-nodes-drawer',
  templateUrl: './preset-nodes-drawer.component.html',
  styleUrls: ['./preset-nodes-drawer.component.scss'],
})
export class PresetNodesDrawerComponent {
  @Output() nodeDragged = new EventEmitter<any>();

  presetNodes = [
    { type: 'input', label: 'Input Node' },
    { type: 'output', label: 'Output Node' },
    { type: 'math', label: 'Math Operation' },
    // Add more preset nodes as needed
  ];

  onDragEnded(event: CdkDragEnd) {
    const nodeType = event.source.data.type;
    const dropPoint = event.dropPoint;

    this.nodeDragged.emit({
      type: nodeType,
      position: {
        x: dropPoint.x,
        y: dropPoint.y,
      },
    });
  }
}
