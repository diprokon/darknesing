import { Component, OnInit } from '@angular/core';
import { GameService } from '@drk/core';
import { levels } from '@drk/env';

@Component({
  selector: 'drk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  levels = levels;

  constructor(public game: GameService) {
  }

  ngOnInit() {
    this.game.newGame();
  }

}
