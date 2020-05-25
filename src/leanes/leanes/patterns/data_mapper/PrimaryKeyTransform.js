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
  class PrimaryKeyTransform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get schema(): JoiT {
      return joi.alternatives().try(joi.number(), joi.string()).allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized: ?string | number): ?string | number {
      return (_.isNil(serialized) ? null : serialized);
    }

    @method static serializeSync(deserialized: ?string | number): ?string | number {
      return (_.isNil(deserialized) ? null : deserialized);
    }

    @method static objectize(deserialized: ?string | number): ?string | number {
      if (_.isNil(deserialized)) {
        return null;
      } else {
        return deserialized;
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
