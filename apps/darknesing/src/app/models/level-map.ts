import { Vector } from './vector';

export type CellValue = 0 | 1 | -1;

type LevelMapItems = CellValue[][];


export class LevelMap {
  private items: LevelMapItems = [];

  get size(): Vector {
    return {x: this.items[0].length, y: this.items.length};
  }

  constructor(map?: LevelMapItems) {
    if (map) {
      map.forEach((row, y) => {
        row.forEach((v, x) => {
          this.set({x, y}, v);
        });
      });
    }
  }

  get({x, y}: Vector): CellValue {
    const row = this.items[y];
    if (row && row[x]) {
      return row[x];
    } else {
      return 0;
    }
  }

  set({x, y}: Vector, v: CellValue) {
    if (!this.items[y]) {
      this.items[y] = [];
    }
    this.items[y][x] = v;
  }
}
