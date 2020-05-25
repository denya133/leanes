import type { RelationConfigT } from '../types/RelationConfigT';
import type { RelationInverseT } from '../types/RelationInverseT';

export default (Module) => {
  const {
    initializeMixin, meta, property, method,
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      // Cucumber.inverseFor 'tomato' #-> {recordClass: App::Tomato, attrName: 'cucumbers', relation: 'hasMany'}
      @method static inverseFor(asAttrName: string): RelationInverseT {
        const opts = this.relations[asAttrName];
        const RecordClass = this.findRecordByName(opts.recordName.call(this));
        const { inverse: attrName } = opts;
        const { relation } = RecordClass.relations[attrName];
        return {
          recordClass: RecordClass,
          attrName,
          relation
        };
      }

      @property static get relations(): {[key: string]: RelationConfigT} {
        return this.metaObject.getGroup('relations', false);
      }
    }
    return Mixin;
  });
}
