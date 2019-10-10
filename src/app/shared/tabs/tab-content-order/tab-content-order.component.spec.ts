import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContentOrderComponent } from './tab-content-order.component';

describe('TabContentOrderComponent', () => {
  let component: TabContentOrderComponent;
  let fixture: ComponentFixture<TabContentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabContentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
