import type { ModelInterface } from '../interfaces/ModelInterface';
import type { ProxyInterface } from '../interfaces/ProxyInterface';
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
  class Model extends CoreObject implements ModelInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: string = 'Model instance for this multiton key already constructed!';

    // iphProxyMap = PointerT(Model.private({
    @property _proxyMap: {[key: string]: ?ProxyInterface} = null;

    // iphMetaProxyMap = PointerT(Model.private({
    @property _metaProxyMap: { [key: string]: ?{ className: ?string, data: ?any } } = null;

    // ipsMultitonKey = PointerT(Model.protected({
    @property _multitonKey: ?string = null;

    // cphInstanceMap = PointerT(Model.private(Model.static({
    @property static _instanceMap: { [key: string]: ?ModelInterface } = {};

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

    @method static getInstance(asKey: string): Model {
      if (!asKey) {
        return null;
      }
      // console.log('>>>>???/ Model.getInstance 111', asKey, Model._instanceMap[asKey]);
      if (Model._instanceMap[asKey] == null) {
        Model._instanceMap[asKey] = this.new(asKey);
        // Model._instanceMap[asKey] = Model.new(asKey);
      }
      // const mmm = Model._instanceMap[asKey];
      // console.log('>>>>???/ Model.getInstance 222', asKey, mmm);
      // (mmm: ModelInterface);
      // console.log('>>>>???/ Model.getInstance 333', asKey);
      return Model._instanceMap[asKey];
    }

    @method static removeModel(asKey: string): void {
      const voModel = Model._instanceMap[asKey];
      if (voModel != null) {
        for (const asProxyName of Reflect.ownKeys(voModel._proxyMap)) {
          voModel.removeProxy(asProxyName);
        }
        // for (const asProxyName of container._bindingDictionary._map) {
        //   voModel.removeProxy(asProxyName[0]);
        // }
        Model._instanceMap[asKey] = undefined;
        delete Model._instanceMap[asKey];
      }
    }

    @method registerProxy(aoProxy: ProxyInterface): void {
      aoProxy.initializeNotifier(this._multitonKey);
      this._proxyMap[aoProxy.getName()] = aoProxy;
      // container.bind(aoProxy.getProxyName()).to(aoProxy);
      aoProxy.onRegister();
    }

    @method addProxy(...args) {
      return this.registerProxy(...args);
    }

    @method removeProxy(asProxyName: string): ?ProxyInterface {
      const voProxy = this._proxyMap[asProxyName];
      // const voProxy = container.get(asProxyName);
      if (voProxy) {
        this._proxyMap[asProxyName] = undefined;
        this._metaProxyMap[asProxyName] = undefined;
        delete this._proxyMap[asProxyName];
        delete this._metaProxyMap[asProxyName];
        voProxy.onRemove();
      }
      return voProxy;
    }

    @method retrieveProxy(asProxyName: string): ?ProxyInterface {
      if (this._proxyMap[asProxyName] == null) {
      // if (!container.isBoundNamed(asProxyName)) {
        const {
          className, data = {}
        } = this._metaProxyMap[asProxyName] || {};
        if (!_.isEmpty(className)) {
          const voClass = this.ApplicationModule.NS[className];
          this.registerProxy(voClass.new(asProxyName, data));
        }
      }
      return this._proxyMap[asProxyName] || null;
      // return container.get(asProxyName) || null;
    }

    @method getProxy(...args) {
      return this.retrieveProxy(...args);
    }

    @method hasProxy(asProxyName: string): boolean {
      return (this._proxyMap[asProxyName] != null) || (this._metaProxyMap[asProxyName] != null);
      // return (container.get(asProxyName) != null) || (this._metaProxyMap[asProxyName] != null);
    }

    @method lazyRegisterProxy(asProxyName: string, asProxyClassName: ?string, ahData: ?any): void {
      this._metaProxyMap[asProxyName] = {
        className: asProxyClassName,
        data: ahData
      };
    }

    @method _initializeModel(): void { return; }

    constructor(asKey: string) {
      super(...arguments);
      assert(Model._instanceMap[asKey] == null, Model.MULTITON_MSG);
      this._multitonKey = asKey;
      Model._instanceMap[asKey] = this;
      this._proxyMap = {};
      this._metaProxyMap = {};
      this._initializeModel();
    }

  }
}
