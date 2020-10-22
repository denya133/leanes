// This file is part of LeanRC.
//
// LeanRC is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanRC is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanRC.  If not, see <https://www.gnu.org/licenses/>.

import type { GatewayInterface } from '../../interfaces/GatewayInterface';
import type { EndpointInterface } from '../../interfaces/EndpointInterface';
export type { JoiT } from '../../types/JoiT';

export default (Module) => {
  const {
    CoreObject,
    initialize, module, meta, property, method, nameBy, mixin,
    Utils: { uuid }
  } = Module.NS;

  @initialize
  @module(Module)
  class Endpoint extends CoreObject implements EndpointInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property static keyNames: { [key: string]: ?string } = {};
    @property static itemEntityNames: { [key: string]: ?string } = {};
    @property static listEntityNames: { [key: string]: ?string } = {};
    @property static itemSchemas: { [key: string]: ?JoiT } = {};
    @property static listSchemas: { [key: string]: ?JoiT } = {};

    @property gateway: GatewayInterface;

    @property tags: ?array;
    @property headers: ?array;
    @property pathParams: ?array;
    @property queryParams: ?array;
    @property payload: ?object;
    @property responses: ?array;
    @property errors: ?array;
    @property title: ?string;
    @property synopsis: ?string;
    @property isDeprecated: boolean = false;

    @method tag(asName: string): EndpointInterface {
      if (this.tags == null) {
        this.tags = [];
      }
      this.tags.push(asName);
      return this;
    }

    @method header(name: string, schema: JoiT, description: ?string): EndpointInterface {
      if (this.headers == null) {
        this.headers = [];
      }
      this.headers.push({ name, schema, description });
      return this;
    }

    @method pathParam(name: string, schema: JoiT, description: ?string): EndpointInterface {
      if (this.pathParams == null) {
        this.pathParams = [];
      }
      this.pathParams.push({ name, schema, description });
      return this;
    }

    @method queryParam(name: string, schema: JoiT, description: ?string): EndpointInterface {
      if (this.queryParams == null) {
        this.queryParams = [];
      }
      this.queryParams.push({ name, schema, description });
      return this;
    }

    @method body(schema: JoiT, mimes: ?(array | string), description: ?string): EndpointInterface {
      this.payload = { schema, mimes, description };
      return this;
    }

    @method response(status: [number | string | JoiT], schema: ?(JoiT | string | array), mimes: ?(array | string), description: ?string): EndpointInterface {
      if (this.responses == null) {
        this.responses = [];
      }
      this.responses.push({ status, schema, mimes, description });
      return this;
    }

    @method error(status: number | string, description: ?string): EndpointInterface {
      if (this.errors == null) {
        this.errors = [];
      }
      this.errors.push({ status, description });
      return this;
    }

    @method summary(asSummary: string): EndpointInterface {
      this.title = asSummary;
      return this;
    }

    @method description(asDescription: string): EndpointInterface {
      this.synopsis = asDescription;
      return this;
    }

    @method deprecated(abDeprecated: boolean): EndpointInterface {
      this.isDeprecated = abDeprecated;
      return this;
    }

    @method static async restoreObject() {
      throw new Error(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      throw new Error(`replicateObject method not supported for ${this.name}`))
    }

    constructor() {
      super(...arguments);
      const [ options ] = args;
      { this.gateway } = options;
    }
  }
}