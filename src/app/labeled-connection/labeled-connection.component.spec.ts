import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledConnectionComponent } from './labeled-connection.component';

describe('LabeledConnectionComponent', () => {
  let component: LabeledConnectionComponent;
  let fixture: ComponentFixture<LabeledConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabeledConnectionComponent]
    });
    fixture = TestBed.createComponent(LabeledConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
