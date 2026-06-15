import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FlashcardService } from '../../../../core/services/flashcard.service';
import { Flashcard } from '../../../../core/models/flashcard';

@Component({
  selector: 'app-flashcards-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './flashcards-create.html',
  styleUrl: './flashcards-create.css',
})
export class FlashcardsCreateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private flashcardService = inject(FlashcardService);

  deckId: number = 0;

  flashcard: Flashcard = {
    id: 0,
    frontText: '',
    backText: '',
    deckId: 0,
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('deckId');
    this.deckId = id ? Number(id) : 0;

    this.flashcard.deckId = this.deckId;
  }

  create(): void {
    if (!this.deckId) return;

    this.flashcard.deckId = this.deckId;

    this.flashcardService.create(this.flashcard).subscribe({
      next: () => {
        this.router.navigate(['/decks']);
      },
      error: (err: unknown) => console.error(err),
    });
  }
}
