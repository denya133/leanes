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

      @method async normalize(acRecord: TransformStaticInterface, ahPayload: ?any): Promise<RecordInterface> {
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
