import type { TransformStaticInterface } from './TransformStaticInterface';


export interface SerializerInterface<D> {
  normalize(acRecord: TransformStaticInterface, ahPayload: ?any): Promise<D>;

  serialize(aoRecord: ?D, options: ?object): Promise<?any>;
}
