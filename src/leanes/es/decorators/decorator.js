import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function decorator(target, key, descriptor) {
  assert(target.constructor[cpoMetaObject] != null, 'Target for `decorator` decorator must be a Module.prototype');
  assert(target.constructor.isExtensible, `Class '${target.constructor.name}' has been frozen previously. Decorator '${key}' can not be declared`);
  const newDescriptor = {
    configurable: false,
    enumerable: true,
    writable: false,
    value: (descriptor.value || descriptor.initializer())
  };
  Reflect.defineProperty(target.constructor.prototype, key, newDescriptor);
  target.constructor.metaObject.addMetaData('decorators', key, newDescriptor);
  // return newDescriptor;
  return;
};
