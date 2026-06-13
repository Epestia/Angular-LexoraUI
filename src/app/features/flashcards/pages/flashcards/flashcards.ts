import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Flashcard } from '../../../../core/models/flashcard';
import { FlashcardService } from '../../../../core/services/flashcard.service';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcards.html',
  styleUrl: './flashcards.css',
})
export class FlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  loading = false;
  errorMessage = '';

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
        this.errorMessage = 'Une erreur est survenue lors du chargement des flashcards.';
        this.loading = false;
      },
    });
  }

  deleteFlashcard(id: number): void {
    this.flashcardService.delete(id).subscribe({
      next: () => {
        this.flashcards = this.flashcards.filter((flashcard) => flashcard.id !== id);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
