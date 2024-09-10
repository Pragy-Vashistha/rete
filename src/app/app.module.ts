import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CounterControlComponent } from './counter-control/counter-control.component';
import { RemoveConnectionsButtonComponent } from './remove-connections-button/remove-connections-button.component';
import { PresetNodesDrawerComponent } from './preset-nodes-drawer/preset-nodes-drawer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    CounterControlComponent,
    RemoveConnectionsButtonComponent,
    PresetNodesDrawerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
