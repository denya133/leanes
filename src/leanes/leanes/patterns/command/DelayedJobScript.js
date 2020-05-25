import type { RecoverableStaticInterface } from '../../../es';


export default (Module) => {
  const {
    Proto,
    Script,
    assert,
    initialize, module, meta, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class DelayedJobScript extends Script {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method async body(aoData: {moduleName: string, replica: object, methodName: string, args: Array}): void {
      let replicated;
      const { moduleName, replica, methodName, args } = aoData;
      replica.multitonKey = this._multitonKey;
      const ApplicationModule = this.ApplicationModule;

      assert(moduleName === ApplicationModule.name, `Job was defined with moduleName = \`${moduleName}\`, but its Module = \`${ApplicationModule.name}\``);

      switch (replica.type) {
        case 'class':
          replicated = await Proto.restoreObject(ApplicationModule, replica);
          await replicated[methodName](...args);
          break;
        case 'instance':
          const vcInstanceClass = ApplicationModule.NS[replica.class];
          (vcInstanceClass: RecoverableStaticInterface<Module, vcInstanceClass>);
          replicated = await vcInstanceClass.restoreObject(ApplicationModule, replica);
          await replicated[methodName](...args);
          break;
        default:
          throw new Error('Replica type must be `instance` or `class`');
      }
    }
  }
}
