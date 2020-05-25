import _ from 'lodash';
import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function property(target, key, descriptor) {
  const isClass = target[cpoMetaObject] != null;
  const vcClass = isClass ? target : target.constructor;
  const stringifyedKey = _.isSymbol(key)
    ? Symbol.keyFor(key)
    : key;
  assert(vcClass.isExtensible, `Class '${vcClass.name}' has been frozen previously. Property '${stringifyedKey}' can not be declared`);
  if (isClass) {
    vcClass.metaObject.mergeMetaData('classVariables', key, descriptor);
  } else {
    vcClass.metaObject.mergeMetaData('instanceVariables', key, descriptor);
  }
  return descriptor;
};
