import { Observable } from "../observable";
import { OperatorFunction } from "../types";

export function take<T>(num: number): OperatorFunction<T, T> {
  return (source) => {
    return new Observable((observer) => {
      let count = 0;
      const sub = source.subscribe({
        ...observer,
        next(value) {
          if (count == num) {
            observer.complete();
            return;
          }
          count++;
          observer.next(value);
        },
      });
      return () => sub.unsubscribe();
    });
  };
}

export function takeUntil<T>(destroy: Observable<unknown>): OperatorFunction<T, T> {
  return (source) => {
    return new Observable<T>((observer) => {
      const destroySub = destroy.subscribe((_) => {
        observer.complete();
      });
      const sub = source.subscribe(observer);

      return () => {
        sub.unsubscribe();
        destroySub.unsubscribe();
      };
    });
  };
}
