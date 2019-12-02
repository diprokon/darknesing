import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './components/game/game.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CardComponent } from './components/card/card.component';
import { FromToPipe } from './pipes/from-to.pipe';
import { LevelsTableComponent } from './components/levels-table/levels-table.component';

@NgModule({
  declarations: [AppComponent, FromToPipe, GameComponent, LayoutComponent, CardComponent, LevelsTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
