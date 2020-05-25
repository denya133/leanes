import _ from 'lodash';
import assign from './assign';

export default function copy(aObject) {
  if (_.isArray(aObject)) {
    return assign([], aObject);
  } else if (_.isObject(aObject)) {
    return assign({}, aObject);
  } else {
    return _.cloneDeep(aObject);
  }
}
