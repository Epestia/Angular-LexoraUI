export interface TranslatedSentence {
  id?: number;

  sentence: string;
  translatedSentence: string;

  translationId: number | null;
}
