import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetNodesDrawerComponent } from './preset-nodes-drawer.component';

describe('PresetNodesDrawerComponent', () => {
  let component: PresetNodesDrawerComponent;
  let fixture: ComponentFixture<PresetNodesDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresetNodesDrawerComponent]
    });
    fixture = TestBed.createComponent(PresetNodesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
