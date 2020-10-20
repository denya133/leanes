const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  CoreObject,
  initialize, module: moduleD, nameBy, meta, decorator
} = LeanES.NS;

describe('decorator', () => {
  describe('decorator(target, key, descriptor)', () => {
    it('should add decorators in metaObject', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @decorator decorator = decorator;
        }
        assert.isOk(Test.metaObject.data.decorators);
      }).to.not.throw(Error);
    });
    it('Target for `decorator` decorator must be a Module.prototype(fail)', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        class SubTest {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @decorator decorator = decorator;
        }
      }).to.throw(Error);
    });
  });
});
