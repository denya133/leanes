import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function initializePatch(acTarget) {
  assert(acTarget[cpoMetaObject] != null, 'Target for `initializePatch` decorator must be a Class');
  const { Proto } = acTarget.Module.NS;
  acTarget.constructor = Proto;
  acTarget.onInitializePatch();
  return acTarget;
};
