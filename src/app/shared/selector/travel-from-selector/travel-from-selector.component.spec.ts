import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFromSelectorComponent } from './travel-from-selector.component';

describe('TravelFromSelectorComponent', () => {
  let component: TravelFromSelectorComponent;
  let fixture: ComponentFixture<TravelFromSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelFromSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelFromSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
