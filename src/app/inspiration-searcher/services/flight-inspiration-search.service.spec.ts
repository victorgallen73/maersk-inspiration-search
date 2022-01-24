import { TestBed } from '@angular/core/testing';

import { FlightInspirationSearchService } from './flight-inspiration-search.service';

describe('FlightInspirationSearchService', () => {
  let service: FlightInspirationSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightInspirationSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
