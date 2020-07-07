LeanES = require('lib');

module.exports = function (Module) {
  const Migration3 = (function () {
    class Migration3 extends LeanES.NS.Migration { };

    Migration3.inheritProtected();

    Migration3.module(Module);

    return Migration3;

  }).call(this);
  Migration3.initialize();
};
