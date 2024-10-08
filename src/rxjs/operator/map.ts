import { Observable } from "../observable";
import { OperatorFunction } from "../types";

export function map<T, R>(fn: (value: T) => R): OperatorFunction<T, R> {
  return (source: Observable<T>): Observable<R> => {
    return new Observable<R>((observer) => {
      const subscription = source.subscribe({
        next(value) {
          observer.next(fn(value));
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
      return () => {
        subscription.unsubscribe();
      };
    });
  };
}
