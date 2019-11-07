import { OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

export abstract class Alive implements OnDestroy {
  private alive = true;

  protected whileAlive<T>() {
    return takeWhile<T>(() => this.alive);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
