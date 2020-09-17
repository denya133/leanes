import type { ControllerInterface } from '../interfaces/ControllerInterface';
import type { MediatorInterface } from '../interfaces/MediatorInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import type { ObserverInterface } from '../interfaces/ObserverInterface';
import type { ViewInterface } from '../interfaces/ViewInterface';
// import { injectable, inject, Container } from "inversify";

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;

  // let container = new Container();

  @initialize
  @module(Module)
  class View extends CoreObject implements ViewInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    static MULTITON_MSG: "View instance for this multiton key already constructed!"

    // iphMediatorMap = PointerT(View.protected({
    @property _mediatorMap: {[key: string]: ?MediatorInterface} = null;

    // iphObserverMap = PointerT(View.protected({
    @property _observerMap: { [key: string]: ?Array<ObserverInterface> } = null;

    // ipsMultitonKey = PointerT(View.protected({
    @property _multitonKey: ?string = null;

    // cphInstanceMap = PointerT(View.private(View.static({
    @property static _instanceMap: { [key: string]: ?ViewInterface } = {};

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
            if (typeof voMediator.getViewComponent == 'function') {
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

    @method static getInstance(asKey: string): View {
      if (!asKey) {
        return null;
      }
      if (View._instanceMap[asKey] == null) {
        View._instanceMap[asKey] = this.new(asKey);
        // View._instanceMap[asKey] = View.new(asKey);
      }
      return View._instanceMap[asKey];
    }

    @method static removeView(asKey: string): void {
      const voView = View._instanceMap[asKey];
      if (voView != null) {
        for (const asMediatorName of Reflect.ownKeys(voView._mediatorMap)) {
          voView.removeMediator(asMediatorName);
        }
        // for (const asMediatorName of container._bindingDictionary._map) {
        //   voView.removeMediator(asMediatorName[0]);
        // }
        View._instanceMap[asKey] = undefined;
        delete View._instanceMap[asKey];
      }
    }

    @method registerObserver(asNotificationName: string, aoObserver: ObserverInterface): void {
      const vlObservers = this._observerMap[asNotificationName];
      if (vlObservers != null) {
        vlObservers.push(aoObserver);
      } else {
        this._observerMap[asNotificationName] = [aoObserver];
      }
    }

    @method removeObserver(asNotificationName: string, aoNotifyContext: ControllerInterface | MediatorInterface): void {
      const vlObservers: Array<ObserverInterface> = this._observerMap[asNotificationName] || [];
      for (let i: number = 0; i < vlObservers.length; i++) {
        if (vlObservers[i].compareNotifyContext(aoNotifyContext) === true) {
          vlObservers.splice(i, 1);
          break;
        }
      }
      if (vlObservers.length === 0) {
        delete this._observerMap[asNotificationName];
      }
    }

    @method notifyObservers(aoNotification: NotificationInterface): void {
      const vsNotificationName = aoNotification.getName();
      const vlObservers = this._observerMap[vsNotificationName];
      if (vlObservers != null) {
        const vlNewObservers = [...vlObservers];
        for (const voObserver of vlNewObservers) {
          // ((voObserver) => {
          voObserver.notifyObserver(aoNotification);
          // })(voObserver);
        }
      }
    }

    @method registerMediator(aoMediator: MediatorInterface): void {
      const vsName = aoMediator.getMediatorName();
      // Do not allow re-registration (you must removeMediator first).
      if (this._mediatorMap[vsName] != null) {
        return;
      }
      aoMediator.initializeNotifier(this._multitonKey);
      // Register the Mediator for retrieval by name.
      this._mediatorMap[vsName] = aoMediator;
      // container.bind(vsName).to(aoMediator);
      // Get Notification interests, if any.
      const vlInterests = aoMediator.listNotificationInterests() || [];
      if (vlInterests.length > 0) {
        const voObserver = Module.NS.Observer.new(
          aoMediator.handleNotification,
          aoMediator
        );
        for (const vsInterest of vlInterests) {
          // ((vsInterest) => {
          this.registerObserver(vsInterest, voObserver);
          // })(vsInterest);
        }
      }
      // Alert the mediator that it has been registered.
      aoMediator.onRegister();
    }

    @method addMediator(...args) {
      return this.registerMediator(...args);
    }

    @method retrieveMediator(asMediatorName: string): ?MediatorInterface {
      return this._mediatorMap[asMediatorName] || null;
      // return container.get(asMediatorName) || null;
    }

    @method getMediator(...args) {
      return this.retrieveMediator(...args);
    }

    @method removeMediator(asMediatorName: string): ?MediatorInterface {
      const voMediator = this._mediatorMap[asMediatorName];
      // const voMediator = container.get(asMediatorName);
      if (voMediator == null) {
        return null;
      }
      // Get Notification interests, if any.
      const vlInterests = voMediator.listNotificationInterests();
      // For every notification this mediator is interested in...
      for (const vsInterest of vlInterests) {
        // ((vsInterest) => {
        this.removeObserver(vsInterest, voMediator);
        // })(vsInterest);
      }
      // remove the mediator from the map
      this._mediatorMap[asMediatorName] = undefined;
      delete this._mediatorMap[asMediatorName];
      // Alert the mediator that it has been removed
      voMediator.onRemove();
      return voMediator;
    }

    @method hasMediator(asMediatorName: string): boolean {
      return this._mediatorMap[asMediatorName] != null;
      // return container.get(asMediatorName) != null;
    }

    @method _initializeView(): void { return; }

    constructor(asKey: string) {
      super(...arguments);
      assert(View._instanceMap[asKey] == null, View.MULTITON_MSG);
      this._multitonKey = asKey;
      View._instanceMap[asKey] = this;
      this._mediatorMap = {};
      this._observerMap = {};
      this._initializeView();
    }
  }
}
