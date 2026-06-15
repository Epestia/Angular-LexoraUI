import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../api/api-endpoints';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // 🔥 SIGNALS GLOBAUX
  user = signal<any>(null);
  isLoggedIn = signal(false);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.auth.login, data).pipe(
      tap((res) => {
        if (!this.isBrowser()) return;

        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        const payload = JSON.parse(atob(res.accessToken.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(payload));

        // 🔥 UPDATE SIGNALS
        this.user.set(payload);
        this.isLoggedIn.set(true);
      }),
    );
  }

  logout(): void {
    if (!this.isBrowser()) return;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // 🔥 RESET SIGNALS
    this.user.set(null);
    this.isLoggedIn.set(false);
  }

  initAuthFromStorage(): void {
    if (!this.isBrowser()) return;

    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      const parsed = JSON.parse(user);

      this.user.set(parsed);
      this.isLoggedIn.set(true);
    } else {
      this.user.set(null);
      this.isLoggedIn.set(false);
    }
  }

  getAccessToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('accessToken');
  }
  isAdmin(): boolean {
    const user = this.user();
    if (!user?.roles) return false;

    return user.roles.includes('ADMIN') || user.roles.includes('SUPER_ADMIN');
  }
  getUserId(): number {
    const user = this.user();

    if (!user) {
      const stored = localStorage.getItem('user');
      if (!stored) return 0;
      return JSON.parse(stored).id;
    }

    return user.id;
  }

}
