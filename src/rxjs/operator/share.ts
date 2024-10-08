import { BehaviorSubject } from "../subject";
import { OperatorFunction } from "../types";

export function share<T>(): OperatorFunction<T, T> {
  return (source) => {
    const subject = new BehaviorSubject<T | undefined>(undefined);
    // return new Observable<T>((observer) => {
    source.subscribe({
      next(value) {
        subject.next(value);
      },
      error(err) {
        setTimeout(() => {
          subject.error(err);
        }, 0);
      },
      complete() {
        setTimeout(() => {
          subject.complete();
        }, 0);
      },
    });
    return subject;
  };
}
