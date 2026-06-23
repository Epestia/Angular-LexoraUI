import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../api/api-endpoints';
import { Translation } from '../models/translation';
import { Flashcard } from '../models/flashcard'

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private http = inject(HttpClient);

  private readonly apiUrl = API_ENDPOINTS.translations;

  getAll(): Observable<Translation[]> {
    return this.http.get<Translation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Translation> {
    return this.http.get<Translation>(`${this.apiUrl}/${id}`);
  }

  getByFlashcardId(flashcardId: number): Observable<Translation[]> {
    return this.http.get<Translation[]>(`${this.apiUrl}/flashcard/${flashcardId}`);
  }

  create(translation: Translation): Observable<Translation> {
    return this.http.post<Translation>(this.apiUrl, translation);
  }

  update(id: number, translation: Translation): Observable<Translation> {
    return this.http.put<Translation>(`${this.apiUrl}/${id}`, translation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
