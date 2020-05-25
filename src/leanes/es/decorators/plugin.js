import _ from 'lodash';
import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');
const slice = [].slice;


export default function plugin(... alPlugins) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `plugin` decorator must be a Module');
    const { Utils: { inflect } } = target.NS;
    const vlPlugins = _.castArray(alPlugins);
    vlPlugins.forEach((vmPlugin) => {
      assert(vmPlugin != null, 'Supplied plugin was not found');
      assert(_.isFunction(vmPlugin), 'Plugin must be a function');

      const [ filename, vmMixin ] = vmPlugin(target);
      const [ preLast, last ] = slice.call(filename.split('/'), -2);
      const pluginName = inflect.camelize(last !== 'index.js'
        ? last.split('.')[0]
        : preLast
      );

      Reflect.defineProperty(vmMixin, 'name', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: pluginName
      });
      target.metaObject.addMetaData('constants', pluginName, vmMixin);
      Reflect.defineProperty(target.prototype, pluginName, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: vmMixin
      });
      target.metaObject.addMetaData('plugins', pluginName, vmMixin);

      const SuperClass = Reflect.getPrototypeOf(target);
      const Mixin = vmMixin(SuperClass);
      Reflect.defineProperty(Mixin, 'name', {
        value: pluginName
      })

      Reflect.setPrototypeOf(target, Mixin);
      Reflect.setPrototypeOf(target.prototype, Mixin.prototype);

      target.metaObject.parent = Mixin.metaObject;
      target.metaObject.addMetaData('applyedMixins', pluginName, Mixin);
      (typeof Mixin.including === 'function') && Mixin.including.call(target);
      return target;
    });
  };
}
