import { TestBed } from '@angular/core/testing';

import { AmadeusTokenService } from './amadeus-token.service';

describe('AmadeusTokenService', () => {
  let service: AmadeusTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmadeusTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
