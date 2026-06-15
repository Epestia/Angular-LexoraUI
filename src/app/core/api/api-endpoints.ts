import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  users: `${environment.apiUrl}/api/users`,

  roles: `${environment.apiUrl}/api/roles`,

  decks: `${environment.apiUrl}/api/decks`,

  flashcards: `${environment.apiUrl}/api/flashcards`,

  translations: `${environment.apiUrl}/api/translations`,

  translatedSentences: `${environment.apiUrl}/api/translated-sentences`,

  userFlashcardProgress: `${environment.apiUrl}/api/user-progress`,

  userProgress: `${environment.apiUrl}/api/user-progress`,

  study: `${environment.apiUrl}/api/study`,

  auth: {
    login: `${environment.apiUrl}/auth/login`,
  },
};
