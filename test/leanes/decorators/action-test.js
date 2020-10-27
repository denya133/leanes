const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  CoreObject,
  initialize, partOf, nameBy, meta, action
} = LeanES.NS;

describe('action', () => {
  describe('action(target, key, descriptor)', () => {
    it('should add actions in metaObject', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class SubTest extends LeanES.NS.CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @action test() {}
        }
        assert.equal(SubTest.metaObject.parent.data.instanceMethods.test, SubTest.new().test);
        assert.equal(SubTest.metaObject.parent.data.actions.test, SubTest.new().test)
      }).to.not.throw(Error);
    });
    it('Decorator `action` may be used with instance methods only(fail)', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class SubTest extends LeanES.NS.CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @action static test() {}
        }
      }).to.throw(Error);
    });
  });
});
