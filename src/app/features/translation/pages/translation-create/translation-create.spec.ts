import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationCreate } from './translation-create';

describe('TranslationCreate', () => {
  let component: TranslationCreate;
  let fixture: ComponentFixture<TranslationCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
