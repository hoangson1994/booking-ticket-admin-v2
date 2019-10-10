import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypeFormComponent } from './customer-type-form.component';

describe('CustomerTypeFormComponent', () => {
  let component: CustomerTypeFormComponent;
  let fixture: ComponentFixture<CustomerTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
