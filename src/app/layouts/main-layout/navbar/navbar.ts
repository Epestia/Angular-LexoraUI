import { Component, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  items: MenuItem[] = [];

  constructor() {
    this.authService.initAuthFromStorage();

    this.buildMenu();

    effect(() => {
      this.user();
      this.buildMenu();
    });
  }

  buildMenu() {
    const user = this.user();

    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: '/',
      },

      {
        label: 'Étude',
        icon: 'pi pi-graduation-cap',
        items: [
          {
            label: 'Créer session',
            icon: 'pi pi-play',
            routerLink: '/study-session/create',
          },
          {
            label: 'Mes sessions',
            icon: 'pi pi-history',
            routerLink: '/study-session',
          },
        ],
      },

      {
        label: 'Decks',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Liste des decks',
            icon: 'pi pi-list',
            routerLink: '/decks',
          },
          {
            label: 'Créer un deck',
            icon: 'pi pi-plus',
            routerLink: '/decks/create',
          },
        ],
      },

      ...(user
        ? [
            {
              label: 'Quiz',
              icon: 'pi pi-question-circle',
              items: [
                {
                  label: 'Lancer un quiz',
                  icon: 'pi pi-play-circle',
                  routerLink: '/quiz',
                },
                {
                  label: 'Résultats',
                  icon: 'pi pi-chart-bar',
                  routerLink: '/quiz/all',
                },
              ],
            },

            {
              label: 'Langue',
              icon: 'pi pi-language',
              items: [
                {
                  label: 'Traductions',
                  icon: 'pi pi-list',
                  routerLink: '/translations',
                },
                {
                  label: 'Créer traduction',
                  icon: 'pi pi-plus',
                  routerLink: '/translations/create',
                },
              ],
            },

            {
              label: 'Phrases',
              icon: 'pi pi-comment',
              items: [
                {
                  label: 'Liste',
                  icon: 'pi pi-list',
                  routerLink: '/translated-sentences',
                },
                {
                  label: 'Créer',
                  icon: 'pi pi-plus',
                  routerLink: '/translated-sentences/create',
                },
              ],
            },
          ]
        : []),

      ...(user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')
        ? [
            {
              label: 'Administration',
              icon: 'pi pi-shield',
              items: [
                {
                  label: 'Users',
                  icon: 'pi pi-users',
                  routerLink: '/users',
                },
                {
                  label: 'Rôles',
                  icon: 'pi pi-key',
                  routerLink: '/roles',
                },
              ],
            },
          ]
        : []),
    ];
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/users/create']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
