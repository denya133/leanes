/*
State instances for StateMachine class

Inspiration:

- https://github.com/PureMVC/puremvc-js-util-statemachine
- https://github.com/aasm/aasm
*/

export type { TransitionInterface } from '../interfaces/TransitionInterface';
export type { EventInterface } from '../interfaces/EventInterface';
export type { StateInterface } from '../interfaces/StateInterface';
export type { StateMachineInterface } from '../interfaces/StateMachineInterface';

const splice = [].splice;

export default (Module) => {
  const {
    HookedObject,
    initialize, module, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @module(Module)
  class State extends HookedObject implements StateInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipoStateMachine = PointerT(State.private({
    @property _stateMachine: ?StateMachineInterface = null;

    // iphEvents = PointerT(State.private({
    @property _events: {[key: string]: ?EventInterface} = null;

    // ipsBeforeEnter = PointerT(State.private({
    @property _beforeEnter: ?string = null;

    // ipsEnter = PointerT(State.private({
    @property _enter: ?string = null;

    // ipsAfterEnter = PointerT(State.private({
    @property _afterEnter: ?string = null;

    // ipsBeforeExit = PointerT(State.private({
    @property _beforeExit: ?string = null;

    // ipsExit = PointerT(State.private({
    @property _exit: ?string = null;

    // ipsAfterExit = PointerT(State.private({
    @property _afterExit: ?string = null;

    @property initial: boolean = false;

    @method getEvents(): {[key: string]: ?EventInterface} {
      return this._events;
    }

    @method getEvent(asEvent: string): ?EventInterface {
      return this._events[asEvent];
    }

    @method defineTransition(asEvent: string, aoTarget: StateInterface, aoTransition: TransitionInterface, config: ?object = {}): EventInterface {
      if (this._events[asEvent] == null) {
        const vpoAnchor = this._anchor;
        const vhEventConfig = _.assign({}, config, {
          target: aoTarget,
          transition: aoTransition
        });
        const vsEventName = `${this.name}_${asEvent}`;
        this._events[asEvent] = this.Module.NS.Event.new(vsEventName, vpoAnchor, vhEventConfig);
      }
      return this._events[asEvent];
    }

    @method removeTransition(asEvent: string) {
      if (this._events[asEvent] != null) {
        delete this._events[asEvent];
      }
    }

    @method async doBeforeEnter(...args): Promise<?any> {
      return (await this._doHook(this._beforeEnter, args, 'Specified "beforeEnter" not found', args));
    }

    @method async doEnter(...args): Promise<?any> {
      return (await this._doHook(this._enter, args, 'Specified "enter" not found', args));
    }

    @method async doAfterEnter(...args): Promise<?any> {
      return (await this._doHook(this._afterEnter, args, 'Specified "afterEnter" not found', args));
    }

    @method async doBeforeExit(...args): Promise<?any> {
      return (await this._doHook(this._beforeExit, args, 'Specified "beforeExit" not found', args));
    }

    @method async doExit(...args): Promise<?any> {
      return (await this._doHook(this._exit, args, 'Specified "exit" not found', args));
    }

    @method async doAfterExit(...args): Promise<?any> {
      return (await this._doHook(this._afterExit, args, 'Specified "afterExit" not found', args));
    }

    @method async send(asEvent: string, ...args): Promise<void> {
      const oldState = this;
      const event = oldState._events[asEvent];
      if (event != null) {
        try {
          await event.doBefore(...args);
          const eventGuard = (await event.testGuard(...args));
          const eventIf = (await event.testIf(...args));
          const eventUnless = (await event.testUnless(...args));
          if (eventGuard && eventIf && !eventUnless) {
            const { transition } = event;
            const transitionGuard = (await transition.testGuard(...args));
            const transitionIf = (await transition.testIf(...args));
            const transitionUnless = (await transition.testUnless(...args));
            if (transitionGuard && transitionIf && !transitionUnless) {
              await oldState.doBeforeExit(...args);
              await oldState.doExit(...args);
              const stateMachine = oldState._stateMachine;
              await stateMachine.transitionTo(event.target, transition, ...args);
            }
            await event.doSuccess(...args);
          }
          await event.doAfter(...args);
        } catch (error) {
          await event.doError(error);
          throw error;
        }
      }
    }

    constructor(name: string, anchor: object, aoStateMachine: StateMachineInterface, ...args1) {
      let config, ref;
      ref = args1, [...args1] = ref, [config] = splice.call(args1, -1);
      if (config === undefined) {
        config = {};
      }
      super(... arguments);
      this._events = {};
      this._stateMachine = aoStateMachine;
      ({
        beforeEnter: this._beforeEnter,
        enter: this._enter,
        afterEnter: this._afterEnter,
        beforeExit: this._beforeExit,
        exit: this._exit,
        afterExit: this._afterExit
      } = config);
      this.initial = config.initial === true;
    }
  }
}
