import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyEditFormComponent } from './policy-edit-form.component';

describe('PolicyEditFormComponent', () => {
  let component: PolicyEditFormComponent;
  let fixture: ComponentFixture<PolicyEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
