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

import type { GatewayInterface } from '../../interfaces/GatewayInterface';

export default (Module) => {
  const {
    Endpoint,
    CrudEndpointMxin,
    initialize, module, mixin, nameBy, meta,
    Utils: { statuses }
  } = Module.NS;

  const HTTP_NOT_FOUND = statuses('not found');
  const UNAUTHORIZED = statuses('unauthorized');
  const UPGRADE_REQUIRED = statuses('upgrade required');

  @initialize
  @mixin(CrudEndpointMxin)
  @module(Module)
  class DeleteEndpoint extends Endpoint {
    @nameBy static __filename = __filename;
    @meta static object = {};

    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionShema);
      this.error(HTTP_NOT_FOUND);
      this.error(UNAUTHORIZED);
      this.error(UPGRADE_REQUIRED);
      this.response(null);
      this.summary(`
        Hide a new ${this.itemEntityName}
      `);
      this.description(`
        Hide the ${this.itemEntityName}
        from the database.
      `);
    }
  }
}