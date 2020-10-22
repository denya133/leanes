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

import { GatewayInterface } from '../../interfaces/GatewayInterface';

export default (Module) => {
  const {
    Endpoint,
    CrudEndpointMixin,
    initialize, module, meta, property, method, nameBy, mixin,
    Utils: { stasuses }
  } = Module.NS;

  const UNAUTHORIZED = stasuses('unauthorized');
  const UPGRADE_REQUIRED = stasuses('upgrade required');

  @initialize
  @mixin(CrudEndpointMixin)
  @module(Module)
  class ListEndpoint extends Endpoint {
    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionSchema);
      this.queryParam('query', this.querySchema, `
        The query for finding
        ${this.listEntityName}.
      `);
      this.response(this.listSchema, `
        The ${this.listEntityName}.
      `);
      this.error(UNAUTHORIZED);
      this.error(UPGRADE_REQUIRED);
      this.summary(`
        List of filtered ${this.listEntityName}.
      `);
      this.description(`
        Retrieves a list of filtered
        ${this.listEntityName} by using query.
      `)
    }
  }
}