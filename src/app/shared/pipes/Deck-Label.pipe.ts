import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'deckLabel',
})
export class DeckLabelPipe implements PipeTransform {
  transform(deckId: number): string {
    return `Deck #${deckId}`;
  }
}
