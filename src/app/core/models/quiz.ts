export interface Quiz {
  id: number;
  userId: number;
  deckId: number;
  attemptDate: string;
  score: number;
  totalQuestions: number;
}
