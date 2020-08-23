import { Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'drk-until-destroyed',
  template: '',
})
// tslint:disable-next-line:component-class-suffix
export abstract class UntilDestroyed implements OnDestroy {
  protected destroyed = new Subject<void>();

  protected untilDestroyed<T>() {
    return takeUntil<T>(this.destroyed);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
