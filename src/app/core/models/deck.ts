export type DeckStatus = 'PRIVATE' | 'PENDING_VALIDATION' | 'APPROVED';

export interface Deck {
  id?: number;
  title: string;
  language: string;
  isPublic: boolean;
  status: DeckStatus;

  createdById?: number;

  validatedById?: number | null;
  validationDate?: string | null;
}
