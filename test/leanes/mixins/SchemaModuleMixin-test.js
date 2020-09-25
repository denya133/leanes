const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module:moduleD, nameBy, resolver, meta, attribute, mixin, constant
} = LeanES.NS;
describe('SchemaModuleMixin', () => {
   describe('.defineMigrations', () => {
     it('should create configuration instance', () => {

     @initialize
     @mixin(LeanES.NS.SchemaModuleMixin)
     class Test extends LeanES {
       @nameBy static  __filename = 'Test';
       @meta static object = {};
       @constant ROOT = `${__dirname}/config/root`;
     }
      assert.deepEqual(Test.NS.MIGRATION_NAMES, ['migration_1', 'migration_2', 'migration_3']);
      assert.instanceOf(Test.NS.Migration1.NS, LeanES.NS.Migration);
      assert.instanceOf(Test.NS.Migration2.NS, LeanES.NS.Migration);
      assert.instanceOf(Test.NS.Migration3.NS, LeanES.NS.Migration);
    });
  });
});
