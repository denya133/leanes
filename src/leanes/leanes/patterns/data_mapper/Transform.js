export type { JoiT } from '../../types/JoiT';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, module, meta, method, nameBy,
    Utils: { joi }
  } = Module.NS;


  @initialize
  @module(Module)
  class Transform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method static schema(): JoiT {
      return joi.any().allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized: ?any): ?any {
      if (serialized == null) {
        return null;
      }
      return serialized;
    }

    @method static serializeSync(deserialized: ?any): ?any {
      if (deserialized == null) {
        return null;
      }
      return deserialized;
    }

    @method static objectize(deserialized: ?any): ?any {
      if (deserialized == null) {
        return null;
      }
      return deserialized;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
