const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module:moduleD, nameBy, meta
} = LeanES.NS;

module.exports = function (Module) {
  @initialize
  @moduleD(Module)
  class Migration3 extends LeanES.NS.Migration {
    @nameBy static  __filename = 'Migration3';
    @meta static object = {};
  }
};
