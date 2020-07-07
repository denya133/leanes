const {expect, assert} = require('chai');
ES = require('ES');
const LeanES = require('../../../src/leanes/leanes/index');
const {co} = ES.NS.Utils;

describe('MemoryConfigurationMixin', () => {
   describe('defineConfigProperties', () => {
     it('should define configuration properties', () => {
       co(function*() {
        const Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(`${__dirname}/config/root`);

          Test.initialize();

          return Test;

        }).call(this);
        const TestConfiguration = (() => {
          class TestConfiguration extends LeanES.NS.Proxy {};

          TestConfiguration.inheritProtected();

          TestConfiguration.include(LeanES.NS.MemoryConfigurationMixin);

          TestConfiguration.module(Test);

          TestConfiguration.initialize();

          return TestConfiguration;

        }).call(this);
        const config = TestConfiguration.new('TEST_CONFIG', {
          test1: {
            description: 'test1 description',
            type: 'string',
            default: 'Test1'
          },
          test2: {
            description: 'test2 description',
            type: 'number',
            default: 42.42
          },
          test3: {
            description: 'test3 description',
            type: 'boolean',
            default: true
          },
          test4: {
            description: 'test4 description',
            type: 'integer',
            default: 42
          },
          test5: {
            description: 'test5 description',
            type: 'json',
            default: {
              test: 'test'
            }
          },
          test6: {
            description: 'test6 description',
            type: 'password',
            default: 'testpassword'
          }
        });
        config.defineConfigProperties();
        assert.propertyVal(config, 'test1', 'Test1');
        assert.propertyVal(config, 'test2', 42.42);
        assert.propertyVal(config, 'test3', true);
        assert.propertyVal(config, 'test4', 42);
        assert.deepPropertyVal(config, 'test5.test', 'test');
        assert.propertyVal(config, 'test6', 'testpassword');
      });
    });
  });
});
