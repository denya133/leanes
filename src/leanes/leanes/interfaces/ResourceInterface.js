import type { ContextInterface } from './ContextInterface';
import type { ResourceListResultT } from '../types/ResourceListResultT';


export interface ResourceInterface {
  list(): Promise<ResourceListResultT>;

  detail(): Promise<object>;

  create(): Promise<object>;

  update(): Promise<object>;

  'delete'(): Promise<void>;

  destroy(): Promise<void>;

  doAction(asAction: string, context: ContextInterface): Promise<?any>;

  writeTransaction(asAction: string, aoContext: ContextInterface): Promise<boolean>;

  saveDelayeds(): Promise<void>;
}
