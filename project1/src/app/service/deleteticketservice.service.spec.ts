import { TestBed } from '@angular/core/testing';

import { DeleteticketserviceService } from './deleteticketservice.service';

describe('DeleteticketserviceService', () => {
  let service: DeleteticketserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteticketserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
