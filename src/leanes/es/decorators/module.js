import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function module(acModule) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `module` decorator must be a Class');
    Reflect.defineProperty(target, 'Module', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: acModule
    });
    return target;
  };
}
