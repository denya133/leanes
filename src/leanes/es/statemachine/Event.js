/*
Event instances for StateMachine class

Inspiration:

- https://github.com/PureMVC/puremvc-js-util-statemachine
- https://github.com/aasm/aasm
*/
import type { TransitionInterface } from '../interfaces/TransitionInterface';
import type { EventInterface } from '../interfaces/EventInterface';
import type { StateInterface } from '../interfaces/StateInterface';

const splice = [].splice;

export default (Module) => {
  const {
    HookedObject,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class Event extends HookedObject implements EventInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property transition: TransitionInterface = null;

    @property target: StateInterface = null;

    // ipsGuard = PointerT(Event.private({
    @property _guard: ?string = null;

    // ipsIf = PointerT(Event.private({
    @property _if: ?string = null;

    // ipsUnless = PointerT(Event.private({
    @property _unless: ?string = null;

    // ipsBefore = PointerT(Event.private({
    @property _before: ?string = null;

    // ipsAfter = PointerT(Event.private({
    @property _after: ?string = null;

    // ipsSuccess = PointerT(Event.private({
    @property _success: ?string = null;

    // ipsError = PointerT(Event.private({
    @property _error: ?string = null;

    @method async testGuard(...args): Promise<?any> {
      return (await this._doHook(this._guard, args, 'Specified "guard" not found', true));
    }

    @method async testIf(...args): Promise<?any> {
      return (await this._doHook(this._if, args, 'Specified "if" not found', true));
    }

    @method async testUnless(...args): Promise<?any> {
      return (await this._doHook(this._unless, args, 'Specified "unless" not found', false));
    }

    @method async doBefore(...args): Promise<?any> {
      return (await this._doHook(this._before, args, 'Specified "before" not found', args));
    }

    @method async doAfter(...args): Promise<?any> {
      return (await this._doHook(this._after, args, 'Specified "after" not found', args));
    }

    @method async doSuccess(...args): Promise<?any> {
      return (await this._doHook(this._success, args, 'Specified "success" not found', args));
    }

    @method async doError(...args): Promise<?any> {
      return (await this._doHook(this._error, args, 'Specified "error" not found', args));
    }

    constructor(name: string, anchor: object, ...args1) {
      let config, ref;
      ref = args1, [...args1] = ref, [config] = splice.call(args1, -1);
      if (config === undefined) {
        config = {};
      }
      super(... arguments);
      ({
        transition: this.transition,
        target: this.target,
        guard: this._guard,
        if: this._if,
        unless: this._unless,
        before: this._before,
        success: this._success,
        after: this._after,
        error: this._error
      } = config);
    }
  }
}
