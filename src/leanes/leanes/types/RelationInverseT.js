import type { RecordStaticInterface } from '../interfaces/RecordStaticInterface';

export type RelationInverseT = {|
  recordClass: RecordStaticInterface,
  attrName: string,
  relation: string
|}
