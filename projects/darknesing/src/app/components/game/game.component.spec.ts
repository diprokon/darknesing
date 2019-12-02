import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { FromToPipe } from '../../pipes/from-to.pipe';
import { CardComponent } from '../card/card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreComponent } from '../score/score.component';
import { LevelsTableComponent } from '../levels-table/levels-table.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [GameComponent, FromToPipe, CardComponent, ScoreComponent, LevelsTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
