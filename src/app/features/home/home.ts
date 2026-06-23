import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  user = this.authService.user;

  private goLoginIfNotAuth(): boolean {
    if (!this.user()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  goToDecks() {
    if (!this.goLoginIfNotAuth()) return;
    this.router.navigate(['/decks']);
  }

  goToStudy() {
    if (!this.goLoginIfNotAuth()) return;
    this.router.navigate(['/study-session/create']);
  }

  goToQuiz() {
    if (!this.goLoginIfNotAuth()) return;
    this.router.navigate(['/quiz']);
  }
}
