import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySessionComponent } from './study-session';

describe('StudySession', () => {
  let component: StudySessionComponent;
  let fixture: ComponentFixture<StudySessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySessionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySessionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
