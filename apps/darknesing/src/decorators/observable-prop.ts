import { BehaviorSubject } from 'rxjs';

export function ObservableProp(defaultValue = null): any {
  return function(target, key) {
    const accessor = `${key}$`;
    const secretAccessor = `_${key}$`;

    Object.defineProperty(target, accessor, {
      get: function() {
        if (!this[secretAccessor]) {
          this[secretAccessor] = new BehaviorSubject(defaultValue);
        }
        return this[secretAccessor];
      },
      set: function() {
        throw new Error('You cannot set this property in the Component if you use @ObservableProp');
      }
    });

    Object.defineProperty(target, key, {
      get: function() {
        return this[accessor].getValue();
      },
      set: function(value: any) {
        this[accessor].next(value);
      }
    });
  };
}
