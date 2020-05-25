import _ from 'lodash';

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export default function assign() {
  const target = _.head(arguments);
  if (_.isArray(target)) {
    const others = _.tail(arguments);
    return _.concat(target, ...others);
  } else {
    const args = _.slice(arguments);
    args.push(customizer);
    return _.mergeWith(...args);
  }
};
