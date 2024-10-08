import { Observable } from "../observable";
import { Subscription } from "../subscription";
import { OperatorFunction } from "../types";

export function switchMap<T, R>(fn: (value: T) => Observable<R>): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    return new Observable<R>((observer) => {
      let inner: Subscription;
      const sub: Subscription = source.subscribe({
        next(value: T) {
          inner = fn(value).subscribe({
            // ...observer,
            // complete: () => {},
            next(value) {
              //   console.log("next", value);
              observer.next(value);
            },
            // error(err) {
            //   observer.error(err);
            // },
            // // complete: () => {
            // //   console.log("comp1");
            // //   observer.complete();
            // // },
          });
          //   s.unsubscribe();
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
          inner.unsubscribe();
        },
      });
      return () => {
        sub.unsubscribe();
      };
    });
  };
}
