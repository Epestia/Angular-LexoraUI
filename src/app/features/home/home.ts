import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  private router = inject(Router);

  goToDecks() {
    this.router.navigate(['/decks']);
  }

  goToStudy() {
    this.router.navigate(['/study-session/create']);
  }

  goToQuiz() {
    this.router.navigate(['/quiz']);
  }
}
