import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeckService } from '../../../../core/services/deck.service';
import { DeckStatus } from '../../../../core/models/deck';

@Component({
  selector: 'app-deck-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './deck-create.html',
})
export class DeckCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private deckService = inject(DeckService);

  deckForm = this.fb.group({
    title: ['', Validators.required],
    language: ['', Validators.required],
    isPublic: [false],
    status: ['PRIVATE' as DeckStatus],
  });

  onSubmit(): void {
    if (this.deckForm.invalid) return;

    const raw = this.deckForm.getRawValue();

    const payload = {
      title: raw.title ?? undefined,
      language: raw.language ?? undefined,
      isPublic: raw.isPublic ?? false,
      status: (raw.status ?? 'PRIVATE') as DeckStatus,
    };

    this.deckService.createDeck(payload).subscribe({
      next: () => this.router.navigate(['/decks']),
      error: console.error,
    });
  }
}
