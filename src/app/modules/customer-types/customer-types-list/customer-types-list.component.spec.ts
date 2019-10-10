import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypesListComponent } from './customer-types-list.component';

describe('CustomerTypesListComponent', () => {
  let component: CustomerTypesListComponent;
  let fixture: ComponentFixture<CustomerTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
