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
  class NumberTransform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get schema(): JoiT {
      return joi.number().allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized: ?number): ?number {
      if (_.isNil(serialized)) {
        return null;
      } else {
        const transformed = Number(serialized);
        return (_.isNumber(transformed) ? transformed : null);
      }
    }

    @method static serializeSync(deserialized: ?number): ?number {
      if (_.isNil(deserialized)) {
        return null;
      } else {
        const transformed = Number(deserialized);
        return (_.isNumber(transformed) ? transformed : null);
      }
    }

    @method static objectize(deserialized: ?number): ?number {
      if (_.isNil(deserialized)) {
        return null;
      } else {
        const transformed = Number(deserialized);
        if (_.isNumber(transformed)) {
          return transformed;
        } else {
          return null;
        }
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
