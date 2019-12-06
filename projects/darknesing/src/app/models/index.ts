import { environment } from '../../environments/environment';

export * from './vector';
export * from './level-map';
export * from './level';
export * from './cell-value';
export * from './weight-map';

export const levels = environment.gameConfigs.levels;
export const scoreWeightMap = environment.gameConfigs.scoreWeightMap;
