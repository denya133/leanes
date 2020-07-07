const { expect, assert } = require('chai');
const sinon = require('sinon');
const LeanES = require('../../../src/leanes/leanes/index');
{ co, joi } = LeanES.NS.Utils;

StringTransform = LeanES.NS.StringTransform;

describe('StringTransform', () => {
  describe('.schema', () => {
    it('should has correct schema value', () => {
      expect(StringTransform.schema).deep.equal(joi.string().allow(null).optional());
    });
  });
  describe('.objectize', () => {
    it('should objectize null value', () => {
      expect(StringTransform.objectize(null)).to.be.null;
    });
    it('should objectize boolean value', () => {
      expect(StringTransform.objectize(true)).to.equal('true');
    });
    it('should objectize string value', () => {
      expect(StringTransform.objectize('True')).to.equal('True');
    });
    it('should objectize number value', () => {
      expect(StringTransform.objectize(1)).to.equal('1');
    });
  });
  // describe('.normalize', () => {
  //   it('should normalize null value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.normalize(null)), null);
  //     });
  //   });
  //   it('should normalize boolean value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.normalize(true)), 'true');
  //     });
  //   });
  //   it('should normalize string value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.normalize('True')), 'True');
  //     });
  //   });
  //   it('should normalize number value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.normalize(1)), '1');
  //     });
  //   });
  // });
  // describe('.serialize', () => {
  //   it('should serialize null value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.serialize(null)), null);
  //     });
  //   });
  //   it('should serialize boolean value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.serialize(true)), 'true');
  //     });
  //   });
  //   it('should serialize string value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.serialize('True')), 'True');
  //     });
  //   });
  //   it('should serialize number value', () => {
  //     co(function* () {
  //       assert.equal((yield StringTransform.serialize(1)), '1');
  //     });
  //   });
  // });
});
