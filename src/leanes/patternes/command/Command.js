import type { CommandInterface } from '../interfaces/CommandInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import { injectable } from "inversify";


export default (Module) => {

  const {
    Notifier, CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @injectable()
  @module(Module)
  class Command extends Notifier implements CommandInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _subCommands: Array<Class<CoreObject>> = null;

    @method execute(aoNotification: NotificationInterface): void {
      const vlSubCommands = [... this._subCommands];
      for (const vCommand of vlSubCommands) {
        if (!this.facade.container.isBoundNamed(vCommand.name)) {
          this.facade.container.bind(vCommand.name).to(vCommand);
        }
        const voCommand: CommandInterface = this.facade.container.get(vCommand.name);
        // const voCommand = vCommand.new();
        voCommand.initializeNotifier(this._multitonKey);
        voCommand.execute(aoNotification);
      }
    }

    @method initializeSubCommands(): void { return; }

    @method addSubCommand(aClass: Class<CoreObject>): void {
      this._subCommands.push(aClass);
      return;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor() {
      super(... arguments);
      this._subCommands = [];
      this.initializeSubCommands();
    }
  }
}
