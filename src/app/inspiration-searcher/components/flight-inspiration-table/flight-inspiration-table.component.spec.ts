import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInspirationTableComponent } from './flight-inspiration-table.component';

describe('FlightInspirationTableComponent', () => {
  let component: FlightInspirationTableComponent;
  let fixture: ComponentFixture<FlightInspirationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightInspirationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInspirationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
