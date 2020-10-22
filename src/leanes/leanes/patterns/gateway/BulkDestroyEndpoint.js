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

export default (Module) => {
  const {
    Endpoint,
    CrudEndpointMxin,
    initialize, module, meta, property, method, nameBy, mixin,
    Utils: { statuses }
  } = Module.NS;

  const UNAUTHORIZED = statuses('unauthorized');
  const UPGRADE_REQUIRED = statuses('upgrade required');

  @initialize
  @mixin(CrudEndpointMxin)
  @module(Module)
  class BulkDestroyEndpoint extends Endpoint {
    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionShema);
      this.queryParam('query', this.querySchema, `
        The query for finding
        ${this.listEntityName}.
      `);
      this.response(null);
      this.error(UNAUTHORIZED);
      this.error(UPGRADE_REQUIRED);
      this.summary(`
        Remove of filtered ${this.listEntityName}
      `);
      this.description(`
        Remove a list of filtered
        ${this.listEntityName} by using query.
      `);
    }
  }
