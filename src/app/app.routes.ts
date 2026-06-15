import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';

import { adminGuard } from './core/guards/AdminGuard';
import { superAdminGuard } from './core/guards/SuperAdminGuard';
import { authGuard } from './core/guards/AuthGuard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // ===================== HOME =====================
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((c) => c.HomeComponent),
      },

      // ===================== USERS =====================
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

      // ===================== ROLES =====================
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

      // ===================== AUTH =====================
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
      },

      // ===================== DECKS =====================
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

      // ===================== FLASHCARDS =====================
      {
        path: 'decks/:deckId/flashcards',
        loadComponent: () =>
          import('./features/flashcards/pages/flashcards/flashcards').then(
            (c) => c.FlashcardsComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'decks/:deckId/flashcards/create',
        loadComponent: () =>
          import('./features/flashcards/pages/flashcards-create/flashcards-create').then(
            (c) => c.FlashcardsCreateComponent,
          ),
        canActivate: [authGuard],
      },

      // ===================== TRANSLATIONS =====================
      {
        path: 'flashcards/:flashcardId/translations',
        loadComponent: () =>
          import('./features/translation/pages/translation/translation').then(
            (c) => c.TranslationComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'flashcards/:flashcardId/translations/create',
        loadComponent: () =>
          import('./features/translation/pages/translation-create/translation-create').then(
            (c) => c.TranslationCreateComponent,
          ),
        canActivate: [authGuard],
      },

      // ===================== STUDY SESSION =====================
      {
        path: 'study-session/create',
        loadComponent: () =>
          import('./features/study-session/pages/study-session-create/study-session-create').then(
            (c) => c.StudySessionCreateComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'study-session',
        loadComponent: () =>
          import('./features/study-session/pages/study-session/study-session').then(
            (c) => c.StudySessionComponent,
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
