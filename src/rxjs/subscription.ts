import { Dispose } from "../rxjs/types";

export class Subscription {
  private disposers: Dispose[] = [];

  add(...dispose: Dispose[]) {
    this.disposers.push(...dispose);
  }

  unsubscribe() {
    this.disposers.forEach((x) => x());
    this.disposers = [];
  }
}
