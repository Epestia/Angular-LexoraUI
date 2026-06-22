import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TranslatedSentence } from '../../../../core/models/translated-sentence';
import { TranslatedSentenceService } from '../../../../core/services/translated-sentence.service';

@Component({
  selector: 'app-translated-sentence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translated-sentence.html',
  styleUrl: './translated-sentence.css',
})
export class TranslatedSentenceComponent implements OnInit {
  private translatedSentenceService = inject(TranslatedSentenceService);
  private router = inject(Router);

  sentences = signal<TranslatedSentence[]>([]);

  ngOnInit(): void {
    this.loadSentences();
  }

  loadSentences(): void {
    this.translatedSentenceService.getMySentences().subscribe({
      next: (data) => {
        this.sentences.set(data);
      },
      error: (err) => {
        console.error('Erreur chargement phrases', err);
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(['/translated-sentences/create']);
  }

  deleteSentence(id: number): void {
    if (!confirm('Supprimer cette phrase ?')) {
      return;
    }

    this.translatedSentenceService.delete(id).subscribe({
      next: () => {
        this.sentences.update((sentences) => sentences.filter((s) => s.id !== id));
      },
      error: (err) => {
        console.error('Erreur suppression', err);
      },
    });
  }
}
