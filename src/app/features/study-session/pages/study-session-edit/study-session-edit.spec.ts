import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySessionEditComponent } from './study-session-edit';

describe('StudySessionEdit', () => {
  let component: StudySessionEditComponent;
  let fixture: ComponentFixture<StudySessionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySessionEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySessionEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
