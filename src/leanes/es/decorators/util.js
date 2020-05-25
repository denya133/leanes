import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function util(target, key, descriptor) {
  assert(target.constructor[cpoMetaObject] != null, 'Target for `util` decorator must be a Module.prototype');
  assert(target.constructor.isExtensible, `Class '${target.constructor.name}' has been frozen previously. Util '${key}' can not be declared`);
  const newDescriptor = {
    configurable: false,
    enumerable: true,
    writable: false,
    value: (descriptor.value || descriptor.initializer())
  };
  Reflect.defineProperty(target.constructor.prototype, key, newDescriptor);
  target.constructor.metaObject.addMetaData('utilities', key, newDescriptor);
  // return newDescriptor;
  return;
};
