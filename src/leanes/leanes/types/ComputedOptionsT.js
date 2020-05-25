import type { JoiT } from './JoiT';
import type { TransformStaticInterface } from '../interfaces/TransformStaticInterface';


export type ComputedOptionsT = {
  type: (
    'json' |
    'binary' |
    'boolean' |
    'date' |
    'datetime' |
    'number' |
    'decimal' |
    'float' |
    'integer' |
    'primary_key' |
    'string' |
    'text' |
    'time' |
    'timestamp' |
    'array' |
    'hash'
  ),
  transform?: () => TransformStaticInterface,
  validate?: () => JoiT
}
