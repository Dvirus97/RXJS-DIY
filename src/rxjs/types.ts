import { Observable } from "./observable";

export interface Observer<T> {
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}

export type NextFn<T> = (value: T) => void;

export type Dispose = () => void;

export interface UnaryFunction<T, R> {
  (source: T): R;
}

export type OperatorFunction<T, R> = UnaryFunction<Observable<T>, Observable<R>>;
