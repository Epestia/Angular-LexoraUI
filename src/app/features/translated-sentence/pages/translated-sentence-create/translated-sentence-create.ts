import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatedSentenceService } from '../../../../core/services/translated-sentence.service';

import { Translation } from '../../../../core/models/translation';
import { TranslatedSentence } from '../../../../core/models/translated-sentence';

@Component({
  selector: 'app-translated-sentence-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translated-sentence-create.html',
  styleUrl: './translated-sentence-create.css',
})
export class TranslatedSentenceCreate {
  private translationService = inject(TranslationService);
  private sentenceService = inject(TranslatedSentenceService);

  translations = signal<Translation[]>([]);

  sentence: TranslatedSentence = {
    sentence: '',
    translatedSentence: '',
    translationId: 0,
  };

  constructor() {
    this.loadTranslations();
  }

  loadTranslations(): void {
    this.translationService.getAll().subscribe({
      next: (data) => this.translations.set(data),
      error: (err) => console.error(err),
    });
  }

  save(): void {
    this.sentenceService.create(this.sentence).subscribe({
      next: () => {
        alert('Phrase traduite créée');

        this.sentence = {
          sentence: '',
          translatedSentence: '',
          translationId: 0,
        };
      },
      error: (err) => console.error(err),
    });
  }
}
