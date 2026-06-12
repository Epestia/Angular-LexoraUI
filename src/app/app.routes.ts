import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { adminGuard } from './core/guards/AdminGuard';
import { superAdminGuard } from './core/guards/SuperAdminGuard';

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
        canActivate: [adminGuard],
      },

      {
        path: 'roles',
        loadComponent: () =>
          import('./features/users/pages/role/role').then((c) => c.RoleComponent),
        canActivate: [superAdminGuard],
      },
      {
        path: 'roles/create',
        loadComponent: () =>
          import('./features/users/pages/role-create/role-create').then((c) => c.RoleCreateComponent),
        canActivate: [superAdminGuard],
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
      },
    ],
  },
];
