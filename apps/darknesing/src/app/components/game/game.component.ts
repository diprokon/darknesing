import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MapHelperService } from '../../services/map-helper.service';
import { FromToPipe } from '../../pipes/from-to.pipe';

@Component({
  selector: 'drk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [FromToPipe]

})
export class GameComponent implements OnInit {

  constructor(public game: GameService, public mapHelper: MapHelperService) {
    this.game.newGame();
  }

  ngOnInit() {
  }

}
