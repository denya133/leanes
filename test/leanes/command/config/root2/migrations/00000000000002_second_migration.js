const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module: moduleD, nameBy, meta
} = LeanES.NS;

module.exports = function(Module) {

  @initialize
  @moduleD(Module)
  class  SecondMigration extends Module.NS.TestMigration {
    @nameBy static __filename = ' SecondMigration';
    @meta static object = {};
  }
};
