import type { JoiT } from '../../types/JoiT';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy,
    Utils: { _, joi }
  } = Module.NS;


  @initialize
  @module(Module)
  class StringTransform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get schema(): JoiT {
      return joi.string().allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized: ?string): ?string {
      return (_.isNil(serialized) ? null : String(serialized));
    }

    @method static serializeSync(deserialized: ?string): ?string {
      return (_.isNil(deserialized) ? null : String(deserialized));
    }

    @method static objectize(deserialized: ?string): ?string {
      if (_.isNil(deserialized)) {
        return null;
      } else {
        return String(deserialized);
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
