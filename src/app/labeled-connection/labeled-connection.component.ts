import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ClassicPreset } from 'rete';
import { LabeledConnection } from '../canvas/editor';

@Component({
  selector: 'app-labeled-connection',
  template: `
    <svg data-testid="connection">
      <path [attr.d]="path" [id]="id" />
      <text *ngIf="label">
        <textPath [attr.href]="'#' + id" startOffset="50%" text-anchor="middle">
          {{ label }}
        </textPath>
      </text>
    </svg>
  `,
  styleUrls: ['./labeled-connection.component.scss'],
})
export class LabeledConnectionComponent implements OnInit {
  @Input() data!: LabeledConnection<ClassicPreset.Node, ClassicPreset.Node>;
  @Input() start: any;
  @Input() end: any;
  @Input() path!: string;

  id: string = '';
  label: string = '';

  ngOnInit() {
    this.id = `connection-${this.data.id}`;
    this.label = this.data.label || '';
  }
  // @Input() data!: {
  //   payload: ClassicPreset.Connection<
  //     ClassicPreset.Node,
  //     ClassicPreset.Node
  //   > & { label?: string };
  //   start: { x: number; y: number };
  //   end: { x: number; y: number };
  // };

  // path: string = '';
  // labelX: number = 0;
  // labelY: number = 0;
  // label: string = '';

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['data']) {
  //     this.updatePath();
  //   }
  // }

  // updatePath() {
  //   const { start, end } = this.data;
  //   const midX = (start.x + end.x) / 2;
  //   const midY = (start.y + end.y) / 2;

  //   this.path = `M ${start.x} ${start.y} C ${start.x + 30} ${start.y}, ${
  //     end.x - 30
  //   } ${end.y}, ${end.x} ${end.y}`;
  //   this.labelX = midX;
  //   this.labelY = midY;
  //   this.label = this.data.payload.label || 'No Label';

  //   console.log('Connection data:', this.data);
  //   console.log('Label:', this.label);
  // }
}
