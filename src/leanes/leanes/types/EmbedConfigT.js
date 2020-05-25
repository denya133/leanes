import type { JoiT } from './JoiT';


export type EmbedConfigT = {|
  refKey: string,
  attr: ?string,
  inverse: string,
  inverseType: ?string,
  embedding: ('relatedEmbed' | 'relatedEmbeds' | 'hasEmbed' | 'hasEmbeds'),
  through: ?[string, {|by: string|}],
  putOnly: boolean,
  loadOnly: boolean,
  recordName: (recordType: ?string) => string,
  collectionName: (recordType: ?string) => string,
  validate: () => JoiT,
  load: () => Promise<?any>,
  put: () => Promise<void>,
  restore: () => Promise<?any>,
  replicate: () => object | object[]
|}
