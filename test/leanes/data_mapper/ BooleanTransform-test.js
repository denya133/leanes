const { expect, assert } = require('chai');
const LeanES = require('../../../src/leanes/leanes/index');
const { co, joi } = LeanES.NS.Utils;
const BooleanTransform = LeanES.NS.BooleanTransform;

describe('BooleanTransform', () => {
  describe('.schema', () => {
    it('should has correct schema value', () => {
      expect(BooleanTransform.schema).deep.equal(joi.boolean().allow(null).optional());
    });
  });
  describe('.normalize', () => {
    it('should deserialize null value', () => {
      co(function* () {
        assert.isFalse((yield BooleanTransform.normalize(null)));
      });
    });
    it('should deserialize boolean value', () => {
      co(function* () {
        assert.isTrue((yield BooleanTransform.normalize(true)));
      });
    });
    it('should deserialize string value', () => {
      co(function* () {
        assert.isTrue((yield BooleanTransform.normalize('True')));
      });
    });
    it('should deserialize number value', () => {
      co(function* () {
        assert.isTrue((yield BooleanTransform.normalize(1)));
      });
    });
  });
  describe('.serialize', () => {
    it('should serialize null value', () => {
      co(function* () {
        assert.isFalse((yield BooleanTransform.serialize(null)));
      });
    });
    it('should serialize boolean value', () => {
      co(function* () {
        assert.isTrue((yield BooleanTransform.serialize(true)));
      });
    });
    it('should serialize string value', () => {
      co(function* () {
        assert.isTrue((yield BooleanTransform.serialize('True')));
      });
    });
    it('should serialize number value', () => {
      co(function* () {
        assert.isTrue((yield BooleanTransform.serialize(1)));
      });
    });
  });
  describe('.objectize', () => {
    it('should objectize null value', () => {
      expect(BooleanTransform.objectize(null)).to.be.false;
    });
    it('should objectize boolean value', () => {
      expect(BooleanTransform.objectize(true)).to.be.true;
    });
    it('should objectize string value', () => {
      expect(BooleanTransform.objectize('True')).to.be.true;
    });
    it('should objectize number value', () => {
      expect(BooleanTransform.objectize(1)).to.be.true;
    });
  });
});