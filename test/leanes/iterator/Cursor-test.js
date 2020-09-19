const { expect, assert } = require('chai');
const sinon = require('sinon');
const LeanES = require("../../../src/leanes/index.js").default;
const Cursor = LeanES.NS.Cursor;
const {
  Record,
  initialize, module:moduleD, nameBy, meta, method, property
} = LeanES.NS;


describe('Cursor', () => {
  describe('.setCollection', () => {
    it('should setup record', () => {
      expect(() => {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        const cursor = Cursor.new();
        cursor.setCollection(voMemoryCollection);
      }).to.not.throw(Error);
    });
  });
  describe('next', () => {
    it('should get next values one by one', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const array = [
          {
            data: 'one',
            type: 'Test::TestRecord'
          },
          {
            data: 'two',
            type: 'Test::TestRecord'
          },
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'four',
            type: 'Test::TestRecord'
          }
        ];
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        cursor = Cursor.new(voMemoryCollection, array);
        assert.equal((yield cursor.next()).data, 'one', 'First item is incorrect');
        assert.equal((yield cursor.next()).data, 'two', 'Second item is incorrect');
        assert.equal((yield cursor.next()).data, 'three', 'Third item is incorrect');
        assert.equal((yield cursor.next()).data, 'four', 'Fourth item is incorrect');
        assert.isUndefined(yield cursor.next(), 'Unexpected item is present');
      });
    });
  });
  describe('hasNext', () => {
    it('should check if next value is present', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        const array = [
          {
            data: 'data',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        assert.isTrue(yield cursor.hasNext(), 'There is no next value');
        const data = yield cursor.next();
        assert.isFalse(yield cursor.hasNext(), 'There is something else');
      });
    });
  });
  describe('toArray', () => {
    it('should get array from cursor', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        const array = [
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'men',
            type: 'Test::TestRecord'
          },
          {
            data: 'in',
            type: 'Test::TestRecord'
          },
          {
            data: 'a boat',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        const records = yield cursor.toArray();
        assert.equal(records.length, array.length, 'Counts of input and output data are different');
        for (index = i = 0, len = records.length; i < len; index = ++i) {
          record = records[index];
          assert.instanceOf(record, Test.NS.TestRecord, `Record ${index} is incorrect`);
          assert.equal(record.data, array[index].data, `Record ${index} \`data\` is incorrect`);
        }
      });
    });
  });
  describe('close', () => {
    it('should remove records from cursor', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        const array = [
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'men',
            type: 'Test::TestRecord'
          },
          {
            data: 'in',
            type: 'Test::TestRecord'
          },
          {
            data: 'a boat',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        assert.isTrue(yield cursor.hasNext(), 'There is no next value');
        yield cursor.close();
        assert.isFalse(yield cursor.hasNext(), 'There is something else');
      });
    });
  });
  describe('count', () => {
    it('should count records in cursor', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        array = [
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'men',
            type: 'Test::TestRecord'
          },
          {
            data: 'in',
            type: 'Test::TestRecord'
          },
          {
            data: 'a boat',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        assert.equal(yield cursor.count(), 4, 'Count works incorrectly');
      });
    });
  });
  describe('forEach', () => {
    it('should call lambda in each record in cursor', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        array = [
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'men',
            type: 'Test::TestRecord'
          },
          {
            data: 'in',
            type: 'Test::TestRecord'
          },
          {
            data: 'a boat',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        const spyLambda = sinon.spy(function* () { });
        yield cursor.forEach(spyLambda);
        assert.isTrue(spyLambda.called, 'Lambda never called');
        assert.equal(spyLambda.callCount, 4, 'Lambda calls are not match');
        assert.equal(spyLambda.args[0][0].data, 'three', 'Lambda 1st call is not match');
        assert.equal(spyLambda.args[1][0].data, 'men', 'Lambda 2nd call is not match');
        assert.equal(spyLambda.args[2][0].data, 'in', 'Lambda 3rd call is not match');
        assert.equal(spyLambda.args[3][0].data, 'a boat', 'Lambda 4th call is not match');
      });
    });
  });
  describe('map', () => {
    it('should map records using lambda', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        array = [
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'men',
            type: 'Test::TestRecord'
          },
          {
            data: 'in',
            type: 'Test::TestRecord'
          },
          {
            data: 'a boat',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        const records = yield cursor.map(function* (record) {
          record.data = '+' + record.data + '+';
        yield ES.NS.Promise.resolve(record);
        });
        assert.lengthOf(records, 4, 'Records count is not match');
        assert.equal(records[0].data, '+three+', '1st record is not match');
        assert.equal(records[1].data, '+men+', '2nd record is not match');
        assert.equal(records[2].data, '+in+', '3rd record is not match');
        assert.equal(records[3].data, '+a boat+', '4th record is not match');
      });
    });
  });
  describe('filter', () => {
    it('should filter records using lambda', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        array = [
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'men',
            type: 'Test::TestRecord'
          },
          {
            data: 'in',
            type: 'Test::TestRecord'
          },
          {
            data: 'a boat',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        const records = yield cursor.filter(function* (record) {
          yield ES.NS.Promise.resolve(record.data.length > 3);
        });
        assert.lengthOf(records, 2, 'Records count is not match');
        assert.equal(records[0].data, 'three', '1st record is not match');
        assert.equal(records[1].data, 'a boat', '2nd record is not match');
      });
    });
  });
  describe('find', () => {
    it('should find record using lambda', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            name: String
          }, {
            default: 'Unknown'
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        array = [
          {
            name: 'Jerome',
            type: 'Test::TestRecord'
          },
          {
            name: 'George',
            type: 'Test::TestRecord'
          },
          {
            name: 'Harris',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        const record = yield cursor.find(function* (record) {
          yield ES.NS.Promise.resolve(record.name === 'George');
        });
        assert.equal(record.name, 'George', 'Record is not match');
      });
    });
  });
  describe('compact', () => {
    it('should get non-empty records from cursor', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        array = [
          null,
          {
            data: 'men',
            type: 'Test::TestRecord'
          },
          void 0,
          {
            data: 'a boat',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        const records = yield cursor.compact();
        assert.lengthOf(records, 2, 'Records count not match');
        assert.equal(records[0].data, 'men', '1st record is not match');
        assert.equal(records[1].data, 'a boat', '2nd record is not match');
      });
    });
  });
  describe('reduce', () => {
    it('should reduce records using lambda', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          return Test;
        }).call(this);
        Test.initialize();
        const TestRecord = (() => {
          class TestRecord extends LeanES.NS.Record { };
          TestRecord.inheritProtected();
          TestRecord.module(Test);
          TestRecord.attribute({
            data: String
          }, {
            default: ''
          });
          return TestRecord;
        }).call(this);
        TestRecord.initialize();
        const MemoryCollection = (() => {
          class MemoryCollection extends LeanES.NS.Collection { };
          MemoryCollection.inheritProtected();
          MemoryCollection.include(LeanES.NS.MemoryCollectionMixin);
          MemoryCollection.include(LeanES.NS.GenerateUuidIdMixin);
          MemoryCollection.module(Test);
          return MemoryCollection;
        }).call(this);
        MemoryCollection.initialize();
        const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
          delegate: TestRecord
        });
        array = [
          {
            data: 'one',
            type: 'Test::TestRecord'
          },
          {
            data: 'two',
            type: 'Test::TestRecord'
          },
          {
            data: 'three',
            type: 'Test::TestRecord'
          },
          {
            data: 'four',
            type: 'Test::TestRecord'
          }
        ];
        const cursor = Cursor.new(voMemoryCollection, array);
        const records = yield cursor.reduce(function* (accumulator, item) {
          accumulator[item.data] = item;
          yield ES.NS.Promise.resolve(accumulator);
        }, {});
        assert.equal(records['one'].data, 'one', '1st record is not match');
        assert.equal(records['two'].data, 'two', '2nd record is not match');
        assert.equal(records['three'].data, 'three', '3rd record is not match');
        assert.equal(records['four'].data, 'four', '4th record is not match');
      });
    });
  });
});
