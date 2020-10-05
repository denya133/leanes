import type { CaseInterface } from '../interfaces/CaseInterface';
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
  class Case extends CoreObject implements CaseInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _cleanType = 'case';

    @method execute(): any {}

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
