import _ from 'lodash';


export default function instanceOf(x, Type) {
  if (x == null) {
    return false;
  }
  switch (Type) {
    case String:
      return _.isString(x);
    case Number:
      return _.isNumber(x);
    case Boolean:
      return _.isBoolean(x);
    case Array:
      return _.isArray(x);
    case Object:
      return _.isPlainObject(x);
    case Date:
      return _.isDate(x);
    default:
      return (function(a) {
        while (a = a.__proto__) {
          if (a === Type.prototype) {
            return true;
          }
        }
        return false;
      })(x);
  }
}
