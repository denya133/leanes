import _ from 'lodash';
import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function patch(...alPatches) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `patch` decorator must be a Class');
    assert(target.Module !== target, 'Target for `patch` decorator can not be a Module or its subclass');
    const vlPatches = _.castArray(alPatches);
    vlPatches.forEach((vmPatch) => {
      assert(vmPatch != null, 'Supplied patch was not found');
      assert(_.isFunction(vmPatch), 'Patch must be a function');

      const SuperClass = Reflect.getPrototypeOf(target);
      const Patch = vmPatch(SuperClass);
      Reflect.defineProperty(Patch, 'name', {
        value: vmPatch.name
      })

      Reflect.setPrototypeOf(target, Patch);
      Reflect.setPrototypeOf(target.prototype, Patch.prototype);

      target.metaObject.parent = Patch.metaObject;
      target.metaObject.addMetaData('applyedPatches', Patch.name, Patch);
      (typeof Patch.including === 'function') && Patch.including.call(target);
      return target;
    });
  };
}
