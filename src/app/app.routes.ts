import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { adminGuard } from './core/guards/AdminGuard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((c) => c.HomeComponent),
      },

      {
        path: 'users/create',
        loadComponent: () =>
          import('./features/users/pages/user-create/user-create').then((c) => c.UserCreate),
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/pages/users/users').then((c) => c.UsersComponent),
        canActivate: [adminGuard], // 🔥 accès admin only
      },

      {
        path: 'roles',
        loadComponent: () => import('./features/users/pages/role/role').then((c) => c.Role),
        canActivate: [adminGuard], // optionnel mais recommandé 🔐
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
  },
];
