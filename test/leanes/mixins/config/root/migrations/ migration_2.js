const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module:moduleD, nameBy, meta
} = LeanES.NS;

module.exports = function (Module) {
  @initialize
  @moduleD(Module)
  class Migration2 extends LeanES.NS.Migration {
    @nameBy static  __filename = 'Migration2';
    @meta static object = {};
  }
};
