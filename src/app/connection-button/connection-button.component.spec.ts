import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionButtonComponent } from './connection-button.component';

describe('ConnectionButtonComponent', () => {
  let component: ConnectionButtonComponent;
  let fixture: ComponentFixture<ConnectionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionButtonComponent]
    });
    fixture = TestBed.createComponent(ConnectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
