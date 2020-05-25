import type { CollectionInterface } from './CollectionInterface';
import type { RecordInterface } from './RecordInterface';
import type { RelationInverseT } from '../types/RelationInverseT';
import type { RelationConfigT } from '../types/RelationConfigT';

export interface RelatableStaticInterface {
  inverseFor(asAttrName: string): RelationInverseT;
  relations: {[key: string]: RelationConfigT};

  (aoAttributes: object, aoCollection: CollectionInterface): RecordInterface;
}
