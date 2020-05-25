import type { CommandInterface } from '../interfaces/CommandInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';


export default (Module) => {
  const {
    Notifier,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class SimpleCommand extends Notifier implements CommandInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method execute(voNotification: NotificationInterface): void {}

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
