// import type { CollectionInterface } from './CollectionInterface';


export interface CursorInterface<
  Collection, Delegate, Iterable = Delegate[]
> {
  isClosed: boolean;

  setCollection(aoCollection: Collection): CursorInterface;

  setIterable(alArray: Iterable): CursorInterface;

  toArray(): Promise<Delegate[]>;

  next(): Promise<?Delegate>;

  hasNext(): Promise<boolean>;

  close(): Promise<void>;

  count(): Promise<number>;

  forEach(lambda: (Delegate, number) => ?Promise<void>): Promise<void>;

  map<R>(lambda: (Delegate, number) => R | Promise<R>): Promise<R[]>;

  filter(lambda: (Delegate, number) => boolean | Promise<boolean>): Promise<Delegate[]>;

  find(lambda: (Delegate, number) => boolean | Promise<boolean>): Promise<?Delegate>;

  compact(): Promise<Delegate[]>;

  reduce<I>(lambda: (I, Delegate, number) => I | Promise<I>, initialValue: I): Promise<I>;

  first(): Promise<?Delegate>;
}
