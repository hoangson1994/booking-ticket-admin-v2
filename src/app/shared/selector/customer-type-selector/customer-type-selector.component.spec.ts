import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypeSelectorComponent } from './customer-type-selector.component';

describe('CustomerTypeSelectorComponent', () => {
  let component: CustomerTypeSelectorComponent;
  let fixture: ComponentFixture<CustomerTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
