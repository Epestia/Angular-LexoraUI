import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Flashcard } from '../../../../core/models/flashcard';
import { FlashcardService } from '../../../../core/services/flashcard.service';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcards.html',
  styleUrl: './flashcards.css',
})
export class FlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  loading = false;
  errorMessage = '';

  showCreate = false;

  newFlashcard: Flashcard = {
    id: 0, // 👈 important (ou optionnel si backend le génère)
    frontText: '',
    backText: '',
    deckId: 1,
  };

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    this.loading = true;

    this.flashcardService.getAll().subscribe({
      next: (flashcards) => {
        this.flashcards = flashcards;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Erreur chargement flashcards';
        this.loading = false;
      },
    });
  }

  createFlashcard(): void {
    this.flashcardService.create(this.newFlashcard).subscribe({
      next: (created) => {
        this.flashcards.push(created);

        this.newFlashcard = {
          id: 0,
          frontText: '',
          backText: '',
          deckId: this.newFlashcard.deckId,
        };

        this.showCreate = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteFlashcard(id: number): void {
    this.flashcardService.delete(id).subscribe({
      next: () => {
        this.flashcards = this.flashcards.filter((f) => f.id !== id);
      },
      error: (error) => console.error(error),
    });
  }
}
