import { Observable } from "./observable";

export function of<T>(...values: T[]) {
  return new Observable<T>((observer) => {
    values.forEach((val) => observer.next(val));
    observer.complete();
  });
}
