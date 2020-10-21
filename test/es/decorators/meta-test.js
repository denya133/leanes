const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, nameBy, meta
} = LeanES.NS;

describe('meta', () => {
  describe('meta(acTarget)', () => {
    it('Target for `meta` decorator must be a Class', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta object = {};
        }
      }).to.throw(Error);
    });
    it('should decorator `meta` without error', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }
        const cplExtensibles = Symbol.for('~isExtensible');
        const cpsExtensibleSymbol = Symbol.for('~extensibleSymbol');
        assert.isTrue(Test[cplExtensibles][Test[cpsExtensibleSymbol]]);
      }).to.not.throw(Error);
    });
  });
});
