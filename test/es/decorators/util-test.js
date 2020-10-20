const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const moment = require('moment');
const {
  initialize, method, nameBy, meta, util
} = LeanES.NS;

describe('util', () => {
  describe('util(target, key, descriptor)', () => {
    it('should add utilities in metaObject', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @util moment = moment;
        }
      }).to.not.throw(Error);
    });
    it('should add utilities in metaObject(fail)', () => {
      expect(() => {

        @initialize
        class Test extends LeanES.NS.CoreObject {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @util test = 'test';
        }
      }).to.throw(Error);
    });
  });
});

