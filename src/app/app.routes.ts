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
      {
        path: 'translations',
        loadComponent: () =>
          import('./features/translation/pages/translation/translation').then(
            (c) => c.TranslationComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'translations/create',
        loadComponent: () =>
          import('./features/translation/pages/translation-create/translation-create').then(
            (c) => c.TranslationCreateComponent,
          ),
        canActivate: [authGuard],
      },
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
      {
        path: 'study-session/edit/:id',
        loadComponent: () =>
          import('./features/study-session/pages/study-session-edit/study-session-edit').then(
            (c) => c.StudySessionEditComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'translated-sentences/create',
        loadComponent: () =>
          import('./features/translated-sentence/pages/translated-sentence-create/translated-sentence-create').then(
            (c) => c.TranslatedSentenceCreate,
          ),
      },
      {
        path: 'translated-sentences',
        loadComponent: () =>
          import('./features/translated-sentence/pages/translated-sentence/translated-sentence').then(
            (c) => c.TranslatedSentenceComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'quiz',
        loadComponent: () => import('./features/quiz/pages/quiz/quiz').then((c) => c.QuizComponent),
        canActivate: [authGuard],
      },
      {
        path: 'quiz/all',
        loadComponent: () =>
          import('./features/quiz/pages/quiz-all/quiz-all').then((c) => c.QuizAllComponent),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
