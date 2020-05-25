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
  class BooleanTransform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get schema(): JoiT {
      return joi.boolean().allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized?: boolean | string | number): boolean {
      var type;
      type = typeof serialized;
      if (type === "boolean") {
        return serialized;
      } else if (type === "string") {
        return serialized.match(/^true$|^t$|^1$/i) !== null;
      } else if (type === "number") {
        return serialized === 1;
      } else {
        return false;
      }
    }

    @method static serializeSync(deserialized?: boolean | string | number): boolean {
      return Boolean(deserialized);
    }

    @method static objectize(deserialized?: boolean | string | number): boolean {
      return Boolean(deserialized);
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
