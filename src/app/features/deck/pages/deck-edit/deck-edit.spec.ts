import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckEdit } from './deck-edit';

describe('DeckEdit', () => {
  let component: DeckEdit;
  let fixture: ComponentFixture<DeckEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
