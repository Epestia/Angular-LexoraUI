import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { userFlashcardProgressService } from '../../../../core/services/user-flashcard-progress-service';
import { FlashcardService } from '../../../../core/services/flashcard.service';
import { DeckService } from '../../../../core/services/deck.service';
import { AuthService } from '../../../../core/services/auth.service';

import { Deck } from '../../../../core/models/deck';
import { Flashcard } from '../../../../core/models/flashcard';
import { UserFlashcardProgress } from '../../../../core/models/UserFlashcardProgress';

@Component({
  selector: 'app-study-session-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-session-create.html',
  styleUrls: ['./study-session-create.css'],
})
export class StudySessionCreateComponent implements OnInit {
  private flashcardService = inject(FlashcardService);
  private progressService = inject(userFlashcardProgressService);
  private deckService = inject(DeckService);
  private authService = inject(AuthService);
  private router = inject(Router);

  decks = signal<Deck[]>([]);
  flashcards = signal<Flashcard[]>([]);

  selectedDeckId: number | null = null;
  selectedFlashcardId: number | null = null;

  userId = this.authService.getUserId();

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks() {
    this.deckService.getMyDecks().subscribe({
      next: (data) => this.decks.set(data),
      error: (err) => console.error(err),
    });
  }

  onDeckChange() {
    if (!this.selectedDeckId) {
      this.flashcards.set([]);
      this.selectedFlashcardId = null;
      return;
    }

    this.flashcardService.getByDeck(this.selectedDeckId).subscribe({
      next: (data) => {
        this.flashcards.set(data ?? []);
        this.selectedFlashcardId = null;
      },
      error: (err) => console.error(err),
    });
  }

  createStudySession() {
    console.log('CLICK OK');
    console.log('deck:', this.selectedDeckId);
    console.log('flashcard:', this.selectedFlashcardId);

    if (!this.selectedDeckId || !this.selectedFlashcardId) {
      console.warn('Missing selection');
      return;
    }

    const progress: UserFlashcardProgress = {
      userId: this.userId,
      flashcardId: this.selectedFlashcardId,
      repetitionLevel: 0,
      timesReviewed: 0,
      known: false,
      nextReviewDate: new Date().toISOString().split('T')[0],
    };

    this.progressService.create(progress).subscribe({
      next: () => {
        console.log('created');
        this.router.navigate(['/study-session']);
      },
      error: (err: unknown) => console.error(err),
    });
  }
}
