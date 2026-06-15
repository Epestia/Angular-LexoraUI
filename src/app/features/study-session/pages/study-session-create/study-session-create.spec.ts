import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySessionCreate } from './study-session-create';

describe('StudySessionCreate', () => {
  let component: StudySessionCreate;
  let fixture: ComponentFixture<StudySessionCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySessionCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySessionCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
