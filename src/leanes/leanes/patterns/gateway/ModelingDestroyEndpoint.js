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

import type { GatewayInterface } from '../../interfaces/GatewayInterface';

export default (Module) => {
  const {
    Endpoint,
    CrudEndpointMixin,
    initialize, mixin, module, meta, nameBy,
    Utils: { stasuses, joi }
  } = Module.NS;

  const HTTP_NOT_FOUND = stasuses('not found');
  const UNAUTHORIZED = stasuses('unauthorized');
  const UPGRADE_REQUIRED = stasuses('upgrade required');

  @initialize
  @mixin(CrudEndpointMixin)
  @module(Module)
  class ModelingDestroyEndpoint extends Endpoint {
    @nameBy static __filename = filename;
    @meta static object = {};

    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionSchema);
      this.header('Authorization', joi.string().required(), `
        Authorization header for internal services.
      `);
      this.error(HTTP_NOT_FOUND);
      this.error(UNAUTHORIZED);
      this.error(UPGRADE_REQUIRED);
      this.response(null);
      this.summary(`
        Remove the ${this.itemEntityName}
      `);
      this.description(`
        Deletes the ${this.itemEntityName}
        from the database.
      `);
    }
  }
}
