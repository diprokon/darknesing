import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameFieldComponent } from './game-field.component';
import { CardComponent, DRKPipesModule } from '@drk/core';

describe('GameFieldComponent', () => {
  let component: GameFieldComponent;
  let fixture: ComponentFixture<GameFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DRKPipesModule],
      declarations: [GameFieldComponent, CardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
