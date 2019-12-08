import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Level } from '@drk/models';

@Component({
  selector: 'drk-levels-table',
  templateUrl: './levels-table.component.html',
  styleUrls: ['./levels-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelsTableComponent {
  @Input()
  levels: Level[];

  @Input()
  currentLevelIndex: number;

  @Input()
  scoreToNextLevel: number;
}
