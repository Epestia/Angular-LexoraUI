import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quizScore',
})
export class QuizScorePipe implements PipeTransform {
  transform(score: number, total: number): string {
    return `${score} / ${total}`;
  }
}
