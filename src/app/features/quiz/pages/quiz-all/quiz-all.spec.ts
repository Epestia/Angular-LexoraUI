import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAll } from './quiz-all';

describe('QuizAll', () => {
  let component: QuizAll;
  let fixture: ComponentFixture<QuizAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizAll],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
