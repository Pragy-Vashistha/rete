import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionPopupComponent } from './connection-popup.component';

describe('ConnectionPopupComponent', () => {
  let component: ConnectionPopupComponent;
  let fixture: ComponentFixture<ConnectionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionPopupComponent]
    });
    fixture = TestBed.createComponent(ConnectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
