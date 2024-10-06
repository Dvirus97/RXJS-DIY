import { Subscription } from "./subscription";
import { Observer } from "../rxjs/types";

export class Subscriber<T> implements Observer<T> {
  public _closed = false;
  constructor(private observer: Observer<T>, private subscription: Subscription) {
    this.subscription.add(() => (this._closed = true));
  }
  next = (value: T): void => {
    if (!this._closed) {
      this.observer.next(value);
    }
  };
  error = (err: any): void => {
    if (!this._closed) {
      this._closed = true;
      this.observer.error(err);
      setTimeout(() => {
        this.subscription.unsubscribe();
      }, 0);
    }
  };
  complete = (): void => {
    if (!this._closed) {
      this._closed = true;
      this.observer.complete();
      setTimeout(() => {
        this.subscription.unsubscribe();
      }, 0);
    }
  };
}
