const { expect, assert } = require('chai');
const LeanES = require('../../../src/leanes/leanes/index');

const {
  Objectizer,
  Utils: { co }
} = LeanES.NS;

describe('Objectizer', () => {
  describe('recoverize', () => {
    it("should recoverize object value", () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();
          Test.initialize();

          return Test;
        }).call(this);
        const TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection { };

          TestsCollection.inheritProtected();
          TestsCollection.module(Test);
          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);

        const objectizer = Objectizer.new(TestsCollection.new('Tests', {
          delegate: 'TestRecord'
        }));
        const record = (yield objectizer.recoverize(Test.NS.TestRecord, {
          type: 'Test::TestRecord',
          string: 'string',
          number: 123,
          boolean: true
        }));

        assert.instanceOf(record, Test.NS.TestRecord, 'Recoverize is incorrect');
        assert.equal(record.type, 'Test::TestRecord', '`type` is incorrect');
        assert.equal(record.string, 'string', '`string` is incorrect');
        assert.equal(record.number, 123, '`number` is incorrect');
        assert.equal(record.boolean, true, '`boolean` is incorrect');
      });
    });
  });
  describe('objectize', () => {
    it("should objectize Record.NS value", () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();
          Test.initialize();

          return Test;

        }).call(this);
        const TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection { };

          TestsCollection.inheritProtected();
          TestsCollection.module(Test);
          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);

        const col = TestCollection.new('Tests', {
          delegate: 'TestRecord'
        });

        const objectizer = Objectizer.new(col);
        const data = (yield objectizer.objectize(Test.NS.TestRecord.new({
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
    it('should create replica for objectizer', () => {
      co(function* () {
        facade = LeanES.NS.Facade.getInstance(KEY);
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        const MyCollection = (() => {
          class MyCollection extends LeanES.NS.Collection { };

          MyCollection.inheritProtected();
          MyCollection.include(LeanES.NS.MemoryCollectionMixin);
          MyCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MyCollection.module(Test);

          return MyCollection;

        }).call(this);
        MyCollection.initialize();
        const MyObjectizer = (() => {
          class MyObjectizer extends LeanES.NS.Objectizer { };

          MyObjectizer.inheritProtected();
          MyObjectizer.module(Test);

          return MyObjectizer;

        }).call(this);
        MyObjectizer.initialize();
        const COLLECTION = 'COLLECTION';
        const collection = facade.registerProxy(MyCollection.new(COLLECTION, {
          delegate: Test.NS.Record,
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
    it('should restore objectizer from replica', () => {
      co(function* () {
        facade = LeanES.NS.Facade.getInstance(KEY);
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        const MyCollection = (() => {
          class MyCollection extends LeanES.NS.Collection { };

          MyCollection.inheritProtected();
          MyCollection.include(LeanES.NS.MemoryCollectionMixin);
          MyCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MyCollection.module(Test);

          return MyCollection;

        }).call(this);
        MyCollection.initialize();
        const MyObjectizer = (() => {
          class MyObjectizer extends LeanES.NS.Objectizer { };

          MyObjectizer.inheritProtected();
          MyObjectizer.module(Test);

          return MyObjectizer;

        }).call(this);
        MyObjectizer.initialize();
        const COLLECTION = 'COLLECTION';
        const collection = facade.registerProxy(MyCollection.new(COLLECTION, {
          delegate: Test.NS.Record,
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
