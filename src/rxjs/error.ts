export class ObservableError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function throwObservableError(err: any): void {
  // try {
  throw new ObservableError(err);
  // } catch (err) {
  // console.error(err);
  // }
}
