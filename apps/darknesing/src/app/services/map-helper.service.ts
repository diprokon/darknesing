import { Injectable } from '@angular/core';
import { CellValue, LevelMap, Vector } from '../models';

function compareCells(valA: CellValue, valB: CellValue): boolean {
  return (!valA || valA.isEmpty()) ||
    (!valB || valB.isEmpty()) ||
    valA.equals(valB);
}


function doAround(map: LevelMap, { x, y }: Vector, action: (val: CellValue, { x, y }?: Vector, map?: LevelMap) => void) {
  action(map.get({ x: x - 1, y }), { x: x - 1, y }, map);
  action(map.get({ x: x + 1, y }), { x: x + 1, y }, map);
  action(map.get({ x, y: y - 1 }), { x, y: y - 1 }, map);
  action(map.get({ x, y: y + 1 }), { x, y: y + 1 }, map);
}

@Injectable({
  providedIn: 'root'
})
export class MapHelperService {

  constructor() {
  }

  toggle(levelMap: LevelMap, pos: Vector) {
    const val = levelMap.get(pos);
    if (val) {
      doAround(levelMap, pos, (valB) => {
        if (valB) {
          valB.toggleValue();
        }
      });
      doAround(levelMap, pos, (valB, v) => {
        if (valB && !valB.isEmpty() && this.checkCell(levelMap, v)) {
          valB.setEmpty();
        }
      });
    }
  }

  checkCell(map: LevelMap, v: Vector): boolean {
    const equals: boolean[] = [],
      value = map.get(v);
    doAround(map, v, (valA) => equals.push(compareCells(value, valA)));
    return !equals.some(val => !val);
  }
}
