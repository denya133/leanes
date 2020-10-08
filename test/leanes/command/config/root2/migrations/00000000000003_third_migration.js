const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module: moduleD, nameBy, meta
} = LeanES.NS;

module.exports = function(Module) {

  @initialize
  @moduleD(Module)
  class  ThirdMigration extends Module.NS.TestMigration {
    @nameBy static __filename = ' ThirdMigration';
    @meta static object = {};
  }
};
