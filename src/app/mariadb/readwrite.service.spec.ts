import { TestBed } from '@angular/core/testing';

import { ReadwriteService } from './readwrite.service';

describe('ReadwriteService', () => {
  let service: ReadwriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadwriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
