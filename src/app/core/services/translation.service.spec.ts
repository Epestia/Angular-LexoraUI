import { TestBed } from '@angular/core/testing';

import { TranslationServiceTs } from './translation.service.ts';

describe('TranslationServiceTs', () => {
  let service: TranslationServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
