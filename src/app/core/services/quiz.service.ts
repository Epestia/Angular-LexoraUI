import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Flashcard } from '../models/flashcard';
import { Quiz } from '../models/quiz';
import { API_ENDPOINTS } from '../api/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  // ================= STATE =================
  private flashcards = signal<Flashcard[]>([]);
  private currentIndex = signal(0);
  private score = signal(0);
  private deckId = signal<number | null>(null);

  // ================= START =================
  start(flashcards: Flashcard[], deckId: number): void {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);

    this.flashcards.set(shuffled);
    this.deckId.set(deckId);
    this.currentIndex.set(0);
    this.score.set(0);
  }

  // ================= CURRENT =================
  getCurrentFlashcard(): Flashcard | null {
    const cards = this.flashcards();
    const index = this.currentIndex();

    return cards[index] ?? null;
  }

  // ================= ANSWER =================
  submitAnswer(answer: string): void {
    const card = this.getCurrentFlashcard();
    if (!card) return;

    const isCorrect = this.normalize(answer) === this.normalize(card.backText);

    if (isCorrect) {
      this.score.update((v) => v + 1);
    }

    this.currentIndex.update((v) => v + 1);
  }

  // ================= STATUS =================
  isFinished(): boolean {
    return this.currentIndex() >= this.flashcards().length;
  }

  getScore(): number {
    return this.score();
  }

  getTotal(): number {
    return this.flashcards().length;
  }

  getDeckId(): number {
    return this.deckId() ?? 0;
  }

  // ================= RESET =================
  reset(): void {
    this.flashcards.set([]);
    this.currentIndex.set(0);
    this.score.set(0);
    this.deckId.set(null);
  }

  // ================= NORMALIZE =================
  private normalize(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // ================= SAVE QUIZ =================
  saveQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(API_ENDPOINTS.quiz, quiz);
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(API_ENDPOINTS.quiz);
  }
}
