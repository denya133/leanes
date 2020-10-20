const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Record,
  initialize, module: moduleD, nameBy, meta, constant, mixin, method, hasOne, relatedTo
} = LeanES.NS;

describe('RelationsMixin', () => {
  describe('.new', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create item with record mixin', () => {
      expect(() => {
        const collectionName = 'TestsCollection';
        const KEY = 'TEST_RELATIONS_MIXIN_001';
        facade = LeanES.NS.Facade.getInstance(KEY);

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant ROOT = `${__dirname}/../command/config`;
        }

        @initialize
        @mixin(LeanES.NS.MemoryCollectionMixin)
        @mixin(LeanES.NS.GenerateUuidIdMixin)
        @moduleD(Test)
        class TestsCollection extends Test.NS.Collection {
          @nameBy static __filename = 'TestsCollection';
          @meta static object = {};
        }

        @initialize
        @mixin(LeanES.NS.RelationsMixin)
        @moduleD(Test)
        class TestRecord extends LeanES.NS.Record {
          @nameBy static __filename = 'TestRecord';
          @meta static object = {};
          @method static findRecordByName() {
            return TestRecord;
          }
        }
        const collection = TestsCollection.new(collectionName, {
          delegate: 'TestRecord'
        });
        facade.registerProxy(collection);
        const record = TestRecord.new({
          type: 'Test::TestRecord'
        }, collection);
        assert.instanceOf(record, TestRecord, 'record is not a TestRecord instance')
      }).to.not.throw(Error);
    });
  });
  describe('.inverseFor', () => {
    it('should get inverse info', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.RelationsMixin)
      @moduleD(Test)
      class RelationRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'RelationRecord';
        @meta static object = {};
        @method static findRecordByName() {
          return TestRecord;
        }
        @hasOne test = {
          inverse: 'relation_attr'
        }
      }

      @initialize
      @mixin(LeanES.NS.RelationsMixin)
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @method static findRecordByName() {
          return TestRecord;
        }
        @relatedTo relation = {
          attr: 'relation_attr',
          refKey: 'id',
          inverse: 'test'
        }
      }
      const inverseInfo = TestRecord.inverseFor('relation');
      assert.equal(inverseInfo.recordClass, RelationRecord, 'Record class is incorrect');
      assert.equal(inverseInfo.attrName, 'test', 'Record class is incorrect');
      assert.equal(inverseInfo.relation, 'hasOne', 'Record class is incorrect');
    });
  });
});