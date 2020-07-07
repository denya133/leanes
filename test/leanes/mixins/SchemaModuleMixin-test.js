const {expect, assert} = require('chai');
const LeanES = require('../../../src/leanes/leanes/index');
const {co} = LeanES.NS.Utils;

describe('SchemaModuleMixin', () => {
   describe('.defineMigrations', () => {
     it('should create configuration instance', () => {
       co(function*() {
        const Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.include(LeanES.NS.SchemaModuleMixin);

          Test.root(`${__dirname}/config/root`);

          Test.defineMigrations();

          return Test;

        }).call(this);
        Test.initialize();
        assert.deepEqual(Test.NS.MIGRATION_NAMES, ['migration_1', 'migration_2', 'migration_3']);
        assert.instanceOf(Test.NS.Migration1.NS, LeanES.NS.Migration);
        assert.instanceOf(Test.NS.Migration2.NS, LeanES.NS.Migration);
        assert.instanceOf(Test.NS.Migration3.NS, LeanES.NS.Migration);
      });
    });
  });
});
