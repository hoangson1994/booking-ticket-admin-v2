import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageSelectorComponent } from './voyage-selector.component';

describe('VoyageSelectorComponent', () => {
  let component: VoyageSelectorComponent;
  let fixture: ComponentFixture<VoyageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
