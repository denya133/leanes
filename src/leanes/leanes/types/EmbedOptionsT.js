

export type EmbedOptionsT = {
  refKey?: string,
  attr?: string,
  inverse?: string,
  inverseType?: string,
  through?: [string, {|by: string|}],
  putOnly?: boolean,
  loadOnly?: boolean,
  recordName?: (recordType: ?string) => string,
  collectionName?: (recordType: ?string) => string
}
