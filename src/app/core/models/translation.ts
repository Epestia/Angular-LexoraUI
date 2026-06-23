export interface Translation {
  id?: number;
  translatedText: string;
  learnerLanguage: string;

  flashcardId: number | null;
}
