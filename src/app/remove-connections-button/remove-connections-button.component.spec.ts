import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConnectionsButtonComponent } from './remove-connections-button.component';

describe('RemoveConnectionsButtonComponent', () => {
  let component: RemoveConnectionsButtonComponent;
  let fixture: ComponentFixture<RemoveConnectionsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveConnectionsButtonComponent]
    });
    fixture = TestBed.createComponent(RemoveConnectionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
