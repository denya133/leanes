import type { CollectionInterface } from './CollectionInterface';
import type { RecordInterface } from './RecordInterface';
import type { JoiT } from '../types/JoiT';


export interface RecordStaticInterface<
  C = CollectionInterface, R = RecordInterface
> {
  +schema: JoiT;

  normalize(ahPayload: ?object, aoCollection: C): Promise<R>;

  serialize(aoRecord: ?R): Promise<?object>;

  recoverize(ahPayload: ?object, aoCollection: C): Promise<?R>;

  objectize(aoRecord: ?R): ?object;

  makeSnapshot(aoRecord: ?R): ?object;

  parseRecordName(asName: string): [string, string];
  findRecordByName(asName: string): RecordStaticInterface;

  parentClassNames(AbstractClass: ?RecordStaticInterface): string[];

  +attributes: {[key: string]: AttributeConfigT};
  +computeds: {[key: string]: ComputedConfigT};

  new(aoAttributes: object, aoCollection: C): R;
  (aoAttributes: object, aoCollection: C): R;
}
