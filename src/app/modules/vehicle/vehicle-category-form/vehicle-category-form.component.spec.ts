import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCategoryFormComponent } from './vehicle-category-form.component';

describe('VehicleCategoryFormComponent', () => {
  let component: VehicleCategoryFormComponent;
  let fixture: ComponentFixture<VehicleCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
