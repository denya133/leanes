import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function initializeMixin(acTarget) {
  assert(acTarget[cpoMetaObject] != null, 'Target for `initializeMixin` decorator must be a Class');
  const { Proto } = acTarget.Module.NS;
  acTarget.constructor = Proto;
  acTarget.onInitializeMixin();
  return acTarget;
};
