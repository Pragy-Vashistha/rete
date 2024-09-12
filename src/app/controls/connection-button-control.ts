import { ClassicPreset, NodeEditor } from 'rete';
import { ConnectionButtonComponent } from '../connection-button/connection-button.component';
import { Injector } from '@angular/core';

export class ConnectionButtonControl extends ClassicPreset.Control {
  component: typeof ConnectionButtonComponent;
  props: { editor: NodeEditor<any>; node: ClassicPreset.Node };

  constructor(
    public editor: NodeEditor<any>,
    public key: string,
    public node: ClassicPreset.Node,
    private injector: Injector // Inject the Injector for Angular components
  ) {
    super();
    this.component = ConnectionButtonComponent;
    this.props = { editor, node };
  }
}
