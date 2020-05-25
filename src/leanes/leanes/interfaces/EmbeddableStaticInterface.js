import type { CollectionInterface } from './CollectionInterface';
import type { RecordInterface } from './RecordInterface';
import type { EmbedConfigT } from '../types/EmbedConfigT';


export interface EmbeddableStaticInterface {
  embeddings: {[key: string]: EmbedConfigT};

  (aoAttributes: object, aoCollection: CollectionInterface): RecordInterface;
}
