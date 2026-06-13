import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  users: `${environment.apiUrl}/api/users`,

  roles: `${environment.apiUrl}/api/roles`,

  decks: `${environment.apiUrl}/api/decks`,

  flashcards: `${environment.apiUrl}/api/flashcards`,

  auth: {
    login: `${environment.apiUrl}/auth/login`,
  },
};
