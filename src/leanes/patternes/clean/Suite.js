import type { SuiteInterface } from '../interfaces/SuiteInterface';
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
  class Suite extends CoreObject implements SuiteInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _cleanType = 'suite';

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
