import { Vector } from './vector';
import { CellValue } from './cell-value';

export type LevelMapItems<T = CellValue> = T[][];


export class LevelMap<T = CellValue> {
  private items: LevelMapItems<T> = [];

  get size(): Vector {
    return {x: this.items[0].length, y: this.items.length};
  }

  constructor(map?: LevelMapItems<T>) {
    if (map) {
      map.forEach((row, y) => {
        row.forEach((v, x) => {
          this.set({x, y}, v);
        });
      });
    }
  }

  get({x, y}: Vector): T {
    const row = this.items[y];
    return row?.[x] ? row[x] : null;
  }

  set({x, y}: Vector, v: T) {
    if (!this.items[y]) {
      this.items[y] = [];
    }
    this.items[y][x] = v;
  }
}
