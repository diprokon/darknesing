import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'util';

/**
 * return array of numbers
 *
 * Exp:
 * 3 => [0, 1, 2]
 * [2, 5] => [2, 3, 4, 5]
 */

@Pipe({
  name: 'fromTo'
})
export class FromToPipe implements PipeTransform {

  transform(value: number | [number, number]): number[] {
    const result = [];
    let from = 0;
    let to = value;

    if (isArray(value)) {
      from = value[0];
      to = value[1] + 1;
    }
    for (let i = from; i < to; i++) {
      result.push(i);
    }

    return result;
  }
}
