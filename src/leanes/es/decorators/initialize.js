import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function initialize(acTarget) {
  assert(acTarget[cpoMetaObject] != null, 'Target for `initialize` decorator must be a Class');
  const { Proto, meta } = acTarget.Module.NS;
  acTarget.constructor = Proto;

  const vmWrapper = (BaseClass) => {
    class Wrapper extends BaseClass {
      @meta static object = {};
    }
    return Wrapper;
  }

  let Wrapped = null;

  if (acTarget.Module !== acTarget || acTarget.name === 'Module') {
    assert(acTarget.Module.isExtensible, `Module '${acTarget.Module.name}' has been frozen previously. Constant '${acTarget.name}' can not be declared`);

    Wrapped = vmWrapper(acTarget);
    Reflect.defineProperty(Wrapped, 'name', {
      value: acTarget.name
    })
    Wrapped.metaObject.parent = acTarget.metaObject;

    Reflect.defineProperty(acTarget.Module.prototype, Wrapped.name, {
      configurable: false,
      enumerable: true,
      writable: false,
      value: Wrapped
    });
    acTarget.Module.metaObject.addMetaData('constants', Wrapped.name, Wrapped);
  }

  acTarget.onInitialize();
  return Wrapped || acTarget;
};
