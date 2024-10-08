import { Observable } from "./observable";

export function of<T>(...values: T[]) {
  return new Observable<T>((observer) => {
    values.forEach((val) => observer.next(val));
    observer.complete();
  });
}

export const EMPTY = new Observable<never>((observer) => {
  observer.complete();
});

export function interval(duration: number): Observable<number> {
  return new Observable((observer) => {
    let counter = 0;
    const timer = setInterval(() => {
      observer.next(counter++);
    }, duration);

    return () => {
      clearInterval(timer);
    };
  });
}

export function timer(delay: number, interval: number = -1): Observable<number> {
  return new Observable<number>((observer) => {
    let count = 0;
    let timerRef: any;
    setTimeout(() => {
      if (interval < 0) {
        observer.next(count);
        observer.complete();
      } else {
        observer.next(count++);
        timerRef = setInterval(() => {
          observer.next(count++);
        }, interval);
      }
    }, delay);

    return () => {
      clearInterval(timerRef);
    };
  });
}
