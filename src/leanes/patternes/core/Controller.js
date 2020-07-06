import type { ControllerInterface } from '../interfaces/ControllerInterface';
import type { ViewInterface } from '../interfaces/ViewInterface';
import type { CommandInterface } from '../interfaces/CommandInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import { injectable, inject, Container } from "inversify";

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;

  let container = new Container();

  @injectable
  @initialize
  @module(Module)
  class Controller extends CoreObject implements ControllerInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: string = 'Controller instance for this multiton key already constructed!';

    // ipoView         = PointerT @private _view: ViewInterface
    @property _view: ViewInterface = null;
    // iphCommandMap   = PointerT @private _commandMap: DictG String, MaybeG SubsetG CommandInterface
    // @property _commandMap: {[key: string]: ?Class<CoreObject>} = null;
    // iphClassNames   = PointerT @private _classNames: DictG String, MaybeG String
    @property _classNames: {[key: string]: ?string} = null;
    // ipsMultitonKey  = PointerT @protected _multitonKey: MaybeG String
    @property _multitonKey: ?string = null;
    // cphInstanceMap  = PointerT @private @static _instanceMap: DictG(String, MaybeG ControllerInterface),
    //   default: {}
    @property static _instanceMap: {[key: string]: ?ControllerInterface} = {};
    // ipcApplicationModule = PointerT @protected _ApplicationModule: MaybeG SubsetG Module
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

    @method static getInstance(asKey: string): Controller {
      if (!asKey) {
        return null;
      }
      if (Controller._instanceMap[asKey] == null) {
        Controller._instanceMap[asKey] = Controller.new(asKey);
      }
      return Controller._instanceMap[asKey];
    }

    @method static removeController(asKey: string): void {
      const voController = Controller._instanceMap[asKey]
      if (voController != null) {
        // for (const asNotificationName of Reflect.ownKeys(voController._commandMap)) {
        //   voController.removeCommand(asNotificationName);
        // }
        for (const asNotificationName of container._bindingDictionary._map) {
          voController.removeCommand(asNotificationName[0]);
        }
        Controller._instanceMap[asKey] = undefined;
        delete Controller._instanceMap[asKey];
      }
    }

    @method executeCommand(aoNotification: NotificationInterface): void {
      if (!aoNotification) {
        return;
      }
      let vCommand;
      const vsName = aoNotification.getName();
      // vCommand = this._commandMap[vsName];
      vCommand = container.get(vsName);
      if (vCommand == null) {
        const vsClassName = this._classNames[vsName];
        if (!_.isEmpty(vsClassName)) {
          // vCommand = this._commandMap[vsName] = this.ApplicationModule.NS[vsClassName];
          container.bind(vsName).to(this.ApplicationModule.NS[vsClassName]);
          vCommand = container.get(vsName);
        }
      }
      if (vCommand != null) {
        const voCommand: CommandInterface = vCommand.new();
        voCommand.initializeNotifier(this._multitonKey);
        voCommand.execute(aoNotification);
      }
    }

    @method registerCommand(asNotificationName: string, aCommand: Class<CoreObject>): void {
      // if (!this._commandMap[asNotificationName]) {
      //   this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
      //   this._commandMap[asNotificationName] = aCommand;
      // }
      if (!container.get(asNotificationName)) {
        this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
        container.bind(asNotificationName).to(aCommand);
      }
    }

    @method addCommand(...args) {
      return this.registerCommand(...args);
    }

    @method lazyRegisterCommand(asNotificationName: string, asClassName: ?string): void {
      if (asClassName == null) {
        asClassName = asNotificationName;
      }
      // if (!this._commandMap[asNotificationName]) {
      //   this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
      //   this._classNames[asNotificationName] = asClassName;
      // }
      if (!container.get(asNotificationName)) {
        this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
        this._classNames[asNotificationName] = asClassName;
      }
    }

    @method hasCommand(asNotificationName: string): boolean {
      // return (this._commandMap[asNotificationName] != null) || (this._classNames[asNotificationName] != null);
      return (container.get(asNotificationName) != null) || (this._classNames[asNotificationName] != null);
    }

    @method removeCommand(asNotificationName: string): void {
      if (this.hasCommand(asNotificationName)) {
        this._view.removeObserver(asNotificationName, this);
        // this._commandMap[asNotificationName] = undefined;
        this._classNames[asNotificationName] = undefined;
        // delete this._commandMap[asNotificationName];
        delete this._classNames[asNotificationName];
      }
    }

    @method _initializeController(): void {
      this._view = Module.NS.View.getInstance(this._multitonKey);
    }

    constructor(asKey: string) {
      super(... arguments);
      assert(Controller._instanceMap[asKey] == null, Controller.MULTITON_MSG);
      this._multitonKey = asKey;
      Controller._instanceMap[asKey] = this;
      // this._commandMap = {};
      this._classNames = {};
      this._initializeController();
    }
  }
}