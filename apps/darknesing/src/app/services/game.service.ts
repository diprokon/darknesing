import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableProp } from '../../decorators';
import { CellValue, colors, LevelMap } from '../models';
import { MapHelperService } from './map-helper.service';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  @ObservableProp(colors[0])
  backgroundColor: string;
  backgroundColor$: Observable<string>;

  size = 5;
  levelMap: LevelMap;

  constructor(private mapHelper: MapHelperService) {
  }

  newGame() {
    let map;
    for (let i = 0; i < 5; i++) {
      map = this.generateLevel();
      if (map) {
        break;
      }
    }
    this.levelMap = map;
  }

  private generateLevel(): LevelMap | null {
    const levelMap = new LevelMap();

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let val = Math.floor(Math.random() * 2);
        const shouldCheckX = x > 0,
          shouldCheckY = y > 0;
        val = val === 1 ? val : -1;
        if (shouldCheckX && this.mapHelper.checkCell(levelMap, { x: x - 1, y })) {
          val = -val;
          if (shouldCheckY && this.mapHelper.checkCell(levelMap, { x, y: y - 1 })) {
            return null;
          }
        } else if (shouldCheckY && this.mapHelper.checkCell(levelMap, { x, y: y - 1 })) {
          val = -val;
          if (shouldCheckX && this.mapHelper.checkCell(levelMap, { x: x - 1, y })) {
            return null;
          }
        }
        levelMap.set({ x, y }, val as CellValue);
      }
    }
    return levelMap;
  }
}
