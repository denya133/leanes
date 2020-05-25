import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');
const cplExtensibles = Symbol.for('~isExtensible');
const cpsExtensibleSymbol = Symbol.for('~extensibleSymbol');


export default function meta(acTarget) {
  assert(acTarget[cpoMetaObject] != null, 'Target for `meta` decorator must be a Class');
  const { MetaObject } = acTarget.Module.prototype;
  const superclass = Reflect.getPrototypeOf(acTarget) || {};
  const parent = acTarget.metaObject || superclass.metaObject;
  Reflect.defineProperty(acTarget, cpoMetaObject, {
    enumerable: false,
    configurable: true,
    value: MetaObject.new(acTarget, parent)
  });
  Reflect.defineProperty(acTarget, cpsExtensibleSymbol, {
    enumerable: false,
    configurable: true,
    value: Symbol('extensibleSymbol')
  });
  acTarget[cplExtensibles][acTarget[cpsExtensibleSymbol]] = true;
  acTarget.onMetalize();

  return;
};
