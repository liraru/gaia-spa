import { TestBed } from '@angular/core/testing';

import { CommonBusService } from './common-bus.service';

describe('CommonBusService', () => {
  let service: CommonBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
