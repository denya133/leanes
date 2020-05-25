

export interface IterableInterface<Delegate> {
  forEach(lambda: (Delegate, number) => Promise<void>): Promise<void>;

  filter(lambda: (Delegate, number) => Promise<boolean>): Promise<Delegate[]>;

  map<R>(lambda: (Delegate, number) => Promise<R>): Promise<R[]>;

  reduce<I>(lambda: (I, Delegate, number) => Promise<I>, initialValue: I): Promise<I>;
}
