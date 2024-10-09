import { Observable } from "../observable";
import { OperatorFunction } from "../types";

export function throwError<T, R>(fn: (value: T) => R): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    return new Observable<R>((observer) => {
      const sub = source.subscribe({
        next(val) {
          observer.error(fn(val));
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
