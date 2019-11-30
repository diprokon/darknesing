import { TestBed } from '@angular/core/testing';

import { MapHelperService } from './map-helper.service';
import { CellState, CellValue, LevelMap, Vector } from '../models';

function convertToCellValue(map: CellState[][]): CellValue[][] {
  return map
    .map(row => row
      .map(state => new CellValue(state))
    );
}

function getLevelMap(map: CellState[][]): LevelMap<CellValue> {
  return new LevelMap<CellValue>(convertToCellValue(map));
}

const vectors: { [key: string]: Vector } = {
  v00: { x: 0, y: 0 },
  v01: { x: 0, y: 1 },
  v02: { x: 0, y: 2 },
  v10: { x: 1, y: 0 },
  v11: { x: 1, y: 1 },
  v12: { x: 1, y: 2 },
  v20: { x: 2, y: 0 },
  v21: { x: 2, y: 1 },
  v22: { x: 2, y: 2 }
};

describe('MapHelperService', () => {
  let service: MapHelperService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MapHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should doAround in correct order', () => {
    const map: LevelMap = getLevelMap([
      [1, 1],
      [0, 0]
    ]);
    const positions = [];
    const values = [];

    service.doAround(map, vectors.v00, (val, v) => {
      values.push(val);
      positions.push(v);
    });

    expect(positions[0]).toEqual(vectors.v10);
    expect(positions[1]).toEqual(vectors.v01);
    expect(positions[2]).toEqual({ x: -1, y: 0 });
    expect(positions[3]).toEqual({ x: 0, y: -1 });

    expect(values[0]).toEqual(new CellValue(1));
    expect(values[1]).toEqual(new CellValue(0));
    expect(values[2]).toEqual(null);
    expect(values[3]).toEqual(null);
  });

  it('should break doAround if return value from inside', () => {
    const map: LevelMap = getLevelMap([
      [1, 1],
      [0, 0]
    ]);
    const positions = [];

    service.doAround(map, vectors.v00, (val, v) => {
      positions.push(v);
      return Vector.isEqual(v, vectors.v01);
    });

    expect(positions.length).toEqual(2);
    expect(positions[0]).toBeTruthy();
  });

  it('should check, if cell is done', () => {
    const map: LevelMap = getLevelMap([
      [1, 1, -1],
      [1, 1, 1],
      [1, 1, 0]
    ]);
    expect(service.checkCell(map, vectors.v11)).toBeTruthy();
    expect(service.checkCell(map, vectors.v01)).toBeTruthy();
    expect(service.checkCell(map, vectors.v12)).toBeTruthy();
    expect(service.checkCell(map, vectors.v10)).toBeFalsy();
    expect(service.checkCell(map, vectors.v21)).toBeFalsy();
  });

  it('should toggle cell and check around', () => {
    jasmine.clock().install();
    const levelMap = getLevelMap([
      [1, 1, -1],
      [1, 1, 1],
      [-1, 1, 0]
    ]);
    service.toggle(levelMap, vectors.v01);

    /*
        [-1, 1, -1],
        [1, -1, 1],
        [0, 1, 0]
     */

    expect(levelMap.get(vectors.v00).state).toBe(-1);
    expect(levelMap.get(vectors.v01).state).toBe(1);
    expect(levelMap.get(vectors.v02).state).toBe(0);
    expect(levelMap.get(vectors.v10).state).toBe(1);
    expect(levelMap.get(vectors.v11).state).toBe(-1);
    expect(levelMap.get(vectors.v12).state).toBe(1);
    expect(levelMap.get(vectors.v20).state).toBe(-1);
    expect(levelMap.get(vectors.v21).state).toBe(1);
    expect(levelMap.get(vectors.v22).state).toBe(0);

    jasmine.clock().uninstall();
  });

  it('check deadEnd1', () => {
    let levelMap = getLevelMap([
      [1, -1, 1],
      [1, -1, 1],
      [1, -1, 0]
    ]);

    expect(service.checkDeadEnd1(levelMap, vectors.v00)).toEqual([vectors.v00, vectors.v10, vectors.v11, vectors.v01]);
    expect(service.checkDeadEnd1(levelMap, vectors.v10)).toBeFalsy();
    expect(service.checkDeadEnd1(levelMap, vectors.v01)).toBeFalsy();
    expect(service.checkDeadEnd1(levelMap, vectors.v11)).toBeFalsy();

    levelMap = getLevelMap([
      [0, -1, 1],
      [1, -1, 1],
      [1, -1, 1]
    ]);

    expect(service.checkDeadEnd1(levelMap, vectors.v10)).toEqual([vectors.v10, vectors.v20, vectors.v21, vectors.v11]);
    expect(service.checkDeadEnd1(levelMap, vectors.v01)).toBeTruthy([vectors.v01, vectors.v11, vectors.v12, vectors.v02]);
    expect(service.checkDeadEnd1(levelMap, vectors.v11)).toBeFalsy();

    levelMap = getLevelMap([
      [1, -1, 1],
      [1, 0, 1],
      [1, -1, 1]
    ]);

    expect(service.checkDeadEnd1(levelMap, vectors.v00)).toBeFalsy();
    expect(service.checkDeadEnd1(levelMap, vectors.v01)).toBeFalsy();
    expect(service.checkDeadEnd1(levelMap, vectors.v21)).toBeFalsy();
  });

  it('should know when there no moves left', () => {
    let levelMap = getLevelMap([
      [1, 1, -1],
      [1, 1, 1],
      [-1, 1, 0]
    ]);

    expect(service.hasAvailableMoves(levelMap)).toBeTruthy();

    levelMap = getLevelMap([
      [1, 1, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);

    expect(service.hasAvailableMoves(levelMap)).toBeTruthy();

    levelMap = getLevelMap([
      [1, 0, -1],
      [0, 1, 0],
      [-1, 0, 1]
    ]);

    expect(service.hasAvailableMoves(levelMap)).toBeFalsy();

    levelMap = getLevelMap([
      [-1, 1, 0],
      [1, -1, 0],
      [0, 0, 0]
    ]);

    expect(service.hasAvailableMoves(levelMap)).toBeTruthy();

    levelMap = getLevelMap([
      [0, 1, 1],
      [0, -1, 1],
      [0, 0, 0]
    ]);

    expect(service.hasAvailableMoves(levelMap)).toBeTruthy();

    levelMap = getLevelMap([
      [-1, 1, 0],
      [-1, 1, 0],
      [0, 0, 0]
    ]);

    expect(service.hasAvailableMoves(levelMap)).toBeFalsy();
  });
});
