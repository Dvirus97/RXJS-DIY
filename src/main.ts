import { Observable } from "./rxjs/observable";
import { map, tap } from "./rxjs/operator";
import { Subject } from "./rxjs/subject";
import "./style.css";

// of(1, 2, 3)
// const a = new Observable<number>((observer) => {
//   observer.next(1);
//   // observer.error("err");
//   observer.next(2);
//   observer.complete();
// })
//   .pipe(
//     tap({
//       //   next: (x) => console.log("tap", x),
//       error: (err) => console.log("tap", err),
//       //   complete: () => console.log("tap completed"),
//     }),
//     tap((x) => console.log("tap1", x)),
//     map((x) => x * 2),
//     tap({
//       next: (x) => console.log("tap", x),
//       error: (err) => console.log("tap", err),
//       complete() {
//         console.log("tap completed");
//       },
//     })
//   )
//   .subscribe((x) => console.log(x));

// // a.unsubscribe();

const sub = new Subject<number>();
sub.subscribe((x) => console.log("1", x));
sub.subscribe((x) => console.log("2", x));
sub.subscribe((x) => console.log("3", x));
sub.next(1);
sub.next(2);
