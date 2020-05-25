

export interface MigrationInterface<
  REVERSE_MAP, SUPPORTED_TYPES, UP, DOWN
> {
  +steps: Array<{|args: Array, method: $Keys<typeof REVERSE_MAP> | 'reversible'|}>;

  createCollection(
    name: string,
    options: ?object
  ): Promise<void>;

  createEdgeCollection(
    collection_1: string,
    collection_2: string,
    options: ?object
  ): Promise<void>;

  addField(
    collection_name: string,
    field_name: string,
    options: $Values<SUPPORTED_TYPES> | {
      type: $Values<SUPPORTED_TYPES>, 'default': any
    }
  ): Promise<void>;

  addIndex(
    collection_name: string,
    field_names: string[],
    options: {
      type: 'hash' | 'skiplist' | 'persistent' | 'geo' | 'fulltext',
      unique: ?boolean,
      sparse: ?boolean
    }
  ): Promise<void>;

  addTimestamps(
    collection_name: string,
    options: ?object
  ): Promise<void>;

  changeCollection(
    name: string,
    options: object
  ): Promise<void>;

  changeField(
    collection_name: string,
    field_name: string,
    options: $Values<SUPPORTED_TYPES> | {
      type: $Values<SUPPORTED_TYPES>
    }
  ): Promise<void>;

  renameField(
    collection_name: string,
    field_name: string,
    new_field_name: string
  ): Promise<void>;

  renameIndex(
    collection_name: string,
    old_name: string,
    new_name: string
  ): Promise<void>;

  renameCollection(
    collection_name: string,
    new_name: string
  ): Promise<void>;

  dropCollection(
    collection_name: string
  ): Promise<void>;

  dropEdgeCollection(
    collection_1: string,
    collection_2: string
  ): Promise<void>;

  removeField(
    collection_name: string,
    field_name: string
  ): Promise<void>;

  removeIndex(
    collection_name: string,
    field_names: string[],
    options: {
      type: 'hash' | 'skiplist' | 'persistent' | 'geo' | 'fulltext',
      unique: ?boolean,
      sparse: ?boolean
    }
  ): Promise<void>;

  removeTimestamps(
    collection_name: string,
    options: ?object
  ): Promise<void>;

  execute(lambda: Function): Promise<void>;

  migrate(direction: UP | DOWN): Promise<void>;

  up(): Promise<void>;

  down(): Promise<void>;
}
