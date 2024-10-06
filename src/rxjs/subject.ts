import { throwObservableError } from "./error";
import { Observable } from "./observable";
import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";
import { NextFn, Observer } from "./types";

export class Subject<T> extends Observable<T> {
  observers: Observer<T>[] = [];

  constructor() {
    // super(observerFn);
    super();
  }
  override subscribe(observer: Partial<Observer<T>> | NextFn<T>): Subscription {
    const subscription = new Subscription();
    let obs: Observer<T>;
    if (typeof observer == "function") {
      obs = {
        next: observer,
        error: throwObservableError,
        complete: () => {},
      };
    } else {
      obs = {
        next: observer.next ?? (() => {}),
        error: observer.error ?? throwObservableError,
        complete: observer.complete ?? (() => {}),
      };
    }
    const subscriber = new Subscriber<T>(obs, subscription);
    this.observers.push(subscriber);
    const res = this.observerFn?.(subscriber);
    res && subscription.add(res);
    return subscription;
  }

  next(value: T) {
    this.observers.forEach((x) => x.next(value));
  }
  error(err: any) {
    this.observers.forEach((x) => x.error(err));
  }
  complete() {
    this.observers.forEach((x) => x.complete());
  }
}
