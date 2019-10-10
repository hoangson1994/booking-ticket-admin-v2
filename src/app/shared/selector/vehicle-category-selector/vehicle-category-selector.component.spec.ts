import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCategorySelectorComponent } from './vehicle-category-selector.component';

describe('VehicleCategorySelectorComponent', () => {
  let component: VehicleCategorySelectorComponent;
  let fixture: ComponentFixture<VehicleCategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCategorySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
