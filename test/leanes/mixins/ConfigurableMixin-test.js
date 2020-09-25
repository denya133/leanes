const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module:moduleD, nameBy, meta, method, property, mixin, attribute, constant
} = LeanES.NS;

describe('ConfigurableMixin', () => {
   describe('configs', () => {
     it('should create configuration instance', () => {
      const KEY = 'TEST_CONFIG_MIXIN_001';
      const facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @moduleD(Test)
      class TestConfiguration extends LeanES.NS.Configuration {
        @nameBy static  __filename = 'TestConfiguration';
        @meta static object = {};
      }
      facade.registerProxy(TestConfiguration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT));

      @initialize
      @mixin(LeanES.NS.ConfigurableMixin)
      @moduleD(Test)
      class TestConfigurable extends LeanES.NS.Proxy {
        @nameBy static  __filename = 'TestConfigurable';
        @meta static object = {};
      }
      const object = TestConfigurable.new('TEST');
      facade.registerProxy(object);
      assert.deepPropertyVal(object, 'configs.test1', 'default');
      assert.deepPropertyVal(object, 'configs.test2', 42);
      assert.deepPropertyVal(object, 'configs.test3', true);
      assert.deepPropertyVal(object, 'configs.test4', 'test');
      facade.remove();
    });
  });
});
