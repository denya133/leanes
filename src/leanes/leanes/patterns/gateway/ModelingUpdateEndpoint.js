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
along with LeanRC. IF not, see <https://www.gnu.org/licenses/>.
*/

import type { GatewayInterface } from '../../interfaces/GatewayInterface';

export default (Module) => {
  const {
    Endpoint,
    CrudEndpointMixin,
    initialize, module, mixin, meta, nameBy,
    Utils: { statuses, joi }
  } = Module.NS;

  const HTTP_NOT_FOUND = statuses('not found');
  const HTTP_CONFLICT = statuses('conflict');
  const UNAUTHORIZED = statuses('unathorized');
  const UPGRADE_REQUIRED = statuses('upgrade required');

  @initialize
  @mixin(CrudEndpointMixin)
  @module(Module)
  class ModelingUpdateEndpoint extends Endpoint {
    @nameBy static __filename = __filename;
    @meta static object = {};

    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionSchema);
      this.header('Authorization', joi.string().required(), `
        Authorization header for internal services.
      `);
      this.body(this.itemSchema.required(), `
        The data to replace the
        ${this.itemEntityName} with.
      `);
      this.response(this.itemSchema, `
        The replaced ${this.itemEntityName}.
      `);
      this.error(HTTP_NOT_FOUND);
      this.error(HTTP_CONFLICT);
      this.error(UNAUTHORIZED);
      this.error(UPGRADE_REQUIRED);
      this.summary(`
        Replace the ${this.itemEntityName}.
      `);
      this.description(`
        Replaces an existing
        ${this.itemEntityName} with the
        request body and returns the new document.
      `);
    }
  }
}