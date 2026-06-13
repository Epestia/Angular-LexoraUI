import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  users: `${environment.apiUrl}/api/users`,

  roles: `${environment.apiUrl}/api/roles`,

  decks: `${environment.apiUrl}/api/decks`,

  auth: {
    login: `${environment.apiUrl}/auth/login`,
  },
};
