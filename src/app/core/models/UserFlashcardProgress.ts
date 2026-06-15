export interface UserFlashcardProgress {
  id?: number;

  userId: number;
  flashcardId: number;

  repetitionLevel: number;
  timesReviewed: number;
  known: boolean;

  nextReviewDate: string;
}
