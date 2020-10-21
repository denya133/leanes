const { expect, assert } = require('chai');
const sinon = require("sinon");
const LeanES = require("../../../src/leanes/index.js").default;
const {
  CoreObject,
  initialize, module: moduleD, nameBy, meta
} = LeanES.NS;

describe('mixin', () => {
  describe('mixin(acModule)', () => {
    it('should add target', () => {
      const spySMConfig = sinon.spy(() => { });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class SubTest extends CoreObject {
        @nameBy static __filename = 'SubTest';
        @meta static object = {};
      }
      assert.equal(SubTest.metaObject.target.Module, Test);
    });
    it('Target for `module` decorator must be a Class(fail)', () => {
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        class SubTest extends CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @moduleD(Test) object = {}
        }
      }).to.throw(Error);
    });
  });
});