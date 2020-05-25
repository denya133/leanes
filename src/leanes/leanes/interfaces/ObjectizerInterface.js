// import type { RecordInterface } from './RecordInterface';


export interface ObjectizerInterface<R, D> {
  recoverize(
    acRecord: R,
    ahPayload: ?object
  ): Promise<?D>;

  objectize(aoRecord: D, options: ?object): Promise<?object>;
}
