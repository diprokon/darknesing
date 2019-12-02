import { Component, OnInit } from '@angular/core';
import { GameService, MapHelperService } from '../../services';
import { Vector } from '../../models';

@Component({
  selector: 'drk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  get levelMap() {
    return this.game.levelMap;
  }

  constructor(public game: GameService, public mapHelper: MapHelperService) {
  }

  ngOnInit() {
    this.game.newGame();
  }

  toggle(pos: Vector) {
    this.mapHelper.toggle(this.levelMap, pos);
    if (!this.mapHelper.hasAvailableMoves(this.levelMap)) {
      alert('end');
      this.game.nextLevel();
    }
  }

}
