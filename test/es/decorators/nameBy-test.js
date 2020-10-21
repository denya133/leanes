const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, nameBy, meta
} = LeanES.NS;

describe('nameBy', () => {
  describe('nameBy(target, key, descriptor)', () => {
    it('should add classname', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'TestName';
        @meta static object = {};
      }
      assert.equal(Test.name, 'TestName');
    });
    it('should add classname (fail with __filename = null', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = null;
          @meta static object = {};
        }
        assert.equal(Test.name, 'TestName');
      }).to.throw(Error);
    });
  });
});