import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LevelMap, Vector } from '@drk/models';

@Component({
  selector: 'drk-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameFieldComponent {
  @Input()
  levelMap: LevelMap;

  @Output()
  toggle = new EventEmitter<Vector>();

  onCardClick(pos: Vector) {
    if (this.levelMap.get(pos)?.isEmpty()) {
      return;
    }
    this.toggle.emit(pos);
  }
}
