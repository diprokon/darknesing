import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableProp } from '../../decorators';
import {colors} from '../models';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  @ObservableProp(colors[0])
  backgroundColor: string;
  backgroundColor$: Observable<string>;

  constructor() {
  }
}
