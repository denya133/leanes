import type { FacadeInterface } from '../interfaces/FacadeInterface';
import type { NotifierInterface } from '../interfaces/NotifierInterface';
// import { injectable, inject} from "inversify";

export default (Module) => {

  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;

  // @injectable
  @initialize
  @module(Module)
  class Notifier extends CoreObject implements NotifierInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: 'multitonKey for this Notifier not yet initialized!'

    // ipsMultitonKey = PointerT(Notifier.protected({
    @property _multitonKey: ?string = null;

    // ipcApplicationModule = PointerT(Model.protected({
    @property _ApplicationModule: ?Class<Module> = null;

    @property get ApplicationModule(): Class<Module> {
      if (this._ApplicationModule != null) {
        return this._ApplicationModule;
      } else {
        if (this._multitonKey != null) {
          const voFacade = Module.NS.Facade.getInstance(this._multitonKey);
          if (typeof voFacade.retrieveMediator == 'function') {
            const voMediator = voFacade.retrieveMediator(APPLICATION_MEDIATOR);
            if (voMediator != null && typeof voMediator.getViewComponent == 'function') {
              const app = voMediator.getViewComponent();
              if (app && app.Module) {
                return app.Module;
              } else {
                return this.Module;
              }
            } else {
              return this.Module;
            }
          } else {
            return this.Module;
          }
        } else {
          return this.Module;
        }
      }
    }

    @property get facade(): FacadeInterface {
      if (this._multitonKey == null) {
        throw new Error(Notifier.MULTITON_MSG);
      }
      return Module.NS.Facade.getInstance(this._multitonKey);
    }

    @method sendNotification(asName: string, aoBody: ?any, asType: ?string): void {
      if (this.facade != null) {
        this.facade.sendNotification(asName, aoBody, asType);
      }
    }

    @method send() {
      return this.sendNotification(... arguments);
    }

    @method async run(scriptName: string, data?: any): Promise<?any> {
      return await this.facade.run(scriptName, data);
    }

    @method initializeNotifier(asKey: string): void {
      this._multitonKey = asKey;
    }
  }
}
