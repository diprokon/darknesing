import { Injectable } from '@angular/core';
import { CellState, CellValue, Level, LevelMap, scoreWeightMap, WeightMap } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {
  private scoreRandomize = this.randomByWeightFactory(scoreWeightMap);

  constructor() {
  }

  getState(): CellState {
    return Math.floor(Math.random() * 2) > 0 ? 1 : -1;
  }

  getScore(): number {
    return this.scoreRandomize();
  }

  generateLevel({schema}: Level): LevelMap {
    const levelMap = new LevelMap();

    for (let y = 0; y < schema.length; y++) {
      for (let x = 0; x < schema[y].length; x++) {
        let val: CellValue = null;
        if (schema[y][x]) {
          val = new CellValue(this.getState(), this.getScore());
        }
        levelMap.set({x, y}, val);
      }
    }
    return levelMap;
  }

  randomByWeightFactory<T>(map: WeightMap<T>): () => T {
    const variants: T[] = [];

    Object.values(map)
      .forEach(item => {
        variants.push(...Array(item.weight).fill(item.value));
      });

    return () => {
      const index = Math.floor(Math.random() * variants.length);
      return variants[index];
    };
  }
}
