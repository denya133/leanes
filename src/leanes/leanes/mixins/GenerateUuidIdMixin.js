

export default (Module) => {
  const {
    initializeMixin, meta, method,
    Utils: { uuid }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async generateId(): Promise<string> {
        return uuid.v4();
      }
    }
    return Mixin;
  });
}
