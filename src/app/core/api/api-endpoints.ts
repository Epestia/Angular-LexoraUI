import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  users: `${environment.apiUrl}/api/users`,

  roles: `${environment.apiUrl}/api/roles`,

  auth: {
    login: `${environment.apiUrl}/auth/login`,
  },
};
