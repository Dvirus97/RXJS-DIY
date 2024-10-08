import { Observable } from "../observable";
import { Subscription } from "../subscription";
import { Dispose, Observer, OperatorFunction, UnaryFunction } from "../types";

export function filter<T>(fn: UnaryFunction<T, boolean>): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> => {
    return new Observable<T>((observer: Observer<T>): Dispose => {
      const sub: Subscription = source.subscribe({
        next(value) {
          if (fn(value)) {
            observer.next(value);
          }
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
      return () => {
        sub.unsubscribe();
      };
    });
  };
}
