import type { FacadeInterface } from '../../patternes';
import type { DelayableInterface } from '../interfaces/DelayableInterface';
import type { RecoverableStaticInterface } from '../../es';

export default (Module) => {
  const {
    RESQUE, DELAYED_JOBS_QUEUE, DELAYED_JOBS_SCRIPT,
    initializeMixin, meta, method
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass implements DelayableInterface {
      @meta static object = {};

      // cpmDelayJob = PointerT(_Class.private(_Class.static(_Class.async({
      @method static async _delayJob(
        facade: FacadeInterface,
        data: {|
          moduleName: string,
          replica: object,
          methodName: string,
          args: array,
          opts: {queue: ?string, delayUntil: ?number}
        |},
        options: {queue: ?string, delayUntil: ?number}
      ) {
        const queueName = options.queue;
        const resque = facade.getProxy(RESQUE);
        const queue = await resque.get(queueName || DELAYED_JOBS_QUEUE);
        await queue.delay(DELAYED_JOBS_SCRIPT, data, options.delayUntil);
      }

      @method static delay(facade: FacadeInterface, opts: ?{queue: ?string, delayUntil: ?number} = {}): object {
        return new Proxy(this, {
          get: function(target, name, receiver) {
            if (name === 'delay') {
              throw new Error('Method `delay` can not been delayed');
            }
            if (!(name in target) || typeof target[name] !== "function") {
              throw new Error(`Method \`${name}\` absent in class ${target.name}`);
            }
            const ApplicationModule = this.ApplicationModule;
            const Proto = target.constructor;
            (Proto: RecoverableStaticInterface<Module, Proto>);
            return async (...args) => {
              const data = {
                moduleName: target.moduleName(),
                replica: await Proto.replicateObject(target),
                methodName: name,
                args,
                opts
              };
              return await target._delayJob(facade, data, opts);
            };
          }
        });
      }

      @method delay(facade: FacadeInterface, opts: ?{queue: ?string, delayUntil: ?number} = {}): object {
        return new Proxy(this, {
          get: function(target, name, receiver) {
            if (name === 'delay') {
              throw new Error('Method `delay` can not been delayed');
            }
            if (!(name in target) || typeof target[name] !== "function") {
              throw new Error(`Method \`${name}\` absent in class ${target.name}.prototype`);
            }
            vcClass = target.constructor;
            (vcClass: RecoverableStaticInterface<Module, vcClass>);
            return async (...args) => {
              const data = {
                moduleName: target.moduleName(),
                replica: await vcClass.replicateObject(target),
                methodName: name,
                args,
                opts
              };
              return await vcClass._delayJob(facade, data, opts);
            };
          }
        });
      }
    }
    return Mixin;
  });
}
