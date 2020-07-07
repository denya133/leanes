const { expect, assert } = require('chai');
ES = require('../../src/leanes/es/index');
const LeanES = require('../../../src/leanes/leanes/index');
const { co } = ES.NS.Utils;

describe('Configuration', () => {
  describe('environment', () => {
    it('should get environment name', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.initialize();

          return Test;

        }).call(this);
        Test.prototype.Configuration = (() => {
          class Configuration extends LeanES.NS.Configuration { };

          Configuration.inheritProtected();

          Configuration.module(Test);

          Configuration.initialize();

          return Configuration;

        }).call(this);
        const configuration = Test.prototype.Configuration.new(LeanES.NS.CONFIGURATION, Test.prototype.ROOT);
        const environment = configuration.environment;
        assert.isTrue(environment != null, 'configuration.environment isnt exist');
        assert.isTrue(environment === LeanES.NS.DEVELOPMENT || environment === LeanES.NS.PRODUCTION);
      });
    });
  });
  describe('defineConfigProperties', () => {
    it('should setup configuration instance', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.initialize();

          return Test;

        }).call(this);
        Test.prototype.Configuration = (() => {
          class Configuration extends LeanES.NS.Configuration { };

          Configuration.inheritProtected();

          Configuration.module(Test);

          Configuration.initialize();

          return Configuration;

        }).call(this);
        const configuration = Test.prototype.Configuration.new(LeanES.NS.CONFIGURATION, Test.prototype.ROOT);
        configuration.defineConfigProperties();
        assert.propertyVal(configuration, 'test1', 'default');
        assert.propertyVal(configuration, 'test2', 42);
        assert.propertyVal(configuration, 'test3', true);
        assert.propertyVal(configuration, 'test4', 'test');
      });
    });
  });
  describe('onRegister', () => {
    it('should initiate setup configuration instance', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.initialize();

          return Test;

        }).call(this);
        Test.prototype.Configuration = (() => {
          class Configuration extends LeanES.NS.Configuration { };

          Configuration.inheritProtected();

          Configuration.module(Test);

          Configuration.initialize();

          return Configuration;

        }).call(this);
        const configuration = Test.prototype.Configuration.new(LeanES.NS.CONFIGURATION, Test.prototype.ROOT);
        configuration.onRegister();
        assert.propertyVal(configuration, 'test1', 'default');
        assert.propertyVal(configuration, 'test2', 42);
        assert.propertyVal(configuration, 'test3', true);
        assert.propertyVal(configuration, 'test4', 'test');
      });
    });
  });
});
