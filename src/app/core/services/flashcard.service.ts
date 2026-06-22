import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Flashcard } from '../models/flashcard';
import { API_ENDPOINTS } from '../api/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(API_ENDPOINTS.flashcards);
  }

  getById(id: number): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${API_ENDPOINTS.flashcards}/${id}`);
  }

  getByDeck(deckId: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${API_ENDPOINTS.flashcards}/deck/${deckId}`);
  }

  create(flashcard: Flashcard): Observable<Flashcard> {
    return this.http.post<Flashcard>(API_ENDPOINTS.flashcards, flashcard);
  }

  update(id: number, flashcard: Flashcard): Observable<Flashcard> {
    return this.http.put<Flashcard>(`${API_ENDPOINTS.flashcards}/${id}`, flashcard);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.flashcards}/${id}`);
  }

  getMyFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${API_ENDPOINTS.flashcards}/my-flashcards`);
  }
}
