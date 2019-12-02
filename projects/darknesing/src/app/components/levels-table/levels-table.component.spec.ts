import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsTableComponent } from './levels-table.component';

describe('LevelsTableComponent', () => {
  let component: LevelsTableComponent;
  let fixture: ComponentFixture<LevelsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
