import { Component, OnInit } from '@angular/core';
import { GameService, MapHelperService } from '../../services';

@Component({
  selector: 'drk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public game: GameService, public mapHelper: MapHelperService) {
  }

  ngOnInit() {
    this.game.newGame();
  }

}
