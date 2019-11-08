import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
      transition('down => up', [
        animate('1s cubic-bezier(0.23, 1, 0.32, 1)', style({
          transform: 'rotateX(-360deg)'
        }))
      ]),
      transition('up => down', [
        animate('0.5s cubic-bezier(0.23, 1, 0.32, 1)')
      ])
    ])
  ]
})
export class CardComponent {
  @Input()
  state = -1;

  get stateName() {
    return this.state === 1 ? 'up' : 'down';
  }
}
