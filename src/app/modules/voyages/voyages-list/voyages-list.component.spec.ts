import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyagesListComponent } from './voyages-list.component';

describe('VoyagesListComponent', () => {
  let component: VoyagesListComponent;
  let fixture: ComponentFixture<VoyagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
