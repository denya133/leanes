

export type RelationConfigT = {|
  refKey: string,
  attr: ?string,
  inverse: string,
  inverseType: ?string,
  relation: ('relatedTo' | 'belongsTo' | 'hasMany' | 'hasOne'),
  recordName: (recordType: ?string) => string,
  collectionName: (recordType: ?string) => string,
  through: ?[string, {|by: string|}]
|}
