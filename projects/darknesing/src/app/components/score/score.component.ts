import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'drk-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input()
  score: number;

  constructor() { }

  ngOnInit() {
  }

}
