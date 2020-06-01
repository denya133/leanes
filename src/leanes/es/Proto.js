const hasProp = {}.hasOwnProperty;
// const indexOf = [].indexOf;

var _class = null;

import CoreObjectTF from './CoreObject';

export default (NS) => {
  if (_class !== null) {
    return _class;
  }

  const {
    _, CLASS_KEYS, INSTANCE_KEYS,
    meta, nameBy,
    assert,
  } = NS.prototype;

  // console.log('>>> IN Proto', meta, NS.__proto__, nameBy);

  const CoreObject = CoreObjectTF(NS);

  class Proto extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    static new(name, object) {
      const vClass = this.clone(CoreObject, {
        name,
        parent: CoreObject
      });
      const reserved_words = Object.keys(CoreObject);
      const ClassMethods = object.ClassMethods;
      for (const c_key in ClassMethods) {
        if (!hasProp.call(ClassMethods, c_key)) continue;
        if (!_.includes(reserved_words, c_key)) {
          vClass[c_key] = ClassMethods[c_key];
        }
      }
      const InstanceMethods = object.InstanceMethods;
      for (const i_key in InstanceMethods) {
        if (!hasProp.call(InstanceMethods, i_key)) continue;
        if (!_.includes(INSTANCE_KEYS, i_key)) {
          vClass.prototype[i_key] = InstanceMethods[i_key];
        }
      }
      if (object.Module != null) {
        vClass.Module = object.Module;
      }
      Reflect.setPrototypeOf(vClass.prototype, new CoreObject);
      return vClass;
    }

    static async restoreObject(acModule: Class<*>, replica: object): Promise<Proto> {
      assert(replica != null, "Replica cann`t be empty");
      assert(replica.class != null, "Replica type is required");
      assert((replica != null ? replica.type : void 0) === 'class', `Replica type isn\`t \`class\`. It is \`${replica.type}\``);
      return await acModule.prototype[replica.class];
    }

    static async replicateObject(acClass: Proto): Promise<object> {
      assert(acClass != null, "Argument cann`t be empty");
      const replica = {
        type: 'class',
        class: acClass.name
      };
      return await replica;
    }

    static clone(klass, options = {}) {
      assert(_.isFunction(klass), 'Not a constructor function');
      const SuperClass = Reflect.getPrototypeOf(klass);
      const definedParent = options.parent;
      const parent = definedParent || SuperClass || klass.prototype.constructor;
      const clone = class ClonedClass extends klass {};
      Reflect.defineProperty(clone, 'name', {
        value: options.name || klass.name
      });
      if (options.initialize) {
        if (typeof clone.initialize === "function") {
          clone.initialize(); // TODO: под вопросом
        }
      }
      return clone;
    }
  };

  Proto.constructor = Proto;
  // Reflect.defineProperty(Proto, 'name', {get: ()=> 'Proto'});
  _class = Proto;
  return Proto;
}
