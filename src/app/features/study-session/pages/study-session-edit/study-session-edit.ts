import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { userFlashcardProgressService } from '../../../../core/services/user-flashcard-progress-service';
import { UserFlashcardProgress } from '../../../../core/models/UserFlashcardProgress';

import { InputNumberModule } from 'primeng/inputnumber';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-study-session-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './study-session-edit.html',
  styleUrl: './study-session-edit.css',
})
export class StudySessionEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(userFlashcardProgressService);

  session = signal<UserFlashcardProgress | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(id).subscribe({
      next: (data) => this.session.set(data),
      error: (err) => console.error(err),
    });
  }

  save(): void {
    const data = this.session();
    if (!data || !data.id) return;

    this.service.update(data.id, data).subscribe({
      next: () => {
        this.router.navigate(['/study-session']);
      },
      error: (err) => console.error(err),
    });
  }
}
