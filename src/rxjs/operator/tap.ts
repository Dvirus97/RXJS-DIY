import { Observable } from "../observable";
import { Observer, OperatorFunction, UnaryFunction } from "../types";

export function tap<T>(fn: UnaryFunction<T, void> | Partial<Observer<T>>): OperatorFunction<T, T> {
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
