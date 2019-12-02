import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Alive } from '../../utils';

@Component({
  selector: 'drk-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent extends Alive {
  @HostBinding('style.backgroundColor')
  backgroundColor: string;

  constructor(public gameService: GameService) {
    super();
    gameService.backgroundColor$
      .pipe(
        this.whileAlive()
      )
      .subscribe(value => {
        this.backgroundColor = value;
      });
  }
}
