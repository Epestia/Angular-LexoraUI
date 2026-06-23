import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TranslationService } from '../../../../core/services/translation.service';
import { Translation } from '../../../../core/models/translation';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule],
  templateUrl: './translation.html',
  styleUrl: './translation.css',
})
export class TranslationComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);

  translations = signal<Translation[]>([]);

  constructor() {
    this.loadTranslations();
  }

  loadTranslations(): void {
    this.translationService.getAll().subscribe({
      next: (data) => this.translations.set(data),
      error: (err) => console.error(err),
    });
  }

  goToCreate(): void {
    this.router.navigate(['/translations/create']);
  }

  deleteTranslation(id: number): void {
    if (!confirm('Supprimer cette traduction ?')) return;

    this.translationService.delete(id).subscribe({
      next: () => this.loadTranslations(),
      error: (err) => console.error('Erreur delete translation', err),
    });
  }
}
