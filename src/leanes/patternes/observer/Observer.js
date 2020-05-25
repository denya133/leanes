import type { ObserverInterface } from '../interfaces/ObserverInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class Observer extends CoreObject implements ObserverInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipoNotify = PointerT(Observer.private({
    @property _notify: ?Function = null;

    // ipoContext = PointerT(Observer.private({
    @property _context: ?any = null;

    @method setNotifyMethod(amNotifyMethod: Function): void {
      this._notify = amNotifyMethod;
    }

    @method setNotifyContext(aoNotifyContext: any): void {
      this._context = aoNotifyContext;
    }

    @method getNotifyMethod(): ?Function {
      return this._notify;
    }

    @method getNotifyContext(): ?any {
      return this._context;
    }

    @method compareNotifyContext(object: any): boolean {
      return object === this._context;
    }

    @method notifyObserver(notification: NotificationInterface): void {
      this.getNotifyMethod().call(this.getNotifyContext(), notification);
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(amNotifyMethod: ?Function, aoNotifyContext: ?any) {
      super(... arguments);
      if (amNotifyMethod) {
        this.setNotifyMethod(amNotifyMethod);
      }
      if (aoNotifyContext) {
        this.setNotifyContext(aoNotifyContext);
      }
    }
  }
}
