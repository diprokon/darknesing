import { Alive } from './alive';
import { Subject } from 'rxjs';

class Test extends Alive {
}

describe('Alive Class', () => {
  let service: Test;
  beforeEach(() => {
    service = new Test();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should unsubscribe', () => {
    const subject = new Subject();
    const helper = {
      trigger() {
      }
    };
    const triggerSpy = spyOn(helper, 'trigger');

    subject
      .pipe(
        service['whileAlive']()
      )
      .subscribe(() => helper.trigger());

    subject.next(1);
    service.ngOnDestroy();
    subject.next(2);

    expect(triggerSpy.calls.count()).toEqual(1);
  });
});
