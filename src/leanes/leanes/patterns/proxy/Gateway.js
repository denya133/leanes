/*
This file is part of LeanRC.

LeanRC is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

LeanRC is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with LeanRC. If not, see <https://www.gnu.org/licenses/>.
*/
/*
```coffee
Module = require 'Module'
module.exports = (App)->
  App::CrudGateway extends Module::Gateway
    @inheritProtected()
    @include Module::CrudGatewayMixin
    @module App
  return App::CrudGateway.initialize()
```
```coffee
module.exports = (App)->
  App::PrepareModelCommand extends Module::SimpleCommand
    @public execute: Function,
      default: ->
        #...
        @facade.registerProxy App::CrudGateway.new 'DefaultGateway',
          entityName: null # какие-то конфиги и что-то опорное для подключения эндов
        @facade.registerProxy App::CrudGateway.new 'CucumbersGateway',
          entityName: 'cucumber'
          schema: App::CucumberRecord.schema
        @facade.registerProxy App::CrudGateway.new 'TomatosGateway',
          entityName: 'tomato'
          schema: App::TomatoRecord.schema
          endpoints: {
            changeColor: App::TomatosChangeColorEndpoint
          }
        @facade.registerProxy Module::Gateway.new 'AuthGateway',
          entityName: 'user'
          endpoints: {
            signin: App::AuthSigninEndpoint
            signout: App::AuthSignoutEndpoint
            whoami: App::AuthWhoamiEndpoint
          }
        #...
        return
```
 */

import type { GatewayInterface } from '../../interfaces/GatewayInterface';
import type { EndpointInterface } from '../../interfaces/EndpointInterface';
export type { JoiT } from '../../types/JoiT';


export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    ConfigurableMixin,
    initialize, module, meta, property, method, nameBy, mixin,
    Utils: { uuid }
  } = Module.NS;

  @initialize
  @mixin(ConfigurableMixin)
  @module(Module)
  class Gateway extends Module.NS.Proxy implements GatewayInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property _knownEndpoints: string[] = null;
    @property _schemas: { [key: string]: ?JoiT } = null;
    @property get _endpointsPath(): string {
      return `${this.ApplicationModule.NS.ROOT}/endpoints`;
    }

    @method tryLoadEndpoint(asName: string): ?EndpointInterface {
      if ([].indexOf.call(this._knownEndpoints, asName) >= 0) {
        const vsEndpointPath = `${this._endpointsPath}/${asName}`;
        try {
          return require(vsEndpointPath)(this.ApplicationModule);
        } catch (error) {
          throw (error);
        }
      }
    }

    @method getEndpointByName(asName: string): ?EndpointInterface {
      if (this.ApplicationModule.NS != null) {
        return this.ApplicationModule.NS[asName] != null ? this.ApplicationModule.NS[asName] : this.tryLoadEndpoint(asName);
      } else {
        return this.ApplicationModule.prototype[asName] != null ? this.ApplicationModule.prototype[asName] : this.tryLoadEndpoint(asName);
      }
    }

    @method getEndpointName(asResourse: string, asAction: string): string {
      const vsPath = `${asResourse}_${asAction}_endpoint`
        .replace(/\//g, '_')
        .replace(/\_+/g, '_');
      return inflect.camelize(vsPath);
    }

    @method getStandardActionEndpoint(asResourse: string, asAction: string): EndpointInterface {
      const vsEndpointName = `${inflect.camelize(asAction)}Endpoint`;
      if (this.ApplicationModule.NS != null) {
        return this.ApplicationModule.NS[vsEndpointName] ? this.ApplicationModule.NS[vsEndpointName] : this.ApplicationModule.prototype.Endpoint;
      } else {
        return this.ApplicationModule.prototype[vsEndpointName] ? this.ApplicationModule.prototype[vsEndpointName] : this.ApplicationModule.prototype.Endpoint;
      }
    }

    @method getEndpoint(asResourse: string, asAction: string): EndpointInterface {
      const vsEndpointName = this.getEndpointName(asResourse, asAction);
      return this.getEndpointByName(vsEndpointName) != null ? this.getEndpointByName(vsEndpointName) : this.getStandardActionEndpoint(asResourse, asAction);
    }

    @method swaggerDefinitionFor(asResourse: string, asAction: string, opts: ?object): EndpointInterface {
      const vcEndpoint = this.getEndpoint(asResourse, asAction);
      const options = assign({}, opts, {
        gateway: this
      });
      vcEndpoint.new(options);
    }

    @method getSchema(asRecordName: string): JoiT {
      if (this._schemas[asRecordName] == null) {
        this._schemas[asRecordName] = (this.ApplicationModule.NS != null ? this.ApplicationModule.NS : this.ApplicationModule.prototype)[asRecordName].schema;
        return this._schemas[asRecordName];
      }
    }

    constructor() {
      super(...arguments);
      this._schemas = {};
      const vPostfixMask = /\.(js|coffee)$/;
      const vlKnownEndpoints = () => {
        try {
          return filesListSync(this[ipsEndpointsPath]);
        } catch (error) {
          throw (error);
        }
      };
      if (vlKnownEndpoints != null) {
        this._knownEndpoints = vlKnownEndpoints
          .filter((asFileName) => {
            return vPostfixMask.test(asFileName)
          })
          .map((asFileName) => {
            return asFileName.replace(vPostfixMask, '')
          });
      } else {
        this._knownEndpoints = [];
      }
    }
  }
}

