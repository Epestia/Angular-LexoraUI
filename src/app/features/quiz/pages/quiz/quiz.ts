import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { DeckService } from '../../../../core/services/deck.service';
import { FlashcardService } from '../../../../core/services/flashcard.service';
import { QuizService } from '../../../../core/services/quiz.service';
import { AuthService } from '../../../../core/services/auth.service';

import { Deck } from '../../../../core/models/deck';
import { Flashcard } from '../../../../core/models/flashcard';
import { QuizScorePipe } from '../../../../shared/pipes/quiz-score.pipe';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize.pipe';
import { DeckLabelPipe } from '../../../../shared/pipes/Deck-Label.pipe';
import { PercentageScorePipe } from '../../../../shared/pipes/percentage-score.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    QuizScorePipe,
    CapitalizePipe,
    DeckLabelPipe,
    PercentageScorePipe,
  ],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'],
})
export class QuizComponent {
  private deckService = inject(DeckService);
  private flashcardService = inject(FlashcardService);
  private quizService = inject(QuizService);
  private authService = inject(AuthService);

  decks = signal<Deck[]>([]);
  answer = signal('');

  quizStarted = signal(false);
  quizFinished = signal(false);


  ngOnInit(): void {
    this.deckService.getMyDecks().subscribe({
      next: (decks) => this.decks.set(decks),
    });
  }

  startQuiz(deckId: number): void {
    this.flashcardService.getByDeck(deckId).subscribe({
      next: (flashcards: Flashcard[]) => {
        this.quizService.start(flashcards, deckId);

        this.quizStarted.set(true);
        this.quizFinished.set(false);
        this.answer.set('');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  submitAnswer(): void {
    this.quizService.submitAnswer(this.answer());

    this.answer.set('');

    if (this.quizService.isFinished()) {
      this.quizFinished.set(true);
    }
  }

  saveQuiz(): void {
    const quiz = {
      id: 0,
      userId: this.authService.user()?.id,
      deckId: this.quizService.getDeckId(),
      attemptDate: new Date().toISOString(),
      score: this.quizService.getScore(),
      totalQuestions: this.quizService.getTotal(),
    };

    this.quizService.saveQuiz(quiz).subscribe({
      next: () => this.restart(),
    });
  }


  restart(): void {
    this.quizStarted.set(false);
    this.quizFinished.set(false);
    this.answer.set('');
    this.quizService.reset();
  }


  get currentFlashcard(): Flashcard | null {
    return this.quizService.getCurrentFlashcard();
  }


  get score(): number {
    return this.quizService.getScore();
  }

  get total(): number {
    return this.quizService.getTotal();
  }
}
