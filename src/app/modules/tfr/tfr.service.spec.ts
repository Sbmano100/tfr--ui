import { TestBed } from '@angular/core/testing';

import { TfrService } from './tfr.service';

describe('TfrService', () => {
  let service: TfrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
