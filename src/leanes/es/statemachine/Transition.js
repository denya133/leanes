/*
Transition instances for StateMachine class

Inspiration:

- https://github.com/PureMVC/puremvc-js-util-statemachine
- https://github.com/aasm/aasm
*/

import type { TransitionInterface } from '../interfaces/TransitionInterface';

const splice = [].splice;

export default (Module) => {
  const {
    HookedObject,
    initialize, module, meta, property, method, nameBy,
  } = Module.NS;


  @initialize
  @module(Module)
  class Transition extends HookedObject implements TransitionInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipsGuard = PointerT(Transition.private({
    @property _guard: ?string = null;

    // ipsIf = PointerT(Transition.private({
    @property _if: ?string = null;

    // ipsUnless = PointerT(Transition.private({
    @property _unless: ?string = null;

    // ipsAfter = PointerT(Transition.private({
    @property _after: ?string = null;

    // ipsSuccess = PointerT(Transition.private({
    @property _success: ?string = null;

    @method async testGuard(...args): Promise<?any> {
      return (await this._doHook(this._guard, args, 'Specified "guard" not found', true));
    }

    @method async testIf(...args): Promise<?any> {
      return (await this._doHook(this._if, args, 'Specified "if" not found', true));
    }

    @method async testUnless(...args): Promise<?any> {
      return (await this._doHook(this._unless, args, 'Specified "unless" not found', false));
    }

    @method async doAfter(...args): Promise<?any> {
      return (await this._doHook(this._after, args, 'Specified "after" not found', args));
    }

    @method async doSuccess(...args): Promise<?any> {
      return (await this._doHook(this._success, args, 'Specified "success" not found', args));
    }

    // FuncG([String, Object, MaybeG(Object)], NilT)
    constructor(name: string, anchor: object, ...args1) {
      let config, ref;
      ref = args1, [...args1] = ref, [config] = splice.call(args1, -1);
      if (config === void 0) {
        config = {};
      }
      super(... arguments);
      ({
        guard: this._guard,
        if: this._if,
        unless: this._unless,
        after: this._after,
        success: this._success
      } = config);
    }
  }
}
