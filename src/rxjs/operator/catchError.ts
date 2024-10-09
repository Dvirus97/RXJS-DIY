import { Observable } from "../observable";
import { Subscription } from "../subscription";
import { Dispose, OperatorFunction } from "../types";

export function catchError<T, R>(fn: (err: any) => Observable<R>): OperatorFunction<T, R> {
  return (source) => {
    return new Observable<R>((observer): Dispose => {
      let sub: Subscription;
      let inner: Subscription;
      try {
        sub = source.subscribe({
          next(value: any) {
            observer.next(value);
          },
          error(err) {
            observer.next(err);
          },
          complete() {
            observer.complete();
          },
        });
      } catch (error: any) {
        inner = fn(error).subscribe({
          next(value: any) {
            observer.next(value.message);
          },
          error(err) {
            observer.next(err.message);
          },
          complete() {
            observer.complete();
          },
        });
      } finally {
        return () => {
          inner?.unsubscribe();
          sub?.unsubscribe();
        };
      }
    });
  };
}
