import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Alive, GameService } from '@drk/core';

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
