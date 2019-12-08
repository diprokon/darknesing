import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableProp } from '../core';
import { LevelMap, Vector } from '@drk/models';
import { MapHelperService } from './map-helper.service';
import { RandomGeneratorService } from './random-generator.service';
import { levels } from '@drk/env';


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
  scoreToNextLevel = 0;
  isInGame = false;

  get isNextLevelAvailable(): boolean {
    return !this.isInGame && this.score >= this.scoreToNextLevel;
  }

  get currentLevel() {
    return levels[this.levelIndex];
  }

  constructor(private mapHelper: MapHelperService, private generator: RandomGeneratorService) {
  }

  newGame() {
    this.levelIndex = -1;
    this.startScore = 0;
    this.score = 0;
    this.nextLevel();
  }

  nextLevel() {
    this.isInGame = true;
    this.levelIndex++;
    this.startScore = this.score;
    this.scoreToNextLevel = this.score + this.currentLevel.scoreToOpen;
    this.levelMap = this.generator.generateLevel(this.currentLevel);
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
}
