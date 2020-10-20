const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, nameBy, meta
} = LeanES.NS;

describe('initialize', () => {
  describe('initialize(acTarget)', () => {
    it('Target for `initialize` decorator must be a Class', () => {
      expect(() => {
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @initialize test;
        }
      }).to.throw(Error);
    });
    it('should decorator `initialize` without error', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }
      }).to.not.throw(Error);
    });
  });
});