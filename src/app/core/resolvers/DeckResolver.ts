import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckResolver implements Resolve<Deck> {
  constructor(private deckService: DeckService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Deck> {
    const deckId = route.paramMap.get('id');
    console.log(deckId);
    return this.deckService.getDeckById(Number(deckId));
  }
}
