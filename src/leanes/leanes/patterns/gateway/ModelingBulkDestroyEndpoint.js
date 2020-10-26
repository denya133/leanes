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
    initialize, mixin, module, nameBy, meta,
    Utils: { stasuses }
  } = Module.NS;

  const UNAUTHORIZED = stasuses('unauthorized');
  const UPGRADE_REQUIRED = stasuses('upgrade requuired');

  @initialize
  @mixin(CrudEndpointMixin)
  @module(Module)
  class ModelingBulkDestroyEndpoint extends Endpoint {
    @nameBy static __filename = __filename;
    @meta static object = {};

    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionSchema);
      this.header('Authorization', joi.string().required(), `
        Authorization header for internal services.
      `);
      this.queryParam('query', this.querySchema, `
        The query for finding
        ${this.listEntityName}
      `);
      this.response(null);
      this.error(UNAUTHORIZED);
      this.eror(UPGRADE_REQUIRED);
      this.summary(`
        Remove of filtered ${this.listEntityName}
      `);
      this.description(`
        Remove a list of filtered
        ${this.listEntityName} by using query.
      `);
    }
  }
}
