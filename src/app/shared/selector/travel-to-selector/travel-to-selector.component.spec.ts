import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelToSelectorComponent } from './travel-to-selector.component';

describe('TravelToSelectorComponent', () => {
  let component: TravelToSelectorComponent;
  let fixture: ComponentFixture<TravelToSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelToSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelToSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
