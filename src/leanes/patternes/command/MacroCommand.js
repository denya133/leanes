import type { CommandInterface } from '../interfaces/CommandInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';

export default (Module) => {
  const {
    Notifier, CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class MacroCommand extends Notifier implements CommandInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // iplSubCommands = MacroCommand.private({
    @property _subCommands: Array<Class<CoreObject>> = null;

    @method execute(aoNotification: NotificationInterface): void {
      const vlSubCommands = [... this._subCommands];
      for (const vCommand of vlSubCommands) {
        const voCommand = vCommand.new();
        voCommand.initializeNotifier(this._multitonKey);
        voCommand.execute(aoNotification);
      }
    }

    @method initializeMacroCommand(): void { return; }

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
      this.initializeMacroCommand();
    }
  }
}
