const {expect, assert} = require('chai');
const LeanES = require.main.require('lib');
const {co, joi} = LeanES.prototype.Utils;
const NumberTransform = LeanES.prototype.NumberTransform;

describe('NumberTransform', () => {
  describe('.schema', () => {
     it('should has correct schema value', () => {
       expect(NumberTransform.schema).deep.equal(joi.number().allow(null).optional());
    });
  });
  describe('.normalize', () => {
    it('should normalize null value', () => {
      return co(function*() {
        assert.equal((yield NumberTransform.normalize(null)), null);
      });
    });
    it('should normalize boolean value', () => {
      return co(function*() {
        assert.equal((yield NumberTransform.normalize(true)), 1);
      });
    });
     it('should normalize number value', () => {
      return co(function*() {
        assert.equal((yield NumberTransform.normalize(1)), 1);
      });
    });
  });
  describe('.serialize', () => {
    it('should serialize null value', () => {
      return co(function*() {
        assert.equal((yield NumberTransform.serialize(null)), null);
      });
    });
    it('should serialize boolean value', () => {
      return co(function*() {
        assert.equal((yield NumberTransform.serialize(true)), 1);
      });
    });
     it('should serialize number value', () => {
      return co(function*() {
        assert.equal((yield NumberTransform.serialize(1)), 1);
      });
    });
  });
   describe('.objectize', () => {
    it('should objectize null value', () => {
       expect(NumberTransform.objectize(null)).to.be.null;
    });
    it('should objectize boolean value', () => {
       expect(NumberTransform.objectize(true)).to.equal(1);
    });
     it('should objectize number value', () => {
       expect(NumberTransform.objectize(1)).to.equal(1);
    });
  });
});