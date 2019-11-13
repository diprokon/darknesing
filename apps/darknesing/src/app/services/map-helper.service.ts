import { Injectable } from '@angular/core';
import { CellValue, LevelMap, Vector } from '../models';

function checkCell(map: LevelMap, v: Vector): boolean {
  const equals: boolean[] = [],
    value = map.get(v);
  doAround(map, v, (val) => equals.push(compareCells(value, val)));

  return !equals.some(val => !val);
}

function compareCells(valA: CellValue, valB: CellValue): boolean {
  return !valA || !valB || valA === valB;
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

  toggle(levelMap: LevelMap, vect: Vector) {
    const val = levelMap.get(vect);
    if (val) {
      doAround(levelMap, vect, (valA, v) => {
        if (valA) {
          valA = -valA as CellValue;
          levelMap.set(v, valA);
        }
      });
      doAround(levelMap, vect, (valA, v) => {
        if (valA && checkCell(levelMap, v)) {
          levelMap.set(v, 0);
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
