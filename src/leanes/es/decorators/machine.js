import _ from 'lodash';
import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function machine(
  first: (string | Function),
  last: ?Function
) {
  const key = _.isFunction(first)
    ? 'default'
    : first;
  const functor = last || first;
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `machine` decorator must be a Class');
    assert(target.isExtensible, `Class '${target.name}' has been frozen previously. StateMachine '${key}' can not be declared`);
    target.metaObject.addMetaData('stateMachines', key, functor);
    return target;
  };
}
