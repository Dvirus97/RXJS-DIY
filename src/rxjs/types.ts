export interface Observer<T> {
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}

export interface UnaryFunction<T, R> {
  (source: T): R;
}

export type NextFn<T> = (value: T) => void;

export type Dispose = () => void;
