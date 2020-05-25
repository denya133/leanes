import type { SerializerInterface } from '../../interfaces/SerializerInterface';
import type { CollectionInterface } from '../../interfaces/CollectionInterface';
import type { RecordInterface } from '../../interfaces/RecordInterface';
import type { TransformStaticInterface } from '../../interfaces/TransformStaticInterface';

export default (Module) => {
  const {
    CoreObject,
    initialize, module, meta, property, method, nameBy,
  } = Module.NS;


  @initialize
  @module(Module)
  class Serializer<
    D = RecordInterface
  > extends CoreObject implements SerializerInterface<D> {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property collection: CollectionInterface<D> = null;

    @method async normalize(acRecord: TransformStaticInterface, ahPayload: ?any): Promise<D> {
      (acRecord)
      return await acRecord.normalize(ahPayload, this.collection);
    }

    @method async serialize(aoRecord: ?D, options: ?object = null): Promise<?any> {
      const vcRecord: TransformStaticInterface = aoRecord.constructor;
      return await vcRecord.serialize(aoRecord, options);
    }

    @method static async restoreObject(acModule: Class<Module>, replica: object): Promise<SerializerInterface<D>> {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const Facade = acModule.NS.ApplicationFacade || acModule.NS.Facade;
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
