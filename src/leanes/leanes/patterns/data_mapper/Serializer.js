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

import type { SerializerInterface } from '../../interfaces/SerializerInterface';
import type { CollectionInterface } from '../../interfaces/CollectionInterface';
import type { RecordInterface } from '../../interfaces/RecordInterface';
import type { TransformStaticInterface } from '../../interfaces/TransformStaticInterface';

export default (Module) => {
  const {
    CoreObject,
    initialize, partOf, meta, property, method, nameBy,
  } = Module.NS;


  @initialize
  @partOf(Module)
  class Serializer<
    D = RecordInterface
  > extends CoreObject implements SerializerInterface<D> {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property collection: CollectionInterface<D> = null;

    @method async normalize(acRecord: $Rest<TransformStaticInterface>, ahPayload: ?any): Promise<D> {
      (acRecord)
      return await acRecord.normalize(ahPayload, this.collection);
    }

    @method async serialize(aoRecord: ?D, options: ?object = null): Promise<?any> {
      const vcRecord: $Rest<TransformStaticInterface> = aoRecord.constructor;
      return await vcRecord.serialize(aoRecord, options);
    }

    @method static async restoreObject(acModule: Class<Module>, replica: object): Promise<SerializerInterface<D>> {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const Facade = acModule.NS.Facade || acModule.NS.ApplicationFacade;
        const facade = Facade.getInstance(replica.multitonKey);
        const collection = facade.retrieveProxy(replica.collectionName);
        return collection.serializer;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: SerializerInterface<D>): Promise<object> {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance.collection._multitonKey;
      replica.collectionName = instance.collection.getProxyName();
      return replica;
    }

    constructor(collection: CollectionInterface<D>) {
      super(... arguments);
      this.collection = collection;
    }
  }
}
