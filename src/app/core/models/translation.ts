import { TranslatedSentence } from './translated-sentence';

export interface Translation {
  id?: number;

  translatedText: string;
  learnerLanguage: string;

  flashcardId: number;

  translatedSentences?: TranslatedSentence[];
}
