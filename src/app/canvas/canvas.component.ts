import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Injector,
  inject,
} from '@angular/core';
import { createEditor } from './editor';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('rete') container?: ElementRef;
  private injector = inject(Injector);
  private editorInstance: any;

  async ngAfterViewInit(): Promise<void> {
    if (this.container?.nativeElement) {
      try {
        this.editorInstance = await createEditor(
          this.container.nativeElement,
          this.injector
        );
        console.log('Editor initialized successfully');
      } catch (error) {
        console.error('Failed to initialize editor:', error);
      }
    } else {
      console.error('Node editor container not found');
    }
  }

  addNode(): void {
    if (this.editorInstance && this.editorInstance.addNode) {
      const randomX = Math.random() * 1000 - 500; // Range: -500 to 500
      const randomY = Math.random() * 1000 - 500; // Range: -500 to 500
      this.editorInstance
        .addNode(`Node ${++nodeId}`, randomX, randomY)
        .then((node: any) => {
          console.log(`Added new node: ${node.label}`);
          // Remove the zoomAt call as we don't have access to getNodes here
        })
        .catch((error: any) => {
          console.error('Failed to add node:', error);
        });
    } else {
      console.error('Editor not initialized or addNode method not available');
    }
  }
}

let nodeId = 0;
