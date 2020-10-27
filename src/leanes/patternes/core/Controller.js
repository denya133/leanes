// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

import type { ControllerInterface } from '../interfaces/ControllerInterface';
import type { ViewInterface } from '../interfaces/ViewInterface';
import type { CommandInterface } from '../interfaces/CommandInterface';
import type { CaseInterface } from '../interfaces/CaseInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import { Container } from "inversify";
// import { injectable, inject, Container } from "inversify";

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;

  // let container = new Container();

  @initialize
  // @injectable()
  @partOf(Module)
  class Controller extends CoreObject implements ControllerInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: string = 'Controller instance for this multiton key already constructed!';

    // ipoView         = PointerT @private _view: ViewInterface
    @property _view: ViewInterface = null;
    // iphCommandMap   = PointerT @private _commandMap: DictG String, MaybeG SubsetG CommandInterface
    @property _commandMap: {[key: string]: ?Class<CoreObject>} = null;
    // iphClassNames   = PointerT @private _classNames: DictG String, MaybeG String
    @property _classNames: {[key: string]: ?string} = null;
    // ipsMultitonKey  = PointerT @protected _multitonKey: MaybeG String
    @property _multitonKey: ?string = null;

    @property _container: Container = null;
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

    @method static getInstance(asKey: string, container: Container): Controller {
      if (!asKey) {
        return null;
      }
      if (Controller._instanceMap[asKey] == null) {
        Controller._instanceMap[asKey] = this.new(asKey, container);
        // Controller._instanceMap[asKey] = Controller.new(asKey);
      }
      return Controller._instanceMap[asKey];
    }

    @method static async removeController(asKey: string): Promise<void> {
      const voController = Controller._instanceMap[asKey]
      if (voController != null) {
        for (const asNotificationName of Reflect.ownKeys(voController._commandMap)) {
          await voController.removeCommand(asNotificationName);
        }
        for (const asName of Reflect.ownKeys(voController._classNames)) {
          await voController.removeCase(asName);
          await voController.removeSuite(asName);
        }
        // for (const asNotificationName of container._bindingDictionary._map) {
        //   voController.removeCommand(asNotificationName[0]);
        // }
        // Controller._instanceMap[asKey] = undefined;
        delete Controller._instanceMap[asKey];
      }
    }

    @method retrieveCommand(asNotificationName: string): ?CommandInterface {
      let vCommand;
      vCommand = this._commandMap[asNotificationName];
      // vCommand = container.get(asNotificationName);
      if (vCommand == null) {
        const vsClassName = this._classNames[asNotificationName];
        if (!_.isEmpty(vsClassName)) {
          vCommand = this._commandMap[asNotificationName] = this.ApplicationModule.NS[vsClassName];
          // container.bind(asNotificationName).to(this.ApplicationModule.NS[vsClassName]);
          // vCommand = container.get(asNotificationName);
        }
      }
      if (vCommand != null) {
        if (!this._container.isBound(asNotificationName)) {
          this._container.bind(asNotificationName).to(vCommand);
        }
        const voCommand: CommandInterface = this._container.get(asNotificationName);
        // const voCommand: CommandInterface = vCommand.new();
        voCommand.initializeNotifier(this._multitonKey);
        return voCommand;
      }
    }

    @method getCommand(...args) {
      return this.retrieveCommand(...args);
    }

    @method executeCommand(aoNotification: NotificationInterface): void {
      if (!aoNotification) {
        return;
      }
      // let vCommand;
      const vsName = aoNotification.getName();
      const voCommand: ?CommandInterface = this.retrieveCommand(vsName);
      if (voCommand != null) {
        voCommand.execute(aoNotification);
      }
      // vCommand = this._commandMap[vsName];
      // // vCommand = container.get(vsName);
      // if (vCommand == null) {
      //   const vsClassName = this._classNames[vsName];
      //   if (!_.isEmpty(vsClassName)) {
      //     vCommand = this._commandMap[vsName] = this.ApplicationModule.NS[vsClassName];
      //     // container.bind(vsName).to(this.ApplicationModule.NS[vsClassName]);
      //     // vCommand = container.get(vsName);
      //   }
      // }
      // if (vCommand != null) {
      //   const voCommand: CommandInterface = vCommand.new();
      //   voCommand.initializeNotifier(this._multitonKey);
      //   voCommand.execute(aoNotification);
      // }
    }

    @method registerCommand(asNotificationName: string, aCommand: Class<CoreObject>): void {
      if (!this._commandMap[asNotificationName]) {
        this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
        this._commandMap[asNotificationName] = aCommand;
        if (!this._container.isBound(`Factory<${asNotificationName}>`)) {
          this._container.bind(`Factory<${asNotificationName}>`).toFactory((context) => {
            return () => {
              return this.retrieveCommand(asNotificationName)
            }
          });
        }
      }
      // if (!container.get(asNotificationName)) {
      //   this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
      //   container.bind(asNotificationName).to(aCommand);
      // }
    }

    @method addCommand(...args) {
      return this.lazyRegisterCommand(...args);
    }

    @method lazyRegisterCommand(asNotificationName: string, asClassName: ?string): void {
      if (asClassName == null) {
        asClassName = asNotificationName;
      }
      if (this._commandMap[asNotificationName] == null && this._classNames[asNotificationName] == null) {
        this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
        this._classNames[asNotificationName] = asClassName;
      }
      if (!this._container.isBound(`Factory<${asNotificationName}>`)) {
        this._container.bind(`Factory<${asNotificationName}>`).toFactory((context) => {
          return () => {
            return this.retrieveCommand(asNotificationName)
          }
        });
      }
      // if (!container.get(asNotificationName)) {
      //   this._view.registerObserver(asNotificationName, Module.NS.Observer.new(this.executeCommand, this));
      //   this._classNames[asNotificationName] = asClassName;
      // }
    }

    @method hasCommand(asNotificationName: string): boolean {
      return (this._commandMap[asNotificationName] != null) || (this._classNames[asNotificationName] != null);
      // return (container.get(asNotificationName) != null) || (this._classNames[asNotificationName] != null);
    }

    @method async removeCommand(asNotificationName: string): Promise<void> {
      if (this.hasCommand(asNotificationName)) {
        this._view.removeObserver(asNotificationName, this);
        // this._commandMap[asNotificationName] = undefined;
        // this._classNames[asNotificationName] = undefined;
        delete this._commandMap[asNotificationName];
        delete this._classNames[asNotificationName];
      }
    }

    @method addCase(asKey: string, asClassName: ?string): void {
      if (asClassName == null) {
        asClassName = asKey;
      }
      if (this._classNames[asKey] == null) {
        this._classNames[asKey] = asClassName;
      }
      if (!this._container.isBound(`Factory<${asKey}>`)) {
        this._container.bind(`Factory<${asKey}>`).toFactory((context) => {
          return () => {
            return this.getCase(asKey)
          }
        });
      }
    }

    @method hasCase(asKey: string): boolean {
      return (this._classNames[asKey] != null);
    }

    @method async removeCase(asKey: string): Promise<void> {
      if (this.hasCase(asKey)) {
        delete this._classNames[asKey];
        if (this._container.isBound(`Factory<${asKey}>`)) {
          this._container.unbind(`Factory<${asKey}>`);
        }
        if (this._container.isBound(asKey)) {
          this._container.unbind(asKey);
        }
      }
    }

    @method getCase(asKey: string): ?CaseInterface {
      let vCase;
      const vsClassName = this._classNames[asKey];
      if (!_.isEmpty(vsClassName)) {
        vCase = this.ApplicationModule.NS[vsClassName];
      }
      if (vCase != null) {
        if (!this._container.isBound(asKey)) {
          this._container.bind(asKey).to(vCase);
        }
        const voCase: CaseInterface = this._container.get(asKey);
        voCase.initializeNotifier(this._multitonKey);
        return voCase;
      }
    }

    @method addSuite(asKey: string, asClassName: ?string): void {
      if (asClassName == null) {
        asClassName = asKey;
      }
      if (this._classNames[asKey] == null) {
        this._classNames[asKey] = asClassName;
      }
      if (!this._container.isBound(`Factory<${asKey}>`)) {
        this._container.bind(`Factory<${asKey}>`).toFactory((context) => {
          return () => {
            return this.getSuite(asKey)
          }
        });
      }
    }

    @method hasSuite(asKey: string): boolean {
      return (this._classNames[asKey] != null);
    }

    @method async removeSuite(asKey: string): Promise<void> {
      if (this.hasSuite(asKey)) {
        delete this._classNames[asKey];
        if (this._container.isBound(`Factory<${asKey}>`)) {
          this._container.unbind(`Factory<${asKey}>`);
        }
        if (this._container.isBound(asKey)) {
          this._container.unbind(asKey);
        }
      }
    }

    @method getSuite(asKey: string): ?SuiteInterface {
      let vSuite;
      const vsClassName = this._classNames[asKey];
      if (!_.isEmpty(vsClassName)) {
        vSuite = this.ApplicationModule.NS[vsClassName];
      }
      if (vSuite != null) {
        if (!this._container.isBound(asKey)) {
          this._container.bind(asKey).to(vSuite);
        }
        const voSuite: SuiteInterface = this._container.get(asKey);
        voSuite.initializeNotifier(this._multitonKey);
        return voSuite;
      }
    }

    @method _initializeController(): void {
      this._view = Module.NS.View.getInstance(this._multitonKey, this._container);
    }

    constructor(asKey: string, container: Container) {
      super(... arguments);
      assert(Controller._instanceMap[asKey] == null, Controller.MULTITON_MSG);
      this._multitonKey = asKey;
      this._container = container;
      // Controller._instanceMap[asKey] = this;
      this._commandMap = {};
      this._classNames = {};
      this._initializeController();
    }
  }
}
