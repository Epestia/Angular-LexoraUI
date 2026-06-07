import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  users: `${environment.apiUrl}/api/users`,
  auth: {
    login: `${environment.apiUrl}/auth/login`,
  },
};
