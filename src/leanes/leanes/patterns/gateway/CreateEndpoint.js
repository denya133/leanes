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

  const HTTP_CONFLICT = statuses('conflict');
  const UNAUTHORIZED = statuses('unauthorized');
  const UPGRADE_REQUIRED = statuses('upgrade required');

  @initialize
  @mixin(CrudEndpointMxin)
  @module(Module)
  class CreateEndpoint extends Endpoint {
    @nameBy static __filename = __filename;
    @meta static object = {};

    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionShema);
      this.body(this.itemSchema.required(), `
        The ${this.itemEntityName} to create.
      `)
      this.response(201, this.itemSchema, `
        The created ${this.itemEntityName}.
      `);
      this.error(HTTP_CONFLICT, `
        The ${this.itemEntityName} already
        exists.
      `)
      this.error(UNAUTHORIZED);
      this.error(UPGRADE_REQUIRED);
      this.summary(`
        Create a new ${this.itemEntityName}
      `);
      this.description(`
        Creates a new ${this.itemEntityName}
        from the request body and
        returns the saved document.
      `);
    }
  }
}