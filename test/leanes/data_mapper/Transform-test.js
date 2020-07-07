const { expect, assert } = require('chai');
const sinon = require('sinon');
const LeanES = require('../../../src/leanes/leanes/index');
const { co, joi } = LeanES.NS.Utils;
const Transform = LeanES.NS.Transform;

describe('Transform', () => {
  describe('.schema', () => {
    it('should has correct schema value', () => {
      expect(Transform.schema).deep.equal(joi.any().allow(null).optional());
    });
  });
  describe('.objectize', () => {
    it('should objectize null value', () => {
      expect(Transform.objectize(null)).to.be.null;
    });
    it('should objectize boolean value', () => {
      expect(Transform.objectize(true)).to.be.true;
    });
    it('should objectize string value', () => {
      expect(Transform.objectize('True')).to.equal('True');
    });
    it('should objectize number value', () => {
      expect(Transform.objectize(1)).to.equal(1);
    });
  });
    // describe('.normalize', () => {
  //   it('should normalize null value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.normalize(null)), null);
  //     });
  //   });
  //   it('should normalize boolean value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.normalize(true)), true);
  //     });
  //   });
  //   it('should normalize string value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.normalize('True')), 'True');
  //     });
  //   });
  //   it('should normalize number value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.normalize(1)), 1);
  //     });
  //   });
  // });
  // describe('.serialize', () => {
  //   it('should serialize null value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.serialize(null)), null);
  //     });
  //   });
  //   it('should serialize boolean value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.normalize(true)), true);
  //     });
  //   });
  //   it('should serialize string value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.normalize('True')), 'True');
  //     });
  //   });
  //   it('should serialize number value', () => {
  //     co(function* () {
  //       assert.equal((yield Transform.normalize(1)), 1);
  //     });
  //   });
  // });
});
