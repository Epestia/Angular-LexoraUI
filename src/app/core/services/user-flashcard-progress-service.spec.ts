import { TestBed } from '@angular/core/testing';

import { UserFlashcardProgressService } from './user-flashcard-progress-service';

describe('UserFlashcardProgressService', () => {
  let service: UserFlashcardProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFlashcardProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
