import { Injectable } from '@angular/core';
import { CellValue, LevelMap, Vector } from '../models';

function isEmptyCell(value: CellValue): boolean {
  return !value || value.isEmpty();
}

function compareCells(valA: CellValue, valB: CellValue): boolean {
  return isEmptyCell(valA) || isEmptyCell(valB) || valA.equals(valB);
}

@Injectable({
  providedIn: 'root'
})
export class MapHelperService {
  doAround(map: LevelMap, { x, y }: Vector, action: (val: CellValue, { x, y }?: Vector, map?: LevelMap) => void) {
    const points = [
      { x: x + 1, y },
      { x, y: y + 1 },
      { x: x - 1, y },
      { x, y: y - 1 }
    ];
    return points
      .some((pos: Vector) => {
        return action(map.get(pos), pos, map);
      });
  }

  toggle(levelMap: LevelMap, pos: Vector): Vector[] {
    const val = levelMap.get(pos);
    const result = [];
    if (!isEmptyCell(val)) {
      this.doAround(levelMap, pos, (valB) => {
        if (valB) {
          valB.toggleValue();
        }
      });
      this.doAround(levelMap, pos, (valB, v) => {
        if (valB && !valB.isEmpty() && this.checkCell(levelMap, v)) {
          valB.setEmpty();
          result.push(v);
        }
      });
    }
    return result;
  }

  checkCell(map: LevelMap, v: Vector): boolean {
    const equals: boolean[] = [];
    const value = map.get(v);
    this.doAround(map, v, (valA) => {
      equals.push(compareCells(value, valA));
    });
    return !equals.some(val => !val);
  }

  isEmptyCell(map: LevelMap, v: Vector) {
    return isEmptyCell(map.get(v));
  }

  hasAvailableMoves(map: LevelMap): boolean {
    const lockedPositions = [];
    for (let y = 0; y < map.size.y; y++) {
      for (let x = 0; x < map.size.x; x++) {
        const pos = { x, y };
        const cellValue = map.get(pos);
        if (!isEmptyCell(cellValue) && !lockedPositions.some(v => Vector.isEqual(v, pos))) {
          const deadEnd1 = this.checkDeadEnd1(map, pos);
          if (deadEnd1) {
            lockedPositions.push(...deadEnd1);
            continue;
          }
          const isSomeone = this.doAround(map, pos, (val) => {
            if (val && !val.isEmpty()) {
              return true;
            }
          });
          if (isSomeone && !this.checkDeadEnd1(map, pos)) {
            return true;
          }
        }
      }
    }


    return false;
  }

  /***
   * Check if it is this situation
   * [
   *  ...
   *  ..., (1), -1, ...
   *  ..., 1, -1, ...
   *  ...
   * ]
   */
  checkDeadEnd1(map: LevelMap, pos: Vector, value11: CellValue = map.get(pos)): Vector[] | false {
    const values = [];
    this.doAround(map, pos, (val, p) => {
      values.push(val);
    });
    if (isEmptyCell(values[0]) || isEmptyCell(values[1]) || !isEmptyCell(values[2]) || !isEmptyCell(values[3])) {
      return false;
    }
    const [value12, value21, value22] = [values[0], values[1], map.get({ x: pos.x + 1, y: pos.y + 1 })];
    if (!isEmptyCell(value22) && !value11.equals(value22) && !value12.equals(value21)) {
      return [pos, { x: pos.x + 1, y: pos.y }, { x: pos.x + 1, y: pos.y + 1 }, { x: pos.x, y: pos.y + 1 }];
    }
    return false;
  }
}

