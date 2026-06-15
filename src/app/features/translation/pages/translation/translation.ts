import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { TranslationService } from '../../../../core/services/translation.service';
import { Translation } from '../../../../core/models/translation';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, RouterModule, Card],
  templateUrl: './translation.html',
  styleUrl: './translation.css',
})
export class TranslationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private translationService = inject(TranslationService);

  flashcardId!: number;

  translations: Translation[] = [];
  loading = false;

  ngOnInit(): void {
    this.flashcardId = Number(this.route.snapshot.paramMap.get('flashcardId'));

    this.translationService.getAll().subscribe({
      next: (data) => {
        this.translations = data.filter((t) => t.flashcardId === this.flashcardId);

        this.loading = false;
      },
      error: console.error,
    });
  }

  loadTranslations(): void {
    this.loading = true;

    this.translationService.getAll().subscribe({
      next: (data) => {
        this.translations = data.filter((t) => t.flashcardId === this.flashcardId);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  deleteTranslation(id?: number): void {
    if (!id) return;

    this.translationService.delete(id).subscribe({
      next: () => {
        this.translations = this.translations.filter((t) => t.id !== id);
      },
      error: (err) => console.error(err),
    });
  }
}
