import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LevelsTableComponent } from './levels-table.component';

describe('LevelsTableComponent', () => {
  let component: LevelsTableComponent;
  let fixture: ComponentFixture<LevelsTableComponent>;

  beforeEach(waitForAsync(() => {
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
