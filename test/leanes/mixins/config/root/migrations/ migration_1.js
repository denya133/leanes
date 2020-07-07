LeanES = require.main.require('lib');

module.exports = function (Module) {
  const Migration1 = (function () {
    class Migration1 extends LeanES.NS.Migration { };

    Migration1.inheritProtected();

    Migration1.module(Module);

    return Migration1;

  }).call(this);
  Migration1.initialize();
};
