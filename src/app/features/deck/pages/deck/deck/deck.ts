import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DeckService } from '../../../../../core/services/deck.service';
import { FlashcardService } from '../../../../../core/services/flashcard.service';

import { Deck } from '../../../../../core/models/deck';
import { Flashcard } from '../../../../../core/models/flashcard';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deck.html',
})
export class DeckComponent implements OnInit {
  private deckService = inject(DeckService);
  private flashcardService = inject(FlashcardService);

  decks = signal<Deck[]>([]);
  loading = signal(false);

  flashcardsByDeck = signal<Record<number, Flashcard[]>>({});

  ngOnInit(): void {
    this.loadMyDecks();
  }

  loadMyDecks(): void {
    this.loading.set(true);

    this.deckService.getMyDecks().subscribe({
      next: (decks) => {
        this.decks.set(decks);
        this.loadFlashcardsForDecks(decks);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  loadFlashcardsForDecks(decks: Deck[]): void {
    const map: Record<number, Flashcard[]> = {};

    decks.forEach((deck) => {
      if (!deck.id) return;

      this.flashcardService.getByDeck(deck.id).subscribe({
        next: (flashcards) => {
          map[deck.id!] = flashcards;
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
}
