import type { TransitionInterface } from './TransitionInterface';
import type { StateInterface } from './StateInterface';


export interface EventInterface {
  transition: TransitionInterface;
  target: StateInterface;

  testGuard(): Promise<?any>;
  testIf(): Promise<?any>;
  testUnless(): Promise<?any>;
  doBefore(): Promise<?any>;
  doAfter(): Promise<?any>;
  doSuccess(): Promise<?any>;
  doError(): Promise<?any>;
}
