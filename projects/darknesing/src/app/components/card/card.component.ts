import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CellValue } from '../../models';

const animationFunction = 'cubic-bezier(0.23, 1, 0.32, 1)';

@Component({
  selector: 'drk-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('state', [
      state('up', style({
        transform: 'rotateX(0)'
      })),
      state('down', style({
        transform: 'rotateX(-180deg)'
      })),
      state('score', style({
        opacity: 0
      })),
      state('empty', style({
        opacity: 0
      })),
      transition('down => up', [
        animate(`1s ${animationFunction}`, style({
          transform: 'rotateX(-360deg)'
        }))
      ]),
      transition('up => down', [
        animate(`0.5s ${animationFunction}`)
      ]),
      transition('* => score', [
        animate(`0.5s ${animationFunction}`)
      ])
    ]),
    trigger('score', [
      state('score', style({
        opacity: 1
      })),
      state('empty', style({
        opacity: 0
      })),
      transition('* => score', [
        animate(`1.5s ${animationFunction}`)
      ])
    ])
  ]
})
export class CardComponent {
  @Input()
  value: CellValue;

  get stateName(): string {
    const cellState = this.value && this.value.state;
    switch (cellState) {
      case 0:
        return 'score';
      case 1:
        return 'up';
      case -1:
        return 'down';
      default:
        return 'empty';
    }
  }
}
