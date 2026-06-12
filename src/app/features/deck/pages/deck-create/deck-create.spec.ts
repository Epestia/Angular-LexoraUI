import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCreate } from './deck-create';

describe('DeckCreate', () => {
  let component: DeckCreate;
  let fixture: ComponentFixture<DeckCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
