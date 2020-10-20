const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, initializeMixin, nameBy, meta
} = LeanES.NS;

describe('initializeMixin', () => {
  describe('initializeMixin(acTarget)', () => {
    it('Target for `initializeMixin` decorator must be a Class', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @initializeMixin test;
        }
      }).to.throw(Error);
    });
    it('should decorator `freeze` without error', () => {
      expect(() => {

        @initialize
        @initializeMixin
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }
      }).to.not.throw(Error);
    });
  });
});
