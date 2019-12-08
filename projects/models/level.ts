export type LevelSchema = Array<Array<0 | 1>>;

export interface Level {
  color: string;
  schema: LevelSchema;
  scoreToOpen: number;
}
