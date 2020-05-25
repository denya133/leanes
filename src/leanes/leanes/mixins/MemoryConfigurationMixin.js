const hasProp = {}.hasOwnProperty;


export default (Module) => {
  const {
    assert,
    initializeMixin, meta, property, method,
    Utils: { _, assign }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property get ROOT(): string {
        return this.Module.prototype.ROOT;
      }

      @method defineConfigProperties() {
        // const manifestPath = `${this.ROOT}/../manifest.json`;
        // const manifest = require(manifestPath);
        const manifestPath = './manifest.json';
        const manifest = this.ApplicationModule.require(manifestPath);
        console.log('>?>?>??? MemoryConfigurationMixin manifest', manifestPath, manifest);
        this._name = manifest.name;
        this._description = manifest.description;
        this._license = manifest.license;
        this._version = manifest.version;
        this._keywords = manifest.keywords;
        const configFromManifest = manifest.configuration;
        const configs = assign({}, configFromManifest, this.getData());
        for (const key in configs) {
          if (!hasProp.call(configs, key)) continue;
          const value = configs[key];
          ((attr, config) => {
            assert(config.description != null, 'Description in config definition is required');
            assert(!config.required || (config.default != null), `Attribute '${attr}' is required in config`);
            assert(config.type != null, 'Type in config definition is required');
            switch (config.type) {
              case 'string':
                assert(_.isString(config.default), `Default for '${attr}' must be string`);
                break;
              case 'number':
                assert(_.isNumber(config.default), `Default for '${attr}' must be number`);
                break;
              case 'boolean':
                assert(_.isBoolean(config.default), `Default for '${attr}' must be boolean`);
                break;
              case 'integer':
                assert(_.isInteger(config.default), `Default for '${attr}' must be integer`);
                break;
              case 'json':
                assert(_.isString(config.default), `Default for '${attr}' must be JSON string`);
                try {
                  JSON.parse(config.default);
                } catch (error) {
                  assert.fail(`Default for '${attr}' is not valid JSON`);
                }
                break;
              case 'password':
                assert(_.isString(config.default), `Default for '${attr}' must be string`)
            }
            Reflect.defineProperty(this, attr, {
              enumerable: true,
              configurable: true,
              writable: false,
              value: config.default
            });
          })(key, value);
        }
      }
    }
    return Mixin;
  });
}
