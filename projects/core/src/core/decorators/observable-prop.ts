import { BehaviorSubject } from 'rxjs';

export function ObservableProp(defaultValue = null): any {
  return (target, key) => {
    const accessor = `${key}$`;
    const secretAccessor = `_${key}$`;

    Object.defineProperty(target, accessor, {
      get() {
        if (!this[secretAccessor]) {
          this[secretAccessor] = new BehaviorSubject(defaultValue);
        }
        return this[secretAccessor];
      },
      set() {
        throw new Error('You cannot set this property in the Component if you use @ObservableProp');
      }
    });

    Object.defineProperty(target, key, {
      get() {
        return this[accessor].getValue();
      },
      set(value: any) {
        this[accessor].next(value);
      }
    });
  };
}
