import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck';
import { API_ENDPOINTS } from '../api/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private http: HttpClient) {}

  getAllDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(API_ENDPOINTS.decks);
  }

  getMyDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${API_ENDPOINTS.decks}/me`);
  }

  getDeckById(id: number): Observable<Deck> {
    return this.http.get<Deck>(`${API_ENDPOINTS.decks}/${id}`);
  }

  createDeck(dto: Partial<Deck>): Observable<Deck> {
    return this.http.post<Deck>(API_ENDPOINTS.decks, dto);
  }

  updateDeck(id: number, dto: Partial<Deck>): Observable<Deck> {
    return this.http.put<Deck>(`${API_ENDPOINTS.decks}/${id}`, dto);
  }

  deleteDeck(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.decks}/${id}`);
  }
}
