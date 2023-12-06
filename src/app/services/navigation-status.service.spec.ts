import { TestBed } from '@angular/core/testing';

import { NavigationStatusService } from './navigation-status.service';

describe('NavigationStatusService', () => {
  let service: NavigationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
