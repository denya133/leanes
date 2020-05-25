import type { MediatorInterface } from '../interfaces/MediatorInterface';

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    Notifier,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class Mediator extends Notifier implements MediatorInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipsMediatorName = PointerT(Mediator.private({
    @property _mediatorName: string = null;

    // ipoViewComponent = PointerT(Mediator.private({
    @property _viewComponent: ?any = null;

    @method getMediatorName(): string {
      return this._mediatorName;
    }

    @method getName(): string {
      return this._mediatorName;
    }

    @method getViewComponent(): ?any {
      return this._viewComponent;
    }

    @method setViewComponent(aoViewComponent: ?any): void {
      this._viewComponent = aoViewComponent;
    }

    @property get view(): ?any {
      return this.getViewComponent();
    }

    @property set view(aoViewComponent: ?any): ?any {
      this.setViewComponent(aoViewComponent);
      return aoViewComponent;
    }

    @method getProxy(asProxyName: string): ProxyInterface {
      return this.facade.retrieveProxy(asProxyName);
    }

    @method addProxy(aoProxy: ProxyInterface): void {
      this.facade.registerProxy(aoProxy);
    }

    @method listNotificationInterests(): Array { return []; }

    @method handleNotification(aoNotification: NotificationInterface): void { return; }

    @method onRegister(): void  { return; }

    @method onRemove(): void { return; }

    @method static async restoreObject(acModule: Class<Module>, replica: object): MediatorInterface {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const facade = acModule.NS.ApplicationFacade.getInstance(replica.multitonKey);
        const mediator = facade.retrieveMediator(replica.mediatorName);
        return mediator;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: MediatorInterface): object {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance._multitonKey;
      replica.mediatorName = instance.getMediatorName();
      return replica;
    }

    constructor(asMediatorName: ?string, aoViewComponent: ?any) {
      super(... arguments);
      this._mediatorName = asMediatorName || this.constructor.name;
      if (aoViewComponent != null) {
        this._viewComponent = aoViewComponent;
      }
    }
  }
}
