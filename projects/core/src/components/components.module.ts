import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DRKPipesModule } from '../pipes/pipes.module';

import { GameFieldComponent } from './game-field/game-field.component';
import { CardComponent } from './card/card.component';
import { LevelsTableComponent } from './levels-table/levels-table.component';
import { ScoreComponent } from './score/score.component';

export { GameFieldComponent } from './game-field/game-field.component';
export { CardComponent } from './card/card.component';
export { LevelsTableComponent } from './levels-table/levels-table.component';
export { ScoreComponent } from './score/score.component';

const components = [GameFieldComponent, CardComponent, LevelsTableComponent, ScoreComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    DRKPipesModule
  ],
  exports: [...components]
})
export class DRKComponentsModule {
}
