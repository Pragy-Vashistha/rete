import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CounterControlComponent } from './counter-control/counter-control.component';
import { RemoveConnectionsButtonComponent } from './remove-connections-button/remove-connections-button.component';
import { PresetNodesDrawerComponent } from './preset-nodes-drawer/preset-nodes-drawer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ConnectionPopupComponent } from './connection-popup/connection-popup.component';
import { ConnectionButtonComponent } from './connection-button/connection-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LabeledConnectionComponent } from './labeled-connection/labeled-connection.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    CounterControlComponent,
    RemoveConnectionsButtonComponent,
    PresetNodesDrawerComponent,
    ConnectionPopupComponent,
    ConnectionButtonComponent,
    LabeledConnectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    CommonModule,
  ],
  exports: [LabeledConnectionComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
