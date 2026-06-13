import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsCreate } from './flashcards-create';

describe('FlashcardsCreate', () => {
  let component: FlashcardsCreate;
  let fixture: ComponentFixture<FlashcardsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardsCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
