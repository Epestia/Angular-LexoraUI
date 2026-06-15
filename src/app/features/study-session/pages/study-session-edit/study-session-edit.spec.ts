import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySessionEdit } from './study-session-edit';

describe('StudySessionEdit', () => {
  let component: StudySessionEdit;
  let fixture: ComponentFixture<StudySessionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySessionEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySessionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
