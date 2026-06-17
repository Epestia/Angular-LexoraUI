import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageScore',
})
export class PercentageScorePipe implements PipeTransform {
  transform(score: number, total: number): string {
    if (!total) return '0 %';

    return `${Math.round((score / total) * 100)} %`;
  }
}
