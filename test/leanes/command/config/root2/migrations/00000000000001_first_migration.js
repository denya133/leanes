const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module: moduleD, nameBy, meta
} = LeanES.NS;

module.exports = function(Module) {

  @initialize
  @moduleD(Module)
  class FirstMigration extends Module.NS.TestMigration {
    @nameBy static __filename = 'FirstMigration';
    @meta static object = {};
  }
};
