import type { AdapterInterface } from '../interfaces/AdapterInterface';
// import { injectable, inject} from "inversify";


export default (Module) => {

  const {
    CoreObject,
    assert,
    initialize, module, meta, method, property, nameBy
  } = Module.NS;

  // @injectable
  @initialize
  @module(Module)
  class Adapter extends CoreObject implements AdapterInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _cleanType = 'adapter';

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
