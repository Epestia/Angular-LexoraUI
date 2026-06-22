import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

import { DeckService } from '../../../../../core/services/deck.service';
import { FlashcardService } from '../../../../../core/services/flashcard.service';
import { AuthService } from '../../../../../core/services/auth.service';

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
  private router = inject(Router);
  private authService = inject(AuthService);

  decks = signal<Deck[]>([]);
  flashcardsByDeck = signal<Record<number, Flashcard[]>>({});
  loading = signal(false);

  userId = this.authService.getUserId();

  ngOnInit(): void {
    this.loadMyDecks();
  }

  // ----------------------------
  // LOAD DECKS
  // ----------------------------
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

  // ----------------------------
  // LOAD FLASHCARDS
  // ----------------------------
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

  // ----------------------------
  // GET FLASHCARDS BY DECK
  // ----------------------------
  getFlashcards(deckId?: number): Flashcard[] {
    if (!deckId) return [];
    return this.flashcardsByDeck()[deckId] ?? [];
  }

  // ----------------------------
  // DELETE DECK
  // ----------------------------
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

  // ----------------------------
  // TRANSLATION CREATE ACTION
  // ----------------------------
  openCreateTranslation(flashcardId: number): void {
    this.router.navigate(
      ['/flashcards', flashcardId, 'translations'],
      {
        queryParams: { mode: 'create' }
      }
    );
  }

  // ----------------------------
  // STATUS UI
  // ----------------------------
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
