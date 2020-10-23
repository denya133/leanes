import type { SuiteInterface } from '../interfaces/SuiteInterface';
import { injectable } from "inversify";


export default (Module) => {

  const {
    Notifier,
    assert,
    initialize, partOf, meta, method, property, nameBy
  } = Module.NS;

  @initialize
  @injectable()
  @partOf(Module)
  class Suite extends Notifier implements SuiteInterface {
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
