import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

import { userFlashcardProgressService } from '../../../../core/services/user-flashcard-progress-service';
import { AuthService } from '../../../../core/services/auth.service';

import { UserFlashcardProgress } from '../../../../core/models/UserFlashcardProgress';

@Component({
  selector: 'app-study-session',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  templateUrl: './study-session.html',
  styleUrls: ['./study-session.css'],
})
export class StudySessionComponent implements OnInit {
  private progressService = inject(userFlashcardProgressService);
  private authService = inject(AuthService);
  private router = inject(Router);

  sessions = signal<UserFlashcardProgress[]>([]);
  loading = signal(false);

  userId = this.authService.getUserId();

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.loading.set(true);

    this.progressService.getByUserId(this.userId).subscribe({
      next: (data) => {
        this.sessions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  editSession(sessionId: number): void {
    this.router.navigate(['/study-session/edit', sessionId]);
  }
}
