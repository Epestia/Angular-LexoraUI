import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../api/api-endpoints';

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


  getRoleByName(name: string): Observable<Role> {
    return this.http.get<Role>(`${API_ENDPOINTS.roles}/name/${name}`);
  }


  createRole(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(API_ENDPOINTS.roles, role);
  }


  updateRole(id: number, role: Partial<Role>): Observable<Role> {
    return this.http.put<Role>(`${API_ENDPOINTS.roles}/${id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.roles}/${id}`);
  }
}
