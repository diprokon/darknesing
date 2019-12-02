import { Component, OnInit } from '@angular/core';
import { levels } from '../../models';
import { GameService } from '../../services';

@Component({
  selector: 'drk-levels-table',
  templateUrl: './levels-table.component.html',
  styleUrls: ['./levels-table.component.scss']
})
export class LevelsTableComponent implements OnInit {

  levels = levels;

  constructor(public game: GameService) { }

  ngOnInit() {
  }

}
