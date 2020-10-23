import type { JoiT } from '../../types/JoiT';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _, joi }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class DateTransform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get schema(): JoiT {
      return joi.date().iso().allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized: ?string): ?date {
      return (_.isNil(serialized) ? null : new Date(serialized));
    }

    @method static serializeSync(deserialized: ?date): ?string {
      if (_.isDate(deserialized) && !_.isNaN(deserialized)) {
        return deserialized.toISOString();
      } else {
        return null;
      }
    }

    @method static objectize(deserialized: ?date): ?string {
      if (_.isDate(deserialized) && !_.isNaN(deserialized)) {
        return deserialized.toISOString();
      } else {
        return null;
      }
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
