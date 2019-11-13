import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableProp } from '../../decorators';
import { CellValue, LevelMap, levels, LevelSchema } from '../models';


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
    this.levelMap = this.generateLevel(level.schema);
    this.backgroundColor = level.color;
  }

  private generateLevel(schema: LevelSchema): LevelMap | null {
    const levelMap = new LevelMap();

    for (let y = 0; y < schema.length; y++) {
      for (let x = 0; x < schema[y].length; x++) {
        let val = 0;
        if (schema[y][x]) {
          val = Math.floor(Math.random() * 2);
          val = val === 1 ? val : -1;
        }
        levelMap.set({ x, y }, val as CellValue);
      }
    }
    return levelMap;
  }
}
