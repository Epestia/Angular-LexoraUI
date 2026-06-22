import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';

import { Flashcard } from '../../../../core/models/flashcard';
import { Translation } from '../../../../core/models/translation';

import { FlashcardService } from '../../../../core/services/flashcard.service';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-translation-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translation-create.html',
  styleUrl: './translation-create.css',
})
export class TranslationCreateComponent {
  // ✅ injection moderne (évite TS2729)
  private flashcardService = inject(FlashcardService);
  private translationService = inject(TranslationService);

  // ✅ observable propre (pas de subscribe, pas d’erreur d’init)
  flashcards$ = this.flashcardService.getMyFlashcards();

  // formulaire
  translation: Translation = {
    translatedText: '',
    learnerLanguage: '',
    flashcardId: null,
  };

  // sauvegarde traduction
  save(): void {
    this.translationService.create(this.translation).subscribe({
      next: () => {
        alert('Traduction créée avec succès');

        // reset form
        this.translation = {
          translatedText: '',
          learnerLanguage: '',
          flashcardId: null,
        };
      },
      error: (err) => {
        console.error('Erreur création traduction', err);
      },
    });
  }
}
