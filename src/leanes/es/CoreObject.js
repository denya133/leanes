// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

import type { RecoverableStaticInterface } from './interfaces/RecoverableStaticInterface';

// const indexOf = [].indexOf;
const slice = [].slice;
const hasProp = {}.hasOwnProperty;

var _class = null;

import MetaObjectTF from './MetaObject';

export default (NS) => {
  if (_class !== null) {
    return _class;
  }

  const {
    PRODUCTION, DEVELOPMENT, CLASS_KEYS, INSTANCE_KEYS,
    _, inflect, assert,
  } = NS.prototype;

  const MetaObject = MetaObjectTF(NS);

  const cpoMetaObject = Symbol.for('~metaObject');
  const cplExtensibles = Symbol.for('~isExtensible');
  const cpsExtensibleSymbol = Symbol.for('~extensibleSymbol');

  class CoreObject {
    static Module = NS;
    // Core class API
    // static get 'super'() {
    //   const SuperClass = Reflect.getPrototypeOf(this);
    //   const self = this;
    //   return new Proxy(SuperClass, {
    //     get: function(target, name, receiver) {
    //       // if (name === 'super') {
    //       //   throw new Error('Method `super` can not been called twice');
    //       // }
    //       const method = target[name];
    //       if (method == null) {
    //         return () => {};
    //       }
    //       if (typeof method !== "function") {
    //         throw new Error(`Descriptor \`${name}\` absent in class ${SuperClass.name} is not method`);
    //       }
    //       return method.bind(self);
    //     }
    //   });
    // }

    // get 'super'() {
    //   const SuperClass = Reflect.getPrototypeOf(this.constructor);
    //   const self = this;
    //   return new Proxy(SuperClass.prototype, {
    //     get: function(target, name, receiver) {
    //       // if (name === 'super') {
    //       //   throw new Error('Method `super` can not been called twice');
    //       // }
    //       const method = target[name];
    //       if (method == null) {
    //         return () => {};
    //       }
    //       if (typeof method !== "function") {
    //         throw new Error(`Descriptor \`${name}\` absent in class ${SuperClass.name}.prototype is not method`);
    //       }
    //       return method.bind(self);
    //     }
    //   });
    // }

    static wrap(lambda) {
      // const { caller } = arguments.callee;
      // const vcClass = caller.class || this;
      // const vsName = caller.name;
      const wrapper = function (...args) {
        return lambda.apply(this, args);
      };
      // Reflect.defineProperty(wrapper, 'class', {
      //   value: vcClass,
      //   enumerable: true
      // });
      // Reflect.defineProperty(lambda, 'class', {
      //   value: vcClass,
      //   enumerable: true
      // });
      // Reflect.defineProperty(wrapper, 'name', {
      //   value: vsName,
      //   configurable: true
      // });
      // Reflect.defineProperty(lambda, 'name', {
      //   value: vsName,
      //   configurable: true
      // });
      Reflect.defineProperty(lambda, 'wrapper', {
        value: wrapper,
        enumerable: true
      });
      Reflect.defineProperty(wrapper, 'body', {
        value: lambda,
        enumerable: true
      });
      return wrapper;
    }

    wrap(lambda) {
      // const { caller } = arguments.callee;
      // const vcClass = caller.class || this.constructor;
      // const vsName = caller.name;
      const wrapper = function (...args) {
        return lambda.apply(this, args);
      };
      // Reflect.defineProperty(wrapper, 'class', {
      //   value: vcClass,
      //   enumerable: true
      // });
      // Reflect.defineProperty(lambda, 'class', {
      //   value: vcClass,
      //   enumerable: true
      // });
      // Reflect.defineProperty(wrapper, 'name', {
      //   value: vsName,
      //   configurable: true
      // });
      // Reflect.defineProperty(lambda, 'name', {
      //   value: vsName,
      //   configurable: true
      // });
      Reflect.defineProperty(lambda, 'wrapper', {
        value: wrapper,
        enumerable: true
      });
      Reflect.defineProperty(wrapper, 'body', {
        value: lambda,
        enumerable: true
      });
      return wrapper;
    }

    static get metaObject() {
      return this[cpoMetaObject];
    }

    static new(...args) {
      return Reflect.construct(this, args);
    }

    static onMetalize() {
      return;
    }

    static onInitialize() {
      return;
    }

    static onInitializeMixin() {
      return;
    }

    // General class API

    get Module() {
      return this.constructor.Module;
    }

    static moduleName() {
      return this.Module.name;
    }

    moduleName() {
      return this.Module.name;
    }

    static superclass() {
      return Reflect.getPrototypeOf(this);
    }

    static class() {
      return this.constructor;
    }

    class() {
      return this.constructor;
    }

    static get patches() {
      return this.metaObject.getGroup('applyedPatches', false);
    }

    static get mixins() {
      return this.metaObject.getGroup('applyedMixins', false);
    }

    static get classMethods() {
      return this.metaObject.getGroup('classMethods', false);
    }

    static get instanceMethods() {
      return this.metaObject.getGroup('instanceMethods', false);
    }

    static get isExtensible() {
      return this[cplExtensibles][this[cpsExtensibleSymbol]];
    }

    static async restoreObject(acModule: Class<*>, replica: object): Promise<CoreObject> {
      assert(replica != null, "Replica cann`t be empty");
      assert(replica.class != null, "Replica type is required");
      assert((replica != null ? replica.type : void 0) === 'instance', `Replica type isn\`t \`instance\`. It is \`${replica.type}\``);

      let instance;
      if (replica.class === this.name) {
        instance = this.new();
      } else {
        const vcClass = acModule.prototype[replica.class];
        (vcClass: $Rest<RecoverableStaticInterface<acModule, CoreObject>>);
        instance = await vcClass.restoreObject(acModule, replica);
      }
      return instance;
    }

    static async replicateObject(aoInstance: CoreObject): Promise<object> {
      assert(aoInstance != null, "Argument cann`t be empty");
      const replica = {
        type: 'instance',
        class: aoInstance.constructor.name
      };
      return await replica;
    }

    // init(...args) {
    //   return;
    // }

    constructor() {
      // this.init(...args);
    }

  };

  Reflect.defineProperty(CoreObject, 'name', {get: ()=> 'CoreObject'});

  Reflect.defineProperty(CoreObject, cplExtensibles, {
    enumerable: false,
    configurable: false,
    value: {}
  });

  Reflect.defineProperty(CoreObject, cpoMetaObject, {
    enumerable: false,
    configurable: true,
    value: MetaObject.new(CoreObject)
  });

  Reflect.defineProperty(CoreObject, cpsExtensibleSymbol, {
    enumerable: false,
    configurable: true,
    value: Symbol('extensibleSymbol')
  });

  CoreObject[cplExtensibles][CoreObject[cpsExtensibleSymbol]] = true;

  _class = CoreObject;
  return CoreObject;
}
