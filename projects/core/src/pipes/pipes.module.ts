import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FromToPipe } from './from-to.pipe';

export { FromToPipe } from './from-to.pipe';

const pipes = [FromToPipe];

@NgModule({
  declarations: [...pipes],
  imports: [
    CommonModule
  ],
  exports: [...pipes]
})
export class DRKPipesModule {
}
