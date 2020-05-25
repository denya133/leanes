import type { JoiT } from '../../types/JoiT';

const hasProp = {}.hasOwnProperty;

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy,
    Utils: { _, joi, moment }
  } = Module.NS;


  @initialize
  @module(Module)
  class ObjectTransform extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get schema(): JoiT {
      return joi.object().allow(null).optional();
    }

    @method static async normalize(...args) {
      return this.normalizeSync(...args);
    }

    @method static async serialize(...args) {
      return this.serializeSync(...args);
    }

    @method static normalizeSync(serialized: ?object): object {
      if (serialized == null) {
        return {};
      }
      const result = {};
      for (const key in serialized) {
        if (!hasProp.call(serialized, key)) continue;
        const value = serialized[key];
        result[key] = (() => {
          switch (false) {
            case !(_.isString(value) && moment(value, moment.ISO_8601).isValid()):
              return Module.NS.DateTransform.normalizeSync(value);
            case !_.isString(value):
              return Module.NS.StringTransform.normalizeSync(value);
            case !_.isNumber(value):
              return Module.NS.NumberTransform.normalizeSync(value);
            case !_.isBoolean(value):
              return Module.NS.BooleanTransform.normalizeSync(value);
            case !_.isPlainObject(value):
              return Module.NS.ObjectTransform.normalizeSync(value);
            case !_.isArray(value):
              return Module.NS.ArrayTransform.normalizeSync(value);
            default:
              return Module.NS.Transform.normalizeSync(value);
          }
        })();
      }
      return result;
    }

    @method static serializeSync(deserialized: ?object): object {
      if (deserialized == null) {
        return {};
      }
      const result = {};
      for (const key in deserialized) {
        if (!hasProp.call(deserialized, key)) continue;
        const value = deserialized[key];
        result[key] = (() => {
          switch (false) {
            case !_.isString(value):
              return Module.NS.StringTransform.serializeSync(value);
            case !_.isNumber(value):
              return Module.NS.NumberTransform.serializeSync(value);
            case !_.isBoolean(value):
              return Module.NS.BooleanTransform.serializeSync(value);
            case !_.isDate(value):
              return Module.NS.DateTransform.serializeSync(value);
            case !_.isPlainObject(value):
              return Module.NS.ObjectTransform.serializeSync(value);
            case !_.isArray(value):
              return Module.NS.ArrayTransform.serializeSync(value);
            default:
              return Module.NS.Transform.serializeSync(value);
          }
        })();
      }
      return result;
    }

    @method static objectize(deserialized: ?object): object {
      if (deserialized == null) {
        return {};
      }
      const result = {};
      for (const key in deserialized) {
        if (!hasProp.call(deserialized, key)) continue;
        const value = deserialized[key];
        result[key] = (() => {
          switch (false) {
            case !_.isString(value):
              return Module.NS.StringTransform.objectize(value);
            case !_.isNumber(value):
              return Module.NS.NumberTransform.objectize(value);
            case !_.isBoolean(value):
              return Module.NS.BooleanTransform.objectize(value);
            case !_.isDate(value):
              return Module.NS.DateTransform.objectize(value);
            case !_.isPlainObject(value):
              return Module.NS.ObjectTransform.objectize(value);
            case !_.isArray(value):
              return Module.NS.ArrayTransform.objectize(value);
            default:
              return Module.NS.Transform.objectize(value);
          }
        })();
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
