import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../api/api-endpoints';
import { UserFlashcardProgress } from '../models/UserFlashcardProgress';
import { Deck } from '../models/deck';
import { Flashcard } from '../models/flashcard';

@Injectable({ providedIn: 'root' })
export class userFlashcardProgressService {
  private apiUrl = API_ENDPOINTS.userProgress;

  constructor(private http: HttpClient) {}

  getDecks() {
    return this.http.get<Deck[]>(API_ENDPOINTS.decks);
  }

  getFlashcardsByDeck(deckId: number) {
    return this.http.get<Flashcard[]>(`${API_ENDPOINTS.flashcards}/deck/${deckId}`);
  }

  getByUserId(userId: number) {
    return this.http.get<UserFlashcardProgress[]>(`${this.apiUrl}/user/${userId}`);
  }

  getById(id: number) {
    return this.http.get<UserFlashcardProgress>(`${this.apiUrl}/${id}`);
  }

  create(progress: UserFlashcardProgress) {
    return this.http.post<UserFlashcardProgress>(this.apiUrl, progress);
  }

  update(id: number, session: UserFlashcardProgress) {
    return this.http.put<UserFlashcardProgress>(`${this.apiUrl}/${id}`, session);
  }
}
