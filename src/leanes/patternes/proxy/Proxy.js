import type { ProxyInterface } from '../interfaces/ProxyInterface';

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    Notifier,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class Proxy extends Notifier implements ProxyInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipsProxyName = PointerT(Proxy.private({
    @property _proxyName: string = null;

    // ipoData = PointerT(Proxy.private({
    @property _data: ?any = null;

    @method getProxyName(): string {
      return this._proxyName;
    }

    @method getName(): string {
      return this._proxyName;
    }

    @method setData(ahData: ?any) {
      this._data = ahData;
      return ahData;
    }

    @method getData(): ?any {
      return this._data;
    }

    @method onRegister(): void  { return; }

    @method onRemove(): void { return; }

    @method static async restoreObject(acModule: Class<Module>, replica: object): ProxyInterface {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const facade = acModule.NS.ApplicationFacade.getInstance(replica.multitonKey);
        const proxy = facade.retrieveProxy(replica.proxyName);
        return proxy;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: ProxyInterface): object {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance._multitonKey;
      replica.proxyName = instance.getProxyName();
      return replica;
    }

    constructor(asProxyName: ?string, ahData: ?any) {
      super(... arguments);
      this._proxyName = asProxyName || this.constructor.name;
      if (ahData != null) {
        this.setData(ahData);
      }
    }
  }
}
