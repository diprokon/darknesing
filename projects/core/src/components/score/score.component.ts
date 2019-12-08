import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'drk-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {
  @Input()
  score: number;
}
