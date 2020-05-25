

export interface SerializableInterface<T> {
  normalize(ahData: any): Promise<T>;
  serialize(aoRecord: T, ahOptions: ?object): Promise<any>;
}
