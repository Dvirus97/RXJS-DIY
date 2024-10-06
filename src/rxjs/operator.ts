import { Observable } from "./observable";
import { Observer, UnaryFunction } from "./types";

export function map<T, R>(fn: (value: T) => R) {
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

export function tap<T>(fn: UnaryFunction<T, void> | Partial<Observer<T>>) {
  const tapOp = typeof fn == "function" ? { next: fn } : fn;
  return (source: Observable<T>): Observable<T> => {
    return new Observable((observer) => {
      const sub = source.subscribe({
        next(value) {
          tapOp.next?.(value);
          observer.next(value);
        },
        error(err) {
          tapOp.error?.(err);
          observer.error(err);
        },
        complete() {
          tapOp.complete?.();
          observer.complete();
        },
      });
      return () => {
        sub.unsubscribe();
      };
    });
  };
}
