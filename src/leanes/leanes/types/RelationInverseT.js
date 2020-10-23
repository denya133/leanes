import type { RecordStaticInterface } from '../interfaces/RecordStaticInterface';

export type RelationInverseT = {|
  recordClass: $Rest<RecordStaticInterface>,
  attrName: string,
  relation: string
|}
