import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlashcardService } from '../../../../core/services/flashcard.service';
import { TranslationService } from '../../../../core/services/translation.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-translation-create',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './translation-create.html',
  styleUrl: './translation-create.css',
})
export class TranslationCreateComponent {
  private flashcardService = inject(FlashcardService);
  private translationService = inject(TranslationService);

  flashcards$ = this.flashcardService.getMyFlashcards();

  translation = {
    translatedText: '',
    learnerLanguage: '',
    flashcardId: null,
  };

  save(): void {
    this.translationService.create(this.translation).subscribe({
      next: () => {
        alert('Traduction créée avec succès');

        this.translation = {
          translatedText: '',
          learnerLanguage: '',
          flashcardId: null,
        };
      },
      error: (err) => console.error(err),
    });
  }
}
