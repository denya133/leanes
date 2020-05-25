import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');
const cplExtensibles = Symbol.for('~isExtensible');
const cpsExtensibleSymbol = Symbol.for('~extensibleSymbol');


export default function freeze(acTarget) {
  assert(acTarget[cpoMetaObject] != null, 'Target for `freeze` decorator must be a Class');
  acTarget[cplExtensibles][acTarget[cpsExtensibleSymbol]] = false;
  return acTarget;
};
