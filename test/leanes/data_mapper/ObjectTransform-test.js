const { expect, assert } = require('chai');
const LeanES = require('../../../src/leanes/leanes/index');
const { co, joi } = LeanES.NS.Utils;
const ObjectTransform = LeanES.NS.ObjectTransform;

describe('ObjectTransform', () => {
  describe('.shema', () => {
    it('should has correct shema value', () => {
      expect(ObjectTransform.schema).deep.equal(joi.object().allow(null).optional());
    });
    it('shouls has correct validate null value', () => {
      expect(joi.validate(null, ObjectTransform.schema)).deep.equal({
        error: null,
        value: null
      });
    });
    it('should has correct validate empty object value', () => {
      expect(joi.validate({}, ObjectTransform.schema)).deep.equal({
        error: null,
        value: {}
      });
    });
    it('should has correct validate any object value', () => {
      expect(joi.validate({
        one: 1,
        two: true,
        three: 'three',
        four: new Date("2020-07-07T13:33:43.160Z")
      }, ObjectTransform.schema)).deep.equal({
        error: null,
        value: {
          one: 1,
          two: true,
          three: 'three',
          four: "2020-07-07T13:33:43.160Z"
        }
      });
    });
  });
  describe('.objectize', () => {
    it('should objectize null value', () => {
      expect(ObjectTransform.objectize(null)).deep.equal({});
    });
    it('should objectize empty object', () => {
      expect(ObjectTransform.objectize({})).deep.equal({});
    });
    it('should objectize simple object', () => {
      expect(ObjectTransform.objectize({
        one: 1,
        two: true,
        three: 'three',
        four: new Date("2020-07-07T13:33:43.160Z")
      })).deep.equal({
        one: 1,
        two: true,
        three: 'three',
        four: "2020-07-07T13:33:43.160Z"
      });
    });
    it('should objectize complex object', () => {
      expect(ObjectTransform.objectize({
        one: 1,
        two: {
          three: 'three'
        },
        four: [1, 2]
      })).deep.equal({
        one: 1,
        two: {
          three: 'three'
        },
        four: [1, 2]
      });
    });
  });
  describe('.normalize', () => {
    // it('should normalize null value', function () {
    //   co(function* () {
    //     assert.deepEqual((yield ObjectTransform.normalize(null)), {});
    //   });
    // });
    // it('should normalize empty object', function () {
    //   co(function* () {
    //     assert.deepEqual((yield ObjectTransform.normalize({})), {});
    //   });
    // });
    // it('should normalize simple object', function () {
    //   co(function* () {
    //     assert.deepEqual((yield ObjectTransform.normalize({
    //       one: 1,
    //       two: true,
    //       three: 'three',
    //       four: "2020-07-07T13:58:24.160Z"
    //     })), {
    //       one: 1,
    //       two: true,
    //       three: 'three',
    //       four: new Date("2020-07-07T13:58:24.160Z")
    //     });
    //   });
    // });
    //  it('should normalize complex object', function () {
    //   co(function* () {
    //     assert.deepEqual((yield ObjectTransform.normalize({
    //       one: 1,
    //       two: {
    //         three: 'three'
    //       },
    //       four: [1, 2]
    //     })), {
    //       one: 1,
    //       two: {
    //         three: 'three'
    //       },
    //       four: [1, 2]
    //     });
    //   });
    // });
  });
  describe('.serialize', () => {
    // describe('.serialize', function () {
    //   it('should serialize null value', function () {
    //     co(function* () {
    //       assert.deepEqual((yield ObjectTransform.serialize(null)), {});
    //     });
    //   });
    //   it('should serialize empty object', function () {
    //     co(function* () {
    //       assert.deepEqual((yield ObjectTransform.serialize({})), {});
    //     });
    //   });
    //   it('should serialize simple object', function () {
    //     co(function* () {
    //       assert.deepEqual((yield ObjectTransform.serialize({
    //         one: 1,
    //         two: true,
    //         three: 'three',
    //         four: new Date("2020-07-07T13:58:24.160Z")
    //       })), {
    //         one: 1,
    //         two: true,
    //         three: 'three',
    //         four: "2020-07-07T13:58:24.160Z"
    //       });
    //     });
    //   });
    //    it('should serialize complex object', function () {
    //     co(function* () {
    //       assert.deepEqual((yield ObjectTransform.serialize({
    //         one: 1,
    //         two: {
    //           three: 'three'
    //         },
    //         four: [1, 2]
    //       })), {
    //         one: 1,
    //         two: {
    //           three: 'three'
    //         },
    //         four: [1, 2]
    //       });
    //     });
    //   });
  });
});

