import type { JoiT } from '../types/JoiT';


export interface TransformStaticInterface {
  +schema: JoiT;

  normalize(serialized: ?any): Promise<?any>;
  serialize(deserialized: ?any): Promise<?any>;
  objectize(): ?any;

  (... args: Array<?any>): object;
}
