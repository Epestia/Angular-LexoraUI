import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { API_ENDPOINTS } from '../api/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly url = API_ENDPOINTS.users;

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_ENDPOINTS.users);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


  promoteToAdmin(userId: number) {
    return this.http.patch(`${API_ENDPOINTS.users}/${userId}/promote-admin`, {});
  }
}

