import type { FacadeInterface } from '../interfaces/FacadeInterface';
import type { ControllerInterface } from '../interfaces/ControllerInterface';
import type { MediatorInterface } from '../interfaces/MediatorInterface';
import type { ModelInterface } from '../interfaces/ModelInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import type { ProxyInterface } from '../interfaces/ProxyInterface';
import type { ViewInterface } from '../interfaces/ViewInterface';
// import { injectable, inject, Container } from "inversify";

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;

  // let container = new Container();

  // @injectable
  @initialize
  @module(Module)
  class Facade extends CoreObject implements FacadeInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: "Facade instance for this multiton key already constructed!"

    // ipoModel = PointerT(Facade.protected({
    @property _model: ?ModelInterface = null;

    // ipoView = PointerT(Facade.protected({
    @property _view: ?ViewInterface = null;

    // ipoController = PointerT(Facade.protected({
    @property _controller: ?ControllerInterface = null;

    // ipsMultitonKey = PointerT(Facade.protected({
    @property _multitonKey: ?string = null;

    // cphInstanceMap = PointerT(Facade.protected(Facade.static({
    @property static _instanceMap: { [key: string]: ?FacadeInterface } = {};

    // ipmInitializeModel = PointerT(Facade.protected({
    @method _initializeModel(): void {
      if (this._model == null) {
        this._model = Module.NS.Model.getInstance(this._multitonKey);
      }
      // container.bind("Model").to(Module.NS.Model);
      // if (this._model == null) {
      //   this._model = container.get("Model").getInstance(this._multitonKey);
      // }
    }

    // ipmInitializeController = PointerT(Facade.protected({
    @method _initializeController(): void {
      if (this._controller == null) {
        this._controller = Module.NS.Controller.getInstance(this._multitonKey);
      }
      // container.bind("Controller").to(Module.NS.Controller);
      // if (this._controller == null) {
      //   this._controller = container.get("Controller").getInstance(this._multitonKey);
      // }
    }

    // ipmInitializeView = PointerT(Facade.protected({
    @method _initializeView(): void {
      if (this._view == null) {
        this._view = Module.NS.View.getInstance(this._multitonKey);
      }
      // container.bind("View").to(Module.NS.View);
      // if (this._view == null) {
      //   this._view = container.get("View").getInstance(this._multitonKey);
      // }
    }

    // ipmInitializeFacade = PointerT(Facade.protected({
    @method _initializeFacade(): void {
      this._initializeModel();
      this._initializeController();
      this._initializeView();
    }

    @method static getInstance(asKey: string): FacadeInterface {
      if (Facade._instanceMap[asKey] == null) {
        Facade._instanceMap[asKey] = this.new(asKey);
      }
      return Facade._instanceMap[asKey];
    }

    @method remove(): void {
      Module.NS.Model.removeModel(this._multitonKey);
      Module.NS.Controller.removeController(this._multitonKey);
      Module.NS.View.removeView(this._multitonKey);
      // container.get("Model").removeModel(this._multitonKey);
      // container.get("Controller").removeController(this._multitonKey);
      // container.get("View").removeView(this._multitonKey);
      this._model = undefined;
      this._view = undefined;
      this._controller = undefined;
      Module.NS.Facade._instanceMap[this._multitonKey] = undefined;
      delete Module.NS.Facade._instanceMap[this._multitonKey];
    }

    @method registerCommand(asNotificationName: string, aCommand: Class<CoreObject>): void {
      this._controller.registerCommand(asNotificationName, aCommand);
    }

    @method addCommand(...args): void {
      return this.registerCommand(...args);
    }

    @method lazyRegisterCommand(asNotificationName: string, asClassName: ?string): void {
      this._controller.lazyRegisterCommand(asNotificationName, asClassName);
    }

    @method removeCommand(asNotificationName: string): void {
      this._controller.removeCommand(asNotificationName);
    }

    @method hasCommand(asNotificationName: string): boolean {
      return this._controller.hasCommand(asNotificationName);
    }

    @method registerProxy(aoProxy: ProxyInterface): void {
      this._model.registerProxy(aoProxy);
    }

    @method addProxy(...args): void {
      return this.registerProxy(...args);
    }

    @method lazyRegisterProxy(asProxyName: string, asProxyClassName: ?string, ahData: ?any): void {
      this._model.lazyRegisterProxy(asProxyName, asProxyClassName, ahData);
    }

    @method retrieveProxy(asProxyName: string): ?ProxyInterface {
      return this._model.retrieveProxy(asProxyName);
    }

    @method getProxy(...args): ?ProxyInterface {
      return this.retrieveProxy(...args);
    }

    @method removeProxy(asProxyName: string): ?ProxyInterface {
      return this._model.removeProxy(asProxyName);
    }

    @method hasProxy(asProxyName: string): boolean {
      return this._model.hasProxy(asProxyName);
    }

    @method registerMediator(aoMediator: MediatorInterface): void {
      if (this._view) {
        this._view.registerMediator(aoMediator);
      }
    }

    @method addMediator(...args): void {
      return this.registerMediator(...args);
    }

    @method retrieveMediator(asMediatorName: string): ?MediatorInterface {
      if (this._view) {
        return this._view.retrieveMediator(asMediatorName);
      }
    }

    @method getMediator(...args): ?MediatorInterface {
      return this.retrieveMediator(...args);
    }

    @method removeMediator(asMediatorName: string): ?MediatorInterface {
      if (this._view) {
        return this._view.removeMediator(asMediatorName);
      }
    }

    @method hasMediator(asMediatorName: string): boolean {
      if (this._view) {
        return this._view.hasMediator(asMediatorName);
      }
    }

    @method notifyObservers(aoNotification: NotificationInterface): void {
      if (this._view) {
        this._view.notifyObservers(aoNotification);
      }
    }

    @method sendNotification(asName: string, aoBody: ?any, asType: ?string): void {
      this.notifyObservers(Module.NS.Notification.new(asName, aoBody, asType));
    }

    @method send(...args): void {
      return this.sendNotification(...args);
    }

    @method async run(scriptName: string, data?: any): Promise<?any> {
      if (this._multitonKey != null) {
        const voFacade = Facade.getInstance(this._multitonKey);
        if (typeof voFacade.retrieveMediator == 'function') {
          const voMediator = voFacade.retrieveMediator(APPLICATION_MEDIATOR);
          if (typeof voMediator.run == 'function') {
            return await voMediator.run(scriptName, data);
          }
        }
      }
    }

    @method initializeNotifier(asKey: string): void {
      this._multitonKey = asKey;
    }

    @method static hasCore(key: string): boolean {
      return !!Facade._instanceMap[key];
    }

    @method static removeCore(key: string): void {
      if (!Facade._instanceMap[key]) {
        return;
      }
      Module.NS.Model.removeModel(key);
      Module.NS.View.removeView(key);
      Module.NS.Controller.removeController(key);
      // container.get("Model").removeModel(key);
      // container.get("View").removeView(key);
      // container.get("Controller").removeController(key);
      delete Facade._instanceMap[key];
    }

    @method static async restoreObject(acModule: Class<Module>, replica: object): Promise<FacadeInterface> {
      if ((replica != null ? replica.class : undefined) === this.name && (replica != null ? replica.type : undefined) === 'instance') {
        if (Facade._instanceMap[replica.multitonKey] == null) {
          acModule.NS[replica.application].new();
        }
        return acModule.NS.ApplicationFacade.getInstance(replica.multitonKey);
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: FacadeInterface): Promise<object> {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance._multitonKey;
      const applicationMediator = instance.retrieveMediator(APPLICATION_MEDIATOR);
      const application = applicationMediator.getViewComponent().constructor.name;
      replica.application = application;
      return replica;
    }

    constructor(asKey: string) {
      super(...arguments);
      console.log('>?>?>? Facade', asKey);
      assert(Facade._instanceMap[asKey] == null, Facade.MULTITON_MSG);
      console.log('>?>?>? Facade before initializeNotifier');
      this.initializeNotifier(asKey);
      console.log('>?>?>? Facade after initializeNotifier', this._multitonKey);
      Facade._instanceMap[asKey] = this;
      console.log('>?>?>? Facade after Facade._instanceMap[asKey] = this');
      this._initializeFacade();
      console.log('>?>?>? Facade after _initializeFacade');
    }
  }
}
