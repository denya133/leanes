const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module:moduleD, nameBy, meta
} = LeanES.NS;

module.exports = function (Module) {
  @initialize
  @moduleD(Module)
  class Migration1 extends LeanES.NS.Migration {
    @nameBy static  __filename = 'Migration1';
    @meta static object = {};
  }
};
