import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableProp } from '../../decorators';
import { CellValue, Level, LevelMap, levels } from '../models';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  @ObservableProp(levels[0].color)
  backgroundColor: string;
  backgroundColor$: Observable<string>;

  levelNumber = 0;
  levelMap: LevelMap;


  constructor() {
  }

  newGame() {
    this.levelNumber = 0;
    this.nextLevel();
  }

  nextLevel() {
    this.levelNumber++;
    const level = levels[this.levelNumber - 1];
    this.levelMap = this.generateLevel(level);
    this.backgroundColor = level.color;
  }

  private generateLevel({ schema }: Level): LevelMap | null {
    const levelMap = new LevelMap();

    for (let y = 0; y < schema.length; y++) {
      for (let x = 0; x < schema[y].length; x++) {
        let val: CellValue = null;
        if (schema[y][x]) {
          const score = Math.floor(Math.random() * 50);
          const state = Math.floor(Math.random() * 2);
          val = new CellValue(state === 1 ? 1 : -1, score);
        }
        levelMap.set({ x, y }, val);
      }
    }
    return levelMap;
  }
}
