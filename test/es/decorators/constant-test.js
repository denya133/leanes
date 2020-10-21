const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, constant, nameBy, meta
} = LeanES.NS;

describe('constant', () => {
  describe('constant(target, key, descriptor)', () => {
    it('Target for `constant` decorator must be a Module.prototype', () => {
      expect(() => {

        @initialize
        class Test {
          @constant TEST = 'test';
        }
      }).to.throw(Error);
    });
    it('should decorator `constant` without error', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant TEST = 'test';
        }
        assert.isOk(Test.metaObject.data.constants.TEST);
        assert.equal(Test.metaObject.data.constants.TEST.initializer(), 'test');
      }).to.not.throw(Error);
    });
  });
});
