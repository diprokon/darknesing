import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services';

@Component({
  selector: 'drk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  get levelMap() {
    return this.game.levelMap;
  }

  constructor(public game: GameService) {
  }

  ngOnInit() {
    this.game.newGame();
  }

}
