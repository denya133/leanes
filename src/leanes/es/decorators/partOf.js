import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function partOf(acModule) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `partOf` decorator must be a Class');
    Reflect.defineProperty(target, 'Module', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: acModule
    });
    return target;
  };
}
