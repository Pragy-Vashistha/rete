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
  handlePresetNodeDragged(event: any) {
    if (this.editorInstance && this.editorInstance.addNode) {
      this.editorInstance
        .addNode(event.type, event.position.x, event.position.y)
        .then((node: any) => {
          console.log(`Added new node: ${node.label}`);
        })
        .catch((error: any) => {
          console.error('Failed to add node:', error);
        });
    } else {
      console.error('Editor not initialized or addNode method not available');
    }
  }

  loadInitialGraph(): void {
    const initialGraph = {
      nodes: [
        {
          id: 'node1',
          name: 'Node A',
          position: { x: 100, y: 100 },
          hasInput: false,
        },
        {
          id: 'node2',
          name: 'Node B',
          position: { x: 400, y: 100 },
          hasInput: true,
        },
      ],
      connections: [
        {
          sourceId: 'Node A',
          targetId: 'Node B',
        },
      ],
    };

    if (this.editorInstance && this.editorInstance.importSimpleGraph) {
      this.editorInstance.importSimpleGraph(initialGraph);
      console.log('Initial graph loaded successfully');
    } else {
      console.error(
        'Editor not initialized or importSimpleGraph method not available'
      );
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.container?.nativeElement) {
      try {
        this.editorInstance = await createEditor(
          this.container.nativeElement,
          this.injector
        );
        if (this.editorInstance) {
          this.loadInitialGraph();
        }
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

  exportToJSON(): void {
    if (this.editorInstance && this.editorInstance.exportSimpleGraph) {
      const graphData = this.editorInstance.exportSimpleGraph();
      const jsonString = JSON.stringify(graphData, null, 2);

      // Create a Blob with the JSON data
      const blob = new Blob([jsonString], { type: 'application/json' });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'graph_export.json';
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log('Graph exported and download initiated');
    } else {
      console.error(
        'Editor not initialized or exportSimpleGraph method not available'
      );
    }
  }

  importFromJSON(jsonData: string): void {
    if (this.editorInstance && this.editorInstance.importSimpleGraph) {
      try {
        const graphData = JSON.parse(jsonData);
        this.editorInstance.importSimpleGraph(graphData);
        console.log('Graph imported successfully');
      } catch (error) {
        console.error('Failed to import graph:', error);
      }
    } else {
      console.error(
        'Editor not initialized or importSimpleGraph method not available'
      );
    }
  }

  zoomToFit(): void {
    if (this.editorInstance && this.editorInstance.zoomToFit) {
      this.editorInstance.zoomToFit();
      console.log('Zoomed to fit all nodes');
    } else {
      console.error('Editor not initialized or zoomToFit method not available');
    }
  }

  deleteAllNodes(): void {
    if (this.editorInstance && this.editorInstance.clear) {
      this.editorInstance.clear();
      console.log('All nodes deleted');
    } else {
      console.error('Editor not initialized or clear method not available');
    }
  }
}

let nodeId = 0;
