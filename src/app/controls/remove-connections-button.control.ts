import { ClassicPreset, NodeEditor } from 'rete';
import { RemoveConnectionsButtonComponent } from '../remove-connections-button/remove-connections-button.component';

export class RemoveConnectionsButtonControl extends ClassicPreset.Control {
  component: { new (): RemoveConnectionsButtonComponent };
  props: { editor: NodeEditor<any>; node: ClassicPreset.Node };

  constructor(
    public editor: NodeEditor<any>,
    public key: string,
    public node: ClassicPreset.Node
  ) {
    super();
    console.log('RemoveConnectionsButtonControl constructor', {
      editor,
      key,
      node,
    });
    this.component = RemoveConnectionsButtonComponent;
    this.props = { editor, node };
  }
}
