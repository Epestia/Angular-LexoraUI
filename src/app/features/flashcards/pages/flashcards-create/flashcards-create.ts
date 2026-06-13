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

  deckId!: number;

  flashcard: Flashcard = {
    frontText: '',
    backText: '',
    deckId: 0,
  };

  ngOnInit(): void {
    this.deckId = Number(this.route.snapshot.paramMap.get('deckId'));
    this.flashcard.deckId = this.deckId;
  }

  create(): void {
    this.flashcardService.create(this.flashcard).subscribe({
      next: () => {
        this.router.navigate(['/decks', this.deckId, 'flashcards']);
      },
      error: (err) => console.error(err),
    });
  }
}
