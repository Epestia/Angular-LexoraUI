import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatedSentenceCreate } from './translated-sentence-create';

describe('TranslatedSentenceCreate', () => {
  let component: TranslatedSentenceCreate;
  let fixture: ComponentFixture<TranslatedSentenceCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatedSentenceCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslatedSentenceCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
