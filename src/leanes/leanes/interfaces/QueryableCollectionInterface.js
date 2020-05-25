import type { QueryInterface } from './QueryInterface';
import type { CursorInterface } from './CursorInterface';
// import type { CollectionInterface } from './CollectionInterface';
// import type { RecordInterface } from './RecordInterface';


export interface QueryableCollectionInterface<
  C, D
> {
  findBy(query: object, options: ?object): Promise<CursorInterface<C, D>>;

  takeBy(query: object, options: ?object): Promise<CursorInterface<C, D>>;

  deleteBy(query: object): Promise<void>;

  destroyBy(query: object): Promise<void>;

  removeBy(query: object): Promise<void>;

  updateBy(query: object, properties: object): Promise<void>;

  patchBy(query: object, properties: object): Promise<void>;

  exists(query: object): Promise<boolean>;

  query(aoQuery: object | QueryInterface): Promise<QueryInterface>;

  parseQuery(aoQuery: object | QueryInterface): Promise<object | string | QueryInterface>;

  executeQuery(query: object | string | QueryInterface): Promise<CursorInterface<?C, *>>;
}
