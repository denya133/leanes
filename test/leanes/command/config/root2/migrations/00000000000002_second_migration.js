

export default (Module) => {
  const {
    initialize, module: moduleD, nameBy, meta, method
  } = Module.NS;

  @initialize
  @moduleD(Module)
  class SecondMigration extends Module.NS.TestMigration {
    @nameBy static __filename = 'SecondMigration';
    @meta static object = {};
    @method static change() {}
  }
}
