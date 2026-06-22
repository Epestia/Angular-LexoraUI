import { TestBed } from '@angular/core/testing';

import { TranslatedSentenceServiceTs } from './translated-sentence.service.ts';

describe('TranslatedSentenceServiceTs', () => {
  let service: TranslatedSentenceServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatedSentenceServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
