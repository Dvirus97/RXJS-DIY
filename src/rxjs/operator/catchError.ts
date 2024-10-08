import { Observable } from "../observable";
import { OperatorFunction } from "../types";

export function catchError<T>(): OperatorFunction<T, T> {
  return (source) => {
    return new Observable<T>((observer) => {
      try {
        const sub = source.subscribe({
          next(value) {
            observer.next(value);
          },
          error(err) {
            console.log("Error: " + err);
            observer.next(err);
          },
          complete() {
            observer.complete();
          },
        });
        return () => {
          sub.unsubscribe();
        };
      } catch (error: any) {
        return new Observable<T>((observer) => {
          console.log("aaa");
          observer.next(error.message);
        });
      }
    });
  };
}
