import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeckService } from '../../../../../core/services/deck.service';
import { Deck } from '../../../../../core/models/deck';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deck.html',
})
export class DeckComponent implements OnInit {
  private deckService = inject(DeckService);

  decks = signal<Deck[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.loadMyDecks();
  }

  loadMyDecks(): void {
    this.loading.set(true);

    this.deckService.getMyDecks().subscribe({
      next: (data) => {
        this.decks.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  deleteDeck(id: number): void {
    if (!confirm('Supprimer ce deck ?')) return;

    this.deckService.deleteDeck(id).subscribe({
      next: () => {
        this.decks.update((list) => list.filter((d) => d.id !== id));
      },
      error: console.error,
    });
  }
}
