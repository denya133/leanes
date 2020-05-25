import _ from 'lodash';
import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function mixin(...alMixins) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `mixin` decorator must be a Class');
    const vlMixins = _.castArray(alMixins);
    vlMixins.forEach((vmMixin) => {
      assert(vmMixin != null, 'Supplied mixin was not found');
      assert(_.isFunction(vmMixin), 'Mixin must be a function');

      const SuperClass = Reflect.getPrototypeOf(target);
      const Mixin = vmMixin(SuperClass);
      Reflect.defineProperty(Mixin, 'name', {
        value: vmMixin.name
      })

      Reflect.setPrototypeOf(target, Mixin);
      Reflect.setPrototypeOf(target.prototype, Mixin.prototype);

      target.metaObject.parent = Mixin.metaObject;
      target.metaObject.addMetaData('applyedMixins', Mixin.name, Mixin);
      (typeof Mixin.including === 'function') && Mixin.including.call(target);
    });
    return target;
  };
}
