import type { JoiT } from '../../types/JoiT';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _, joi, moment }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class ArrayTransform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get schema(): JoiT {
      return joi.array().items(joi.any()).allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized: ?Array): Array {
      if (serialized == null) {
        return [];
      }
      const result = [];
      for (const item of serialized) {
        switch (false) {
          case !(_.isString(item) && moment(item, moment.ISO_8601).isValid()):
            result.push(Module.NS.DateTransform.normalizeSync(item));
            break;
          case !_.isString(item):
            result.push(Module.NS.StringTransform.normalizeSync(item));
            break;
          case !_.isNumber(item):
            result.push(Module.NS.NumberTransform.normalizeSync(item));
            break;
          case !_.isBoolean(item):
            result.push(Module.NS.BooleanTransform.normalizeSync(item));
            break;
          case !_.isPlainObject(item):
            result.push(Module.NS.ObjectTransform.normalizeSync(item));
            break;
          case !_.isArray(item):
            result.push(Module.NS.ArrayTransform.normalizeSync(item));
            break;
          default:
            result.push(Module.NS.Transform.normalizeSync(item));
        }
      }
      return result;
    }

    @method static serializeSync(deserialized: ?Array): Array {
      if (deserialized == null) {
        return [];
      }
      const result = [];
      for (const item of deserialized) {
        switch (false) {
          case !_.isString(item):
            result.push(Module.NS.StringTransform.serializeSync(item));
            break;
          case !_.isNumber(item):
            result.push(Module.NS.NumberTransform.serializeSync(item));
            break;
          case !_.isBoolean(item):
            result.push(Module.NS.BooleanTransform.serializeSync(item));
            break;
          case !_.isDate(item):
            result.push(Module.NS.DateTransform.serializeSync(item));
            break;
          case !_.isPlainObject(item):
            result.push(Module.NS.ObjectTransform.serializeSync(item));
            break;
          case !_.isArray(item):
            result.push(Module.NS.ArrayTransform.serializeSync(item));
            break;
          default:
            result.push(Module.NS.Transform.serializeSync(item));
        }
      }
      return result;
    }

    @method static objectize(deserialized: ?Array): Array {
      if (deserialized == null) {
        return [];
      }
      const result = [];
      for (const item of deserialized) {
        switch (false) {
          case !_.isString(item):
            result.push(Module.NS.StringTransform.objectize(item));
            break;
          case !_.isNumber(item):
            result.push(Module.NS.NumberTransform.objectize(item));
            break;
          case !_.isBoolean(item):
            result.push(Module.NS.BooleanTransform.objectize(item));
            break;
          case !_.isDate(item):
            result.push(Module.NS.DateTransform.objectize(item));
            break;
          case !_.isPlainObject(item):
            result.push(Module.NS.ObjectTransform.objectize(item));
            break;
          case !_.isArray(item):
            result.push(Module.NS.ArrayTransform.objectize(item));
            break;
          default:
            result.push(Module.NS.Transform.objectize(item));
        }
      }
      return result;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
