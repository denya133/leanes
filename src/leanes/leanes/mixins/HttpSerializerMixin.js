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

import type { RecordInterface } from '../interfaces/RecordInterface';
import type { TransformStaticInterface } from '../interfaces/TransformStaticInterface';

export default (Module) => {
  const {
    initializeMixin, meta, method,
    Utils: { _, inflect }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async normalize(acRecord: $Rest<TransformStaticInterface>, ahPayload: ?any): Promise<RecordInterface> {
        if (_.isString(ahPayload)) {
          ahPayload = JSON.parse(ahPayload);
        }
        return await acRecord.normalize(ahPayload, this.collection);
      }

      @method async serialize(aoRecord: ?RecordInterface, options: ?object = null): Promise<?any> {
        const vcRecord = aoRecord.constructor;
        const recordName = vcRecord.name.replace(/Record$/, '');
        const singular = inflect.singularize(inflect.underscore(recordName));
        return {
          [`${singular}`]: await vcRecord.serialize(aoRecord, options)
        };
      }
    }
    return Mixin;
  });
}
