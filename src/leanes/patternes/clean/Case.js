import type { CaseInterface } from '../interfaces/CaseInterface';
import { injectable } from "inversify";


export default (Module) => {

  const {
    Notifier,
    assert,
    initialize, module, meta, method, property, nameBy
  } = Module.NS;

  @initialize
  @injectable()
  @module(Module)
  class Case extends Notifier implements CaseInterface {
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
