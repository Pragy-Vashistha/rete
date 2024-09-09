import { Component } from '@angular/core';
import { ClassicPreset } from 'rete';

@Component({
  selector: 'app-counter-control',
  template: `
    <div class="counter-control">
      <button (click)="decrement()">-</button>
      <span>{{ getValue() }}</span>
      <button (click)="increment()">+</button>
    </div>
  `,
  styles: [
    `
      .counter-control {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      button {
        width: 30px;
        height: 30px;
      }
    `,
  ],
})
export class CounterControlComponent extends ClassicPreset.InputControl<'number'> {
  constructor() {
    super('number');
  }

  getValue(): number {
    return this.value ?? 0;
  }
  override setValue(val: number) {
    this.value = val;
    super.setValue(val);
  }
  increment() {
    this.setValue(this.getValue() + 1);
  }

  decrement() {
    this.setValue(this.getValue() - 1);
  }
}
