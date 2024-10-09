import { of } from "./rxjs/creationalOps";
import { Observable } from "./rxjs/observable";
import { catchError } from "./rxjs/operator/catchError";
import { map } from "./rxjs/operator/map";
import { switchMap } from "./rxjs/operator/switchMap";
import { throwError } from "./rxjs/operator/throwError";
import "./style.css";

const a = new Observable<number>((observer) => {
  observer.next(1);
  // observer.next(11);
  observer.complete();
});

a.pipe(
  switchMap((x) => {
    return new Observable<number>((observer) => {
      observer.next(x + x);
      // observer.next(x * x);
      // observer.error("err");
      observer.complete();
    });
  }),
  map((x) => {
    return x + 1;
  }),
  // filter((x) => {
  //   return x < 3;
  // }),
  throwError((val) => {
    return "aaa " + val;
  }),
  catchError((err) => {
    return of(err);
  })
).subscribe({
  next: (x) => console.log(x),
  error(err) {
    console.log(err);
  },
});
