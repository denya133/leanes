

export default (Module) => {
  const {
    initialize, module: moduleD, nameBy, meta, method
  } = Module.NS;

  @initialize
  @moduleD(Module)
  class Migration3 extends Module.NS.Migration {
    @nameBy static  __filename = 'Migration3';
    @meta static object = {};
    @method static change() {}
  }
}
