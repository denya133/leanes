

export type RelationOptionsT = {
  refKey?: string,
  attr?: string,
  inverse?: string,
  inverseType?: string,
  recordName?: (recordType: ?string) => string,
  collectionName?: (recordType: ?string) => string,
  through?: [string, {|by: string|}]
}
