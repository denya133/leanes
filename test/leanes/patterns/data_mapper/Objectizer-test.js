const { expect, assert } = require('chai');
const LeanES = require.main.require('lib');

const {
  FuncG,
  SubsetG,
  RecordInterface,
  Objectizer,
  Utils: { co }
} = LeanES.prototype;

describe('Objectizer', () => {
  describe('#recoverize', () => {
    it("should recoverize object value", () => {
      return co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();
          Test.initialize();

          return Test;
        }).call(this);
        const TestsCollection = (() => {
          class TestsCollection extends LeanES.prototype.Collection { };

          TestsCollection.inheritProtected();
          TestsCollection.module(Test);
          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);

        Test.prototype.TestRecord = (() => {
          class TestRecord extends LeanES.prototype.Record {};

          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.public(TestRecord.static({
            findRecordByName: FuncG(String, SubsetG(RecordInterface))
          }, {
            default: function (asType) {
              return Test.prototype.TestRecord;
            }
          }));

          TestRecord.attribute({
            string: String
          });
          TestRecord.attribute({
            number: Number
          });
          TestRecord.attribute({
            boolean: Boolean
          });
          TestRecord.initialize();

          return TestRecord;

        }).call(this);

        const objectizer= Objectizer.new(TestsCollection.new('Tests', {
          delegate: 'TestRecord'
        }));
        const record = (yield objectizer.recoverize(Test.prototype.TestRecord, {
          type: 'Test::TestRecord',
          string: 'string',
          number: 123,
          boolean: true
        }));

        assert.instanceOf(record, Test.prototype.TestRecord, 'Recoverize is incorrect');
        assert.equal(record.type, 'Test::TestRecord', '`type` is incorrect');
        assert.equal(record.string, 'string', '`string` is incorrect');
        assert.equal(record.number, 123, '`number` is incorrect');
        assert.equal(record.boolean, true, '`boolean` is incorrect');
      });
    });
  });
  describe('#objectize', () => {
    it("should objectize Record.prototype value", () => {
      return co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();
          Test.initialize();

          return Test;

        }).call(this);
        const TestsCollection = (() => {
          class TestsCollection extends LeanES.prototype.Collection { };

          TestsCollection.inheritProtected();
          TestsCollection.module(Test);
          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        Test.prototype.TestRecord = (() => {
          class TestRecord extends LeanES.prototype.Record { };

          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.public(TestRecord.static({
            findRecordByName: FuncG(String, SubsetG(RecordInterface))
          }, {
            default: function (asType) {
              return Test.prototype.TestRecord;
            }
          }));
          TestRecord.attribute({
            string: String
          });
          TestRecord.attribute({
            number: Number
          });
          TestRecord.attribute({
            boolean: Boolean
          });
          TestRecord.initialize();

          return TestRecord;

        }).call(this);

        const col = TestCollection.new('Tests', {
          delegate: 'TestRecord'
        });

        const objectizer = Objectizer.new(col);
        const data = (yield objectizer.objectize(Test.prototype.TestRecord.new({
          type: 'Test::TestRecord',
          string: 'string',
          number: 123,
          boolean: true
        }, col)));

        assert.instanceOf(data, Object, 'Objectize is incorrect');
        assert.equal(data.type, 'Test::TestRecord', '`type` is incorrect');
        assert.equal(data.string, 'string', '`string` is incorrect');
        assert.equal(data.number, 123, '`Number` is incorrect');
        assert.equal(data.boolean, true, '`Boolean` is incorrect');
      });
    });
  });
  describe('.replicateObject', () => {
    const facade = null;
    const KEY = 'TEST_SERIALIZER_001';
    after(() => {
      return facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create replica for objectizer', () => {
      return co(function* () {
        facade = LeanES.prototype.Facade.getInstance(KEY);
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        const MyCollection = (() => {
          class MyCollection extends LeanES.prototype.Collection { };

          MyCollection.inheritProtected();
          MyCollection.include(LeanES.prototype.MemoryCollectionMixin);
          MyCollection.include(LeanES.prototype.GenerateUuidIdMixin);
          MyCollection.module(Test);

          return MyCollection;

        }).call(this);
        MyCollection.initialize();
        const MyObjectizer = (() => {
          class MyObjectizer extends LeanES.prototype.Objectizer { };

          MyObjectizer.inheritProtected();
          MyObjectizer.module(Test);

          return MyObjectizer;

        }).call(this);
        MyObjectizer.initialize();
        const COLLECTION = 'COLLECTION';
        const collection = facade.registerProxy(MyCollection.new(COLLECTION, {
          delegate: Test.prototype.Record,
          objectizer: MyObjectizer
        }));
        collection = facade.retrieveProxy(COLLECTION);
        const replica = (yield MyObjectizer.replicateObject(collection.objectizer));
        assert.deepEqual(replica, {
          type: 'instance',
          class: 'MyObjectizer',
          multitonKey: KEY,
          collectionName: COLLECTION
        });
      });
    });
  });
  describe('.restoreObject', () => {
    const facade = null;
    const KEY = 'TEST_SERIALIZER_002';
    after(() => {
      return facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should restore objectizer from replica', () => {
      return co(function* () {
        facade = LeanES.prototype.Facade.getInstance(KEY);
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        const MyCollection = (() => {
          class MyCollection extends LeanES.prototype.Collection { };

          MyCollection.inheritProtected();
          MyCollection.include(LeanES.prototype.MemoryCollectionMixin);
          MyCollection.include(LeanES.prototype.GenerateUuidIdMixin);
          MyCollection.module(Test);

          return MyCollection;

        }).call(this);
        MyCollection.initialize();
        const MyObjectizer = (() => {
          class MyObjectizer extends LeanES.prototype.Objectizer { };

          MyObjectizer.inheritProtected();
          MyObjectizer.module(Test);

          return MyObjectizer;

        }).call(this);
        MyObjectizer.initialize();
        const COLLECTION = 'COLLECTION';
        const collection = facade.registerProxy(MyCollection.new(COLLECTION, {
          delegate: Test.prototype.Record,
          objectizer: MyObjectizer
        }));
        collection = facade.retrieveProxy(COLLECTION);
        const restoredRecord = (yield MyObjectizer.restoreObject(Test, {
          type: 'instance',
          class: 'MyObjectizer',
          multitonKey: KEY,
          collectionName: COLLECTION
        }));
        assert.deepEqual(collection.objectizer, restoredRecord);
      });
    });
  });
});
