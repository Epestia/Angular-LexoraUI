import { Component, inject, OnInit } from '@angular/core';
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
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  isLoggedIn = this.authService.isLoggedIn;

  items: MenuItem[] = [];

  ngOnInit() {
    this.authService.initAuthFromStorage();
    this.buildMenu();
  }

  buildMenu() {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: '/',
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

      ...(this.user()
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
                  label: 'Mes résultats',
                  icon: 'pi pi-chart-bar',
                  routerLink: '/quiz/all',
                },
              ],
            },
            {
              label: 'Traductions',
              icon: 'pi pi-language',
              items: [
                {
                  label: 'Liste des traductions',
                  icon: 'pi pi-list',
                  routerLink: '/translations',
                },
                {
                  label: 'Créer une traduction',
                  icon: 'pi pi-plus',
                  routerLink: '/translations/create',
                },
              ],
            },
            {
              label: 'Phrases traduites',
              icon: 'pi pi-comment',
              items: [
                {
                  label: 'Liste des phrases',
                  icon: 'pi pi-list',
                  routerLink: '/translated-sentences',
                },
                {
                  label: 'Créer une phrase',
                  icon: 'pi pi-plus',
                  routerLink: '/translated-sentences/create',
                },
              ],
            },
          ]
        : []),

      // ===================== ADMIN =====================
      ...(this.user() && (this.user()?.role === 'ADMIN' || this.user()?.role === 'SUPER_ADMIN')
        ? [
            {
              label: 'Gestion utilisateurs',
              icon: 'pi pi-users',
              items: [
                {
                  label: 'User List',
                  icon: 'pi pi-list',
                  routerLink: '/users',
                },
                {
                  label: 'Gestion rôles',
                  icon: 'pi pi-shield',
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/users/create']);
  }
}
