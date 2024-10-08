import { Observable } from "./rxjs/observable";
import { catchError } from "./rxjs/operator/catchError";
import { share } from "./rxjs/operator/share";
import { switchMap } from "./rxjs/operator/switchMap";
import "./style.css";

const a = new Observable<number>((observer) => {
  observer.next(1);
  // observer.next(11);
});

a.pipe(
  switchMap((x) => {
    return new Observable<number>((observer) => {
      // observer.next(x + x);
      // observer.next(x * x);
      observer.error("err");
    });
  }),
  catchError()
).subscribe((x) => console.log(x));
