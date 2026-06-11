import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../api/api-endpoints';
import { Observable } from 'rxjs';

export interface Role {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private http = inject(HttpClient);

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(API_ENDPOINTS.roles);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${API_ENDPOINTS.roles}/${id}`);
  }
}
