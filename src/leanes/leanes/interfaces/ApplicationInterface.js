import type { ResourceInterface } from './ResourceInterface';
import type { ContextInterface } from './ContextInterface';


export interface ApplicationInterface {
  isLightweight: boolean;

  start(): void;
  finish(): void;

  migrate(opts: ?{until: ?string}): Promise<void>;

  rollback(opts: ?{steps: ?number, until: ?string}): Promise<void>;

  run<
    T = any, R = any
  >(scriptName: string, data: T): Promise<R>;

  execute<
    T = any, R = Promise<{|result: T, resource: ResourceInterface|}>
  >(resourceName: string, {
    context: ContextInterface,
    reverse: string
  }, action: string): Promise<R>;
}
