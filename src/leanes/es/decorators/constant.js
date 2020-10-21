import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');
const hasProp = {}.hasOwnProperty;


export default function constant(target, key, descriptor) {
  assert(target.constructor[cpoMetaObject] != null, 'Target for `constant` decorator must be a Module.prototype');
  assert(target.constructor.isExtensible, `Class '${target.constructor.name}' has been frozen previously. Constant '${key}' can not be declared`);

  // console.log('>>??? IN `constant` decorator', target.constructor.name, key);

  // const newDescriptor = Object.assign({}, descriptor);
  // newDescriptor.configurable = false;
  // newDescriptor.enumerable = true;
  // newDescriptor.writable = false;
  // return newDescriptor;
  let newDescriptor;
  if (hasProp.call(descriptor, 'get') || hasProp.call(descriptor, 'set')) {
    newDescriptor = {
      configurable: false,
      enumerable: true,
      get: descriptor.get,
      set: descriptor.set,
    };
    Reflect.defineProperty(target.constructor.prototype, key, newDescriptor);
    target.constructor.metaObject.addMetaData('constants', key, newDescriptor);
  } else {
    // const value = descriptor.value || descriptor.initializer && descriptor.initializer();
    newDescriptor = {
      configurable: false,
      enumerable: true,
      writable: false,
      value: (descriptor.value || descriptor.initializer())
    };
    // target.constructor.prototype[key] = (newDescriptor.value || newDescriptor.initializer());
    Reflect.defineProperty(target.constructor.prototype, key, newDescriptor);
    target.constructor.metaObject.addMetaData('constants', key, newDescriptor);
  }
  // console.log('>>??? END IN `constant` decorator', (newDescriptor.value || newDescriptor.initializer()), target.constructor.prototype, target.constructor.prototype[key]);
  return newDescriptor;
  // return;
};
