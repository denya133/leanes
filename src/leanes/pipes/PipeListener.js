import type { PipeFittingInterface } from './interfaces/PipeFittingInterface';
import type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class PipeListener extends CoreObject implements PipeFittingInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipoContext = PointerT(PipeListener.private({
    @property _context: object;

    // ipmListener = PointerT(PipeListener.private({
    @property _listener: <T = ?any>() => T = null;

    @method connect(pipe: PipeFittingInterface): boolean {
      return false;
    }

    @method disconnect(): ?PipeFittingInterface {
      return null;
    }

    @method write(aoMessage: PipeMessageInterface): boolean {
      this._listener.call(this._context, aoMessage);
      return true;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(aoContext: object, amListener: Function) {
      super(... arguments);
      this._context = aoContext;
      this._listener = amListener;
    }
  }
}
