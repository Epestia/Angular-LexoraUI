import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatedSentence } from './translated-sentence';

describe('TranslatedSentence', () => {
  let component: TranslatedSentence;
  let fixture: ComponentFixture<TranslatedSentence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatedSentence],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslatedSentence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
