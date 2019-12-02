import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableProp } from '../../decorators';
import { CellValue, Level, LevelMap, levels, Vector } from '../models';
import { MapHelperService } from './map-helper.service';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  @ObservableProp(levels[0].color)
  backgroundColor: string;
  backgroundColor$: Observable<string>;

  levelIndex: number;
  levelMap: LevelMap;
  private startScore = 0;
  score = 0;
  isInGame = false;

  get isNextLevelAvailable(): boolean {
    return !this.isInGame && (this.score - this.startScore) >= this.currentLevel.scoreToOpen;
  }

  get currentLevel() {
    return levels[this.levelIndex];
  }

  constructor(private mapHelper: MapHelperService) {
  }

  newGame() {
    this.levelIndex = -1;
    this.startScore = 0;
    this.score = 0;
    this.nextLevel();
  }

  nextLevel() {
    this.isInGame = true;
    this.startScore = this.score;
    this.levelIndex++;
    this.levelMap = this.generateLevel(this.currentLevel);
    this.backgroundColor = this.currentLevel.color;
  }

  toggle(pos: Vector) {
    if (!this.isInGame) {
      return;
    }
    if (this.mapHelper.isEmptyCell(this.levelMap, pos)) {
      return;
    }
    const empty = this.mapHelper.toggle(this.levelMap, pos);
    empty
      .forEach(v => {
        this.score += this.levelMap.get(v).score;
      });
    if (!this.mapHelper.hasAvailableMoves(this.levelMap)) {
      this.isInGame = false;
    }
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
