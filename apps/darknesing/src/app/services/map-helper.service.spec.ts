import { TestBed } from '@angular/core/testing';

import { MapHelperService } from './map-helper.service';
import { LevelMap } from '../models';

describe('MapHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapHelperService = TestBed.get(MapHelperService);
    expect(service).toBeTruthy();
  });

  it('should check, if cell is done', () => {
    const service: MapHelperService = TestBed.get(MapHelperService);
    const map: LevelMap = new LevelMap([
      [1, 1, -1],
      [1, 1, 1],
      [1, 1, 0]
    ]);
    expect(service.checkCell(map, { x: 1, y: 1 })).toBeTruthy();
    expect(service.checkCell(map, { x: 0, y: 1 })).toBeTruthy();
    expect(service.checkCell(map, { x: 1, y: 2 })).toBeTruthy();
    expect(service.checkCell(map, { x: 1, y: 0 })).toBeFalsy();
    expect(service.checkCell(map, { x: 2, y: 1 })).toBeFalsy();
  });

  it('should toggle cell and check around', () => {
    jasmine.clock().install();
    const service: MapHelperService = TestBed.get(MapHelperService);
    const levelMap = new LevelMap([
      [1, 1, -1],
      [1, 1, 1],
      [-1, 1, 0]
    ]);
    service.toggle(levelMap, { x: 0, y: 1 });

    /*
        [-1, 1, -1],
        [1, -1, 1],
        [0, 1, 0]
     */

    expect(levelMap.get({ x: 0, y: 0 })).toBe(-1);
    expect(levelMap.get({ x: 0, y: 1 })).toBe(1);
    expect(levelMap.get({ x: 0, y: 2 })).toBe(0);
    expect(levelMap.get({ x: 1, y: 0 })).toBe(1);
    expect(levelMap.get({ x: 1, y: 1 })).toBe(-1);
    expect(levelMap.get({ x: 1, y: 2 })).toBe(1);
    expect(levelMap.get({ x: 2, y: 0 })).toBe(-1);
    expect(levelMap.get({ x: 2, y: 1 })).toBe(1);
    expect(levelMap.get({ x: 2, y: 2 })).toBe(0);

    jasmine.clock().uninstall();
  });
});
