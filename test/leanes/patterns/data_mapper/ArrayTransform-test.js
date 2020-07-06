const { expect, assert } = require('chai');
const LeanES = require.main.require('lib');
const { co, joi } = LeanES.prototype.Utils;
const ArrayTransform = LeanES.prototype.ArrayTransform;

describe('ArrayTransform', () => {
  describe('.schema', () => {
    it('should has correct schema value', () => {
      expect(ArrayTransform.schema).deep.equal(joi.array().items(joi.any()).allow(null).optional());
    });
    it('should has correct validate empty array value', () => {
      expect(joi.validate([], ArrayTransform.schema)).deep.equal({
        error: null,
        value: []
      });
    });
    it('should has correct validate any array value', () => {
      expect(joi.validate([
        1,
        true,
        'three',
        {
          four: "2020-07-06T12:52:43.160Z"
        }
      ], ArrayTransform.schema)).deep.equal({
        error: null,
        value: [
          1,
          true,
          'three',
          {
            four: "2020-07-06T12:52:43.160Z"
          }
        ]
      });
    });
  });
  describe('.normalize', () => {
    it('should normalize null value', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.normalize(null)), []);
      });
    });
    it('should normalize empty array', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.normalize([])), []);
      });
    });
    it('should normalize simple array', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.normalize([1, true, 'three', "2020-07-06T12:52:43.160Z"])), [1, true, 'three', new Date("2020-07-06T12:52:43.160Z")]);
      });
    });
    it('should normalize complex array', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.normalize(
          [
            1,
            { two: { three: 'three' } },
            [1, 2]
          ])),
          [
            1,
            { two: { three: 'three' } },
            [1, 2]
          ]);
      });
    });
  });
  describe('.serialize', () => {
    it('should serialize null value', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.serialize(null)), []);
      });
    });
    it('should serialize empty array', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.serialize([])), []);
      });
    });
    it('should serialize simple array', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.serialize([1, true, 'three', new Date("2018-06-05T12:52:43.160Z")])), [1, true, 'three', "2018-06-05T12:52:43.160Z"]);
      });
    });
    it('should serialize complex array', () => {
      return co(function* () {
        assert.deepEqual((yield ArrayTransform.serialize(
          [
            1,
            { two: { three: 'three' } },
            [1, 2]
          ])
        ),
          [
            1,
            { two: { three: 'three' } },
            [1, 2]
          ]
        );
      });
    });
  });
  describe('.objectize', () => {
    it('should objectize null value', () => {
      expect(ArrayTransform.objectize(null)).deep.equal([]);
    });
    it('should objectize empty array', () => {
      expect(ArrayTransform.objectize([])).deep.equal([]);
    });
    it('should objectize simple array', () => {
      expect(ArrayTransform.objectize([1, true, 'three', new Date("2018-06-05T12:52:43.160Z")])).deep.equal([1, true, 'three', "2018-06-05T12:52:43.160Z"]);
    });
    it('should objectize complex array', () => {
      expect(ArrayTransform.objectize(
        [
          1,
          { two: { three: 'three' } },
          [1, 2]
        ])).deep.equal(
          [
            1,
            { two: { three: 'three' } },
            [1, 2]
          ]
        );
    });
  });
});
