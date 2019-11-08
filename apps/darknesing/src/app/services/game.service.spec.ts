import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it('should generate level', () => {
    const service: GameService = TestBed.get(GameService);
    service.newGame();
    const level1 = service.levelMap;
    service.newGame();
    const level2 = service.levelMap;

    expect(level1).not.toEqual(level2);
    expect([level1, level2].some(l => !!l)).toBeTruthy();
  });
});
