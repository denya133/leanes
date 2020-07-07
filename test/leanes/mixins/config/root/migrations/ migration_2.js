const LeanES = require('../../../src/leanes/leanes/index');

module.exports = function (Module) {
  const Migration2 = (function () {
    class Migration2 extends LeanES.NS.Migration { };

    Migration2.inheritProtected();

    Migration2.module(Module);

    return Migration2;

  }).call(this);
  Migration2.initialize();
};
