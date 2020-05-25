import type { FacadeInterface } from '../../patternes';


export interface DelayableInterface {
  delay(
    facade: FacadeInterface,
    opts: ?{queue: ?string, delayUntil: ?number}
  ): object;
}
