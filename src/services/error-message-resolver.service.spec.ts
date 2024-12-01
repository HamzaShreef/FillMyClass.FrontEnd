import { TestBed } from '@angular/core/testing';

import { ErrorMessageResolverService } from './error-message-resolver.service';

describe('ErrorMessageResolverService', () => {
  let service: ErrorMessageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
