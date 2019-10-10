import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageFormComponent } from './voyage-form.component';

describe('VoyageFormComponent', () => {
  let component: VoyageFormComponent;
  let fixture: ComponentFixture<VoyageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
