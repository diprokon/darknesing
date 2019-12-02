import { ObservableProp } from './observable-prop';
import { Subject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

class Test {
  @ObservableProp('cats')
  cats: string;

  @ObservableProp('pigs')
  pigs: string;

  constructor(cat) {
    this.cats = cat;
  }
}

describe('ObservableProp Decorator', () => {
  let obj1: Test;
  let obj2: Test;

  beforeEach(() => {
    obj1 = new Test('black');
    obj2 = new Test('red');
  });

  it('should create observable for a property', () => {
    expect(obj1['cats$']).not.toBeUndefined();
    expect((obj1['cats$'] as Subject<any>).next).not.toBeUndefined();
  });

  it('should have default value', () => {
    expect(obj1.cats).toBe('black');
    expect(obj1.pigs).toBe('pigs');
  });

  it('should emit changes', (done) => {
    expect(obj1.cats).toBe('black');
    (obj1['cats$'] as Subject<any>)
      .pipe(
        skip(1),
        take(1)
      )
      .subscribe((value => {
        expect(value).toBe('white');
        done();
      }));
    obj1.cats = 'white';
  });

  it('should create different observables for each props', () => {
    expect(obj1['cats$'] === obj2['cats$']).toBe(false);
  });
});
