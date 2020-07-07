const {assert} = require('chai');
ES = require('../../src/leanes/es/index');
const LeanES = require('../../../src/leanes/leanes/index');
const {co} = ES.NS.Utils;

describe('ConfigurableMixin', () => {
   describe('configs', () => {
     it('should create configuration instance', () => {
       co(function*() {
        const KEY = 'TEST_CONFIG_MIXIN_001';
        const facade = LeanES.NS.Facade.getInstance(KEY);
        const Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(`${__dirname}/config/root`);

          Test.initialize();

          return Test;

        }).call(this);
        const TestConfiguration = (() => {
          class TestConfiguration extends LeanES.NS.Configuration {};

          TestConfiguration.inheritProtected();

          TestConfiguration.module(Test);

          TestConfiguration.initialize();

          return TestConfiguration;

        }).call(this);
        facade.registerProxy(TestConfiguration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT));
        const TestConfigurable = (() => {
          class TestConfigurable extends LeanES.NS.Proxy {};

          TestConfigurable.inheritProtected();

          TestConfigurable.include(LeanES.NS.ConfigurableMixin);

          TestConfigurable.module(Test);

          TestConfigurable.initialize();

          return TestConfigurable;

        }).call(this);
        facade.registerProxy(object = TestConfigurable.new('TEST'));
        assert.deepPropertyVal(object, 'configs.test1', 'default');
        assert.deepPropertyVal(object, 'configs.test2', 42);
        assert.deepPropertyVal(object, 'configs.test3', true);
        assert.deepPropertyVal(object, 'configs.test4', 'test');
        facade.remove();
      });
    });
  });
});
