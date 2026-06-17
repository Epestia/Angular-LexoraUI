import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

import { DeckService } from '../../../../../core/services/deck.service';
import { FlashcardService } from '../../../../../core/services/flashcard.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { userFlashcardProgressService } from '../../../../../core/services/user-flashcard-progress-service';

import { Deck } from '../../../../../core/models/deck';
import { Flashcard } from '../../../../../core/models/flashcard';
import { CapitalizePipe } from '../../../../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    TagModule,
    CardModule,
    CapitalizePipe,
  ],
  templateUrl: './deck.html',
  styleUrl: './deck.css',
})
export class DeckComponent implements OnInit {
  private deckService = inject(DeckService);
  private flashcardService = inject(FlashcardService);
  private authService = inject(AuthService);
  private router = inject(Router);

  decks = signal<Deck[]>([]);
  flashcardsByDeck = signal<Record<number, Flashcard[]>>({});
  loading = signal(false);

  userId = this.authService.getUserId();

  ngOnInit(): void {
    this.loadMyDecks();
  }

  loadMyDecks(): void {
    this.loading.set(true);

    this.deckService.getMyDecks().subscribe({
      next: (decks) => {
        this.decks.set(decks);
        this.loadFlashcards(decks);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  loadFlashcards(decks: Deck[]): void {
    const map: Record<number, Flashcard[]> = {};

    decks.forEach((deck) => {
      if (!deck.id) return;

      this.flashcardService.getByDeck(deck.id).subscribe({
        next: (cards) => {
          map[deck.id!] = cards;
          this.flashcardsByDeck.set({ ...map });
        },
        error: (err) => console.error(err),
      });
    });
  }

  getFlashcards(deckId?: number): Flashcard[] {
    if (!deckId) return [];
    return this.flashcardsByDeck()[deckId] ?? [];
  }

  deleteDeck(id: number): void {
    if (!confirm('Supprimer ce deck ?')) return;

    this.deckService.deleteDeck(id).subscribe({
      next: () => {
        this.decks.update((list) => list.filter((d) => d.id !== id));

        this.flashcardsByDeck.update((map) => {
          const copy = { ...map };
          delete copy[id];
          return copy;
        });
      },
      error: (err) => console.error(err),
    });
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'IN_PROGRESS':
        return 'info';
      case 'ARCHIVED':
        return 'warn';
      default:
        return 'danger';
    }
  }
}
