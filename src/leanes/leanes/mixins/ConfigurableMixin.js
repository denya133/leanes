

export default (Module) => {
  const {
    CONFIGURATION,
    initializeMixin, meta, property
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property get configs(): object {
        return this.facade.getProxy(CONFIGURATION);
      }
    }
    return Mixin;
  });
}
