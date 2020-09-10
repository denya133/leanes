import type { EventInterface } from './EventInterface';
import type { TransitionInterface } from './TransitionInterface';


export interface StateInterface {
  initial: boolean;

  getEvents(): {[string]: ?EventInterface};
  getEvent(asEvent: string): ?EventInterface;
  defineTransition(asEvent: string, aoTarget: StateInterface, aoTransition: TransitionInterface, config: ?object): EventInterface;
  removeTransition(asEvent: string): void;
  doBeforeEnter(): Promise<?any>;
  doEnter(): Promise<?any>;
  doAfterEnter(): Promise<?any>;
  doBeforeExit(): Promise<?any>;
  doExit(): Promise<?any>;
  doAfterExit(): Promise<?any>;
  send(asEvent: string): Promise<void>;
}
