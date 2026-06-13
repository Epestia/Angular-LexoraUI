import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DeckService } from '../../../../core/services/deck.service';
import { Deck, DeckStatus } from '../../../../core/models/deck';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-deck-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './deck-edit.html',
})
export class DeckEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private deckService = inject(DeckService);
  authService = inject(AuthService);
  deckId!: number;

  deckForm = this.fb.group({
    title: ['', Validators.required],
    language: ['', Validators.required],
    isPublic: [false],
    status: ['PRIVATE' as DeckStatus],

    validatedById: [null as number | null],
    validationDate: [null as string | null],
  });

  ngOnInit(): void {
    this.deckId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDeck();
  }

  loadDeck(): void {
    this.deckService.getDeckById(this.deckId).subscribe({
      next: (deck) => {
        this.deckForm.patchValue({
          title: deck.title,
          language: deck.language,
          isPublic: deck.isPublic,
          status: deck.status,
          validatedById: deck.validatedById ?? null,
          validationDate: deck.validationDate ?? null,
        });
      },
      error: console.error,
    });
  }

  onSubmit(): void {
    if (this.deckForm.invalid) return;

    const raw = this.deckForm.getRawValue();

    const payload = {
      title: raw.title ?? undefined,
      language: raw.language ?? undefined,
      isPublic: raw.isPublic ?? false,
      status: (raw.status ?? 'PRIVATE') as DeckStatus,
      validatedById: raw.validatedById ?? undefined,
      validationDate: raw.validationDate ?? undefined,
    };

    this.deckService.updateDeck(this.deckId, payload).subscribe({
      next: () => this.router.navigate(['/decks']),
      error: console.error,
    });
  }
}
