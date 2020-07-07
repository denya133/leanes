const { expect, assert } = require('chai');
const LeanES = require('../../../src/leanes/leanes/index');
const { co, joi } = LeanES.NS.Utils;
const DateTransform = LeanES.NS.DateTransform;

describe('DateTransform', () => {
  describe('.schema', () => {
    it('should has correct schema value', () => {
      expect(DateTransform.schema).deep.equal(joi.date().iso().allow(null).optional());
    });
  });
  describe('.normalize', () => {
    it('should deserialize null value', () => {
      co(function* () {
        assert.equal((yield DateTransform.normalize(null)), null);
      });
    });
    it('should deserialize date value', () => {
      co(function* () {
        const date = new Date();
        assert.deepEqual((yield DateTransform.normalize(date.toISOString())), date);
      });
    });
    it('should deserialize boolean value', () => {
      co(function* () {
        assert.deepEqual((yield DateTransform.normalize(true)), new Date(1));
      });
    });
    it('should deserialize string value', () => {
      co(function* () {
        assert.deepEqual((yield DateTransform.normalize('True')), new Date(''));
      });
    });
    it('should deserialize number value', () => {
      co(function* () {
        assert.deepEqual((yield DateTransform.normalize(1)), new Date(1));
      });
    });
  });
  describe('.serialize', () => {
    it('should serialize null value', () => {
      co(function* () {
        assert.equal((yield DateTransform.serialize(null)), null);
      });
    });
    it('should serialize date value', () => {
      co(function* () {
        const date = new Date();
        assert.equal((yield DateTransform.serialize(date)), date.toISOString());
      });
    });
    it('should serialize boolean value', () => {
      co(function* () {
        assert.equal((yield DateTransform.serialize(true)), null);
      });
    });
    it('should serialize string value', () => {
      co(function* () {
        assert.equal((yield DateTransform.serialize('True')), null);
      });
    });
    it('should serialize number value', () => {
      co(function* () {
        assert.equal((yield DateTransform.serialize(1)), null);
      });
    });
  });
  describe('.objectize', () => {
    it('should objectize null value', () => {
      expect(DateTransform.objectize(null)).to.be.null;
    });
    it('should objectize date value', () => {
      const date = new Date();
      expect(DateTransform.objectize(date)).to.eql(date.toISOString());
    });
    it('should objectize boolean value', () => {
      expect(DateTransform.objectize(true)).to.be.null;
    });
    it('should objectize string value', () => {
      expect(DateTransform.objectize('True')).to.be.null;
    });
    it('should objectize number value', () => {
      expect(DateTransform.objectize(1)).to.be.null;
    });
  });
});
