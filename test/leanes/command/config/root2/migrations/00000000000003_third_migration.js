

export default (Module) => {
  const {
    initialize, module: moduleD, nameBy, meta, method
  } = Module.NS;

  @initialize
  @moduleD(Module)
  class ThirdMigration extends Module.NS.TestMigration {
    @nameBy static __filename = 'ThirdMigration';
    @meta static object = {};
    @method static change() {}
  }
}
