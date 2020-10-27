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

import type { FacadeInterface } from '../interfaces/FacadeInterface';
import type { NotifierInterface } from '../interfaces/NotifierInterface';
import { injectable, decorate } from "inversify";

export default (Module) => {

  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  decorate(injectable(), CoreObject);

  @initialize
  @injectable()
  @partOf(Module)
  class Notifier extends CoreObject implements NotifierInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: string = 'multitonKey for this Notifier not yet initialized!';

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

    @method async sendNotification(asName: string, aoBody: ?any, asType: ?string): Promise<void> {
      if (this.facade != null) {
        await this.facade.sendNotification(asName, aoBody, asType);
      }
    }

    @method async send(): Promise<void> {
      await this.sendNotification(... arguments);
    }

    @method async run(scriptName: string, data?: any): Promise<?any> {
      return await this.facade.run(scriptName, data);
    }

    @method initializeNotifier(asKey: string): void {
      this._multitonKey = asKey;
    }

    constructor() {
      super();
    }
  }
}
