import type { StateInterface } from './StateInterface';
import type { TransitionInterface } from './TransitionInterface';


export interface StateMachineInterface {
  currentState: ?StateInterface;
  initialState: ?StateInterface;

  states: {[key: string]: StateInterface};

  doBeforeReset(): Promise<?any>;
  doAfterReset(): Promise<?any>;
  doBeforeAllEvents(): Promise<?any>;
  doAfterAllEvents(): Promise<?any>;
  doAfterAllTransitions(): Promise<?any>;
  doErrorOnAllEvents(): Promise<?any>;
  doWithAnchorUpdateState(): Promise<?any>;
  doWithAnchorRestoreState(): Promise<?any>;
  doWithAnchorSave(): Promise<?any>;

  registerState(name: string, config: ?object): StateInterface;
  removeState(name: string): boolean;
  registerEvent(asEvent: string, alDepartures: string | string[], asTarget: string, ahEventConfig: ?object, ahTransitionConfig: ?object): void;
  reset(): Promise<void>;
  send(asEvent: string): Promise<void>;
  transitionTo(nextState: StateInterface, transition: TransitionInterface): Promise<void>;

  beforeAllEvents(asMethod: string): void;
  afterAllTransitions(asMethod: string): void;
  afterAllEvents(asMethod: string): void;
  errorOnAllEvents(asMethod: string): void;
  withAnchorUpdateState(asMethod: string): void;
  withAnchorSave(asMethod: string): void;
  withAnchorRestoreState(asMethod: string): void;
  state(asState: string, ahConfig: ?object): void;
  event(asEvent: string, ahConfig: object | Function, amTransitionInitializer: ?Function): void;
  transition(previousStates: string[], nextState: string, ahConfig: ?object): void;
}
