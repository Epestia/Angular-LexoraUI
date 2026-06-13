import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { adminGuard } from './core/guards/AdminGuard';
import { superAdminGuard } from './core/guards/SuperAdminGuard';
import {authGuard } from './core/guards/AuthGuard';
import { DeckCreateComponent } from './features/deck/pages/deck-create/deck-create';
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
          import('./features/users/pages/role-create/role-create').then(
            (c) => c.RoleCreateComponent,
          ),
        canActivate: [superAdminGuard],
      },

      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
      },

      {
        path: 'decks',
        loadComponent: () =>
          import('./features/deck/pages/deck/deck/deck').then((c) => c.DeckComponent),
        canActivate: [authGuard],
      },

      {
        path: 'decks/create',
        loadComponent: () =>
          import('./features/deck/pages/deck-create/deck-create').then(
            (c) => c.DeckCreateComponent,
          ),
        canActivate: [authGuard],
      },

      {
        path: 'decks/edit/:id',
        loadComponent: () =>
          import('./features/deck/pages/deck-edit/deck-edit').then((c) => c.DeckEditComponent),
        canActivate: [authGuard],
      },
    ],
  },
];
