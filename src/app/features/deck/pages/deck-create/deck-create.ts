import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DeckService } from '../../../../core/services/deck.service';
import { DeckStatus } from '../../../../core/models/deck';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-deck-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CheckboxModule, ButtonModule],
  templateUrl: './deck-create.html',
  styleUrl: './deck-create.css',
})
export class DeckCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private deckService = inject(DeckService);

  statusOptions = [
    { label: 'Private', value: 'PRIVATE' },
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Draft', value: 'DRAFT' },
  ];

  deckForm = this.fb.group({
    title: ['', Validators.required],
    language: ['', Validators.required],
    isPublic: [false],
    status: ['PRIVATE' as DeckStatus],
  });

  onSubmit(): void {
    if (this.deckForm.invalid) return;

    const raw = this.deckForm.getRawValue();

    this.deckService
      .createDeck({
        title: raw.title ?? '',
        language: raw.language ?? '',
        isPublic: raw.isPublic ?? false,
        status: (raw.status ?? 'PRIVATE') as DeckStatus,
      })
      .subscribe({
        next: () => this.router.navigate(['/decks']),
        error: (err) => console.error(err),
      });
  }
}
