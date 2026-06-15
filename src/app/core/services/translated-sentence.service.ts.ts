import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../api/api-endpoints';
import { TranslatedSentence } from '../models/translated-sentence';

@Injectable({
  providedIn: 'root',
})
export class TranslatedSentenceService {
  private http = inject(HttpClient);

  private readonly apiUrl = API_ENDPOINTS.translatedSentences;

  getById(id: number): Observable<TranslatedSentence> {
    return this.http.get<TranslatedSentence>(`${this.apiUrl}/${id}`);
  }

  getByTranslationId(translationId: number): Observable<TranslatedSentence[]> {
    return this.http.get<TranslatedSentence[]>(`${this.apiUrl}/translation/${translationId}`);
  }

  create(sentence: TranslatedSentence): Observable<TranslatedSentence> {
    return this.http.post<TranslatedSentence>(this.apiUrl, sentence);
  }

  update(id: number, sentence: TranslatedSentence): Observable<TranslatedSentence> {
    return this.http.put<TranslatedSentence>(`${this.apiUrl}/${id}`, sentence);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
