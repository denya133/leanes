import type { CollectionInterface } from '../../interfaces/CollectionInterface';
import type { RecordStaticInterface } from '../../interfaces/RecordStaticInterface';
import type { RecordInterface } from '../../interfaces/RecordInterface';
import type { ObjectizerInterface } from '../../interfaces/ObjectizerInterface';

export default (Module) => {
  const {
    CoreObject,
    initialize, partOf, meta, property, method, nameBy,
  } = Module.NS;


  @initialize
  @partOf(Module)
  class Objectizer<
    R = $Rest<RecordStaticInterface>, D = RecordInterface
  > extends CoreObject implements ObjectizerInterface<R, D> {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property collection: CollectionInterface<D> = null;

    @method async recoverize(
      acRecord: R,
      ahPayload: ?object
    ): Promise<?D> {
      if (ahPayload.type == null) {
        ahPayload.type = `${acRecord.moduleName()}::${acRecord.name}`;
      }
      return await acRecord.recoverize(ahPayload, this.collection);
    }

    @method async objectize(aoRecord: D, options: ?object = null): Promise<?object> {
      const vcRecord = aoRecord.constructor;
      return vcRecord.objectize(aoRecord, options);
    }

    @method static async restoreObject(acModule: Class<Module>, replica: object): Promise<ObjectizerInterface<R, D>> {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const Facade = acModule.NS.ApplicationFacade || acModule.NS.Facade;
        const facade = Facade.getInstance(replica.multitonKey);
        const collection = facade.retrieveProxy(replica.collectionName);
        return collection.objectizer;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: ObjectizerInterface<R, D>): Promise<object> {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance.collection._multitonKey;
      replica.collectionName = instance.collection.getProxyName();
      return replica;
    }

    constructor(collection: CollectionInterface<D>) {
      super(collection);
      this.collection = collection;
    }
  }
}
