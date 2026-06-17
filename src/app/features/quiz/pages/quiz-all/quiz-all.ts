import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

import { QuizService } from '../../../../core/services/quiz.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Quiz } from '../../../../core/models/quiz';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-quiz-all',
  standalone: true,
  imports: [CommonModule, TableModule, ChartModule],
  templateUrl: './quiz-all.html',
  styleUrls: ['./quiz-all.css'],
})
export class QuizAllComponent implements OnInit {
  private quizService = inject(QuizService);
  private authService = inject(AuthService);

  quizzes = signal<Quiz[]>([]);
  loading = signal(true);

  chartData: any;
  chartOptions: any;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        const userId = this.authService.user()?.id;

        const filtered = data.filter((q) => q.userId === userId);

        this.quizzes.set(filtered);
        this.loading.set(false);

        this.buildChart(filtered);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  // ================= CHART =================
  buildChart(quizzes: Quiz[]): void {
    const labels = quizzes.map((q) => new Date(q.attemptDate).toLocaleDateString());

    const scores = quizzes.map((q) => q.score);
    const totals = quizzes.map((q) => q.totalQuestions);

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Score',
          data: scores,
          backgroundColor: '#42A5F5',
        },
        {
          label: 'Total questions',
          data: totals,
          backgroundColor: '#FFA726',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  }
  exportPdf(): void {
    const doc = new jsPDF();

    const user = this.authService.user();

    doc.setFontSize(16);
    doc.text('Mes résultats de quiz', 14, 15);

    doc.setFontSize(10);
    doc.text(`Utilisateur: ${user?.sub ?? ''}`, 14, 22);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 28);

    const rows = this.quizzes().map((q) => [
      q.id,
      `Deck #${q.deckId}`,
      new Date(q.attemptDate).toLocaleString(),
      `${q.score} / ${q.totalQuestions}`,
    ]);

    autoTable(doc, {
      head: [['ID', 'Deck', 'Date', 'Score']],
      body: rows,
      startY: 35,
    });

    doc.save('quiz-resultats.pdf');
  }
}
