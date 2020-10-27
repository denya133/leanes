const { expect, assert } = require('chai');
const sinon = require('sinon');
const LeanES = require("../../../src/leanes/index.js").default;
const Cursor = LeanES.NS.Cursor;
const {
  Record,
  initialize, partOf, nameBy, meta, method, property, mixin, attribute
} = LeanES.NS;


describe('Cursor', () => {
  describe('.new', () => {
    it('should create cursor instance', () => {
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class TestRecord extends LeanES.NS.Record {
          @nameBy static  __filename = 'TestRecord';
          @meta static object = {};
        }

        @initialize
        @mixin(LeanES.NS.MemoryCollectionMixin)
        @mixin(LeanES.NS.GenerateUuidIdMixin)
        @partOf(Test)
        class MemoryCollection extends LeanES.NS.Collection {
          @nameBy static  __filename = 'MemoryCollection';
          @meta static object = {};
        }
        // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
        //   delegate: TestRecord
        // });
        const voMemoryCollection = MemoryCollection.new();
        voMemoryCollection.setName('MemoryCollection');
        voMemoryCollection.setData({
          delegate: TestRecord
        });
        const array = [{}, {}, {}];
        const cursor = Cursor.new(voMemoryCollection, array);
      }).to.not.throw(Error);
    });
  });
  describe('.setCollection', () => {
    it('should setup record', () => {
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class TestRecord extends LeanES.NS.Record {
          @nameBy static  __filename = 'TestRecord';
          @meta static object = {};
        }

        @initialize
        @mixin(LeanES.NS.MemoryCollectionMixin)
        @mixin(LeanES.NS.GenerateUuidIdMixin)
        @partOf(Test)
        class MemoryCollection extends LeanES.NS.Collection {
          @nameBy static  __filename = 'MemoryCollection';
          @meta static object = {};
        }
        // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
        //   delegate: TestRecord
        // });
        const voMemoryCollection = MemoryCollection.new();
        voMemoryCollection.setName('MemoryCollection');
        voMemoryCollection.setData({
          delegate: TestRecord
        });
        const cursor = Cursor.new();
        cursor.setCollection(voMemoryCollection);
      }).to.not.throw(Error);
    });
  });
  describe('next', () => {
    it('should get next values one by one', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      const array = [
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'men',
          type: 'TestRecord'
        },
        {
          data: 'in',
          type: 'TestRecord'
        },
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const cursor = Cursor.new(voMemoryCollection, array);
      assert.equal((await cursor.next()).data, 'three', 'First item is incorrect');
      assert.equal((await cursor.next()).data, 'men', 'Second item is incorrect');
      assert.equal((await cursor.next()).data, 'in', 'Third item is incorrect');
      assert.equal((await cursor.next()).data, 'a boat', 'Fourth item is incorrect');
      assert.isUndefined(await cursor.next(), 'Unexpected item is present');
    });
  });
  describe('hasNext', () => {
    it('should check if next value is present', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'data',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      assert.isTrue(await cursor.hasNext(), 'There is no next value');
      const data = await cursor.next();
      assert.isFalse(await cursor.hasNext(), 'There is something else');
    });
  });
  describe('toArray', () => {
    it('should get array from cursor', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'men',
          type: 'TestRecord'
        },
        {
          data: 'in',
          type: 'TestRecord'
        },
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      const records = await cursor.toArray();
      assert.equal(records.length, array.length, 'Counts of input and output data are different');
      for (let i = 0; i < records.length; i++) {
        let record = records[i];
        assert.instanceOf(record, Test.NS.TestRecord, `Record ${i} is incorrect`);
        assert.equal(record.data, array[i].data, `Record ${i} \`data\` is incorrect`);
      }
    });
  });
  describe('close', () => {
    it('should remove records from cursor', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'men',
          type: 'TestRecord'
        },
        {
          data: 'in',
          type: 'TestRecord'
        },
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      assert.isTrue(await cursor.hasNext(), 'There is no next value');
      await cursor.close();
      assert.isFalse(await cursor.hasNext(), 'There is something else');
    });
  });
  describe('count', () => {
    it('should count records in cursor', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'men',
          type: 'TestRecord'
        },
        {
          data: 'in',
          type: 'TestRecord'
        },
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      assert.equal(await cursor.count(), 4, 'Count works incorrectly');
    });
  });
  describe('forEach', () => {
    it('should call lambda in each record in cursor', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'men',
          type: 'TestRecord'
        },
        {
          data: 'in',
          type: 'TestRecord'
        },
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      const spyLambda = sinon.spy(async () => { });
      await cursor.forEach(spyLambda);
      assert.isTrue(spyLambda.called, 'Lambda never called');
      assert.equal(spyLambda.callCount, 4, 'Lambda calls are not match');
      assert.equal(spyLambda.args[0][0].data, 'three', 'Lambda 1st call is not match');
      assert.equal(spyLambda.args[1][0].data, 'men', 'Lambda 2nd call is not match');
      assert.equal(spyLambda.args[2][0].data, 'in', 'Lambda 3rd call is not match');
      assert.equal(spyLambda.args[3][0].data, 'a boat', 'Lambda 4th call is not match');
    });
  });
  describe('map', () => {
    it('should map records using lambda', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'men',
          type: 'TestRecord'
        },
        {
          data: 'in',
          type: 'TestRecord'
        },
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      const records = await cursor.map(async (record) => {
        record.data = '+' + record.data + '+';
      return await Promise.resolve(record);
      });
      assert.lengthOf(records, 4, 'Records count is not match');
      assert.equal(records[0].data, '+three+', '1st record is not match');
      assert.equal(records[1].data, '+men+', '2nd record is not match');
      assert.equal(records[2].data, '+in+', '3rd record is not match');
      assert.equal(records[3].data, '+a boat+', '4th record is not match');
    });
  });
  describe('filter', () => {
    it('should filter records using lambda', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'men',
          type: 'TestRecord'
        },
        {
          data: 'in',
          type: 'TestRecord'
        },
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      const records = await cursor.filter(async (record) => {
        return await Promise.resolve(record.data.length > 3);
      });
      assert.lengthOf(records, 2, 'Records count is not match');
      assert.equal(records[0].data, 'three', '1st record is not match');
      assert.equal(records[1].data, 'a boat', '2nd record is not match');
    });
  });
  describe('find', () => {
    it('should find record using lambda', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) name = 'Unknown';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          name: 'Jerome',
          type: 'TestRecord'
        },
        {
          name: 'George',
          type: 'TestRecord'
        },
        {
          name: 'Harris',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      const record = await cursor.find(async (record) => {
        return await Promise.resolve(record.name === 'George');
      });
      assert.equal(record.name, 'George', 'Record is not match');
    });
  });
  describe('compact', () => {
    it('should get non-empty records from cursor', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        null,
        {
          data: 'men',
          type: 'TestRecord'
        },
        void 0,
        {
          data: 'a boat',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      const records = await cursor.compact();
      assert.lengthOf(records, 2, 'Records count not match');
      assert.equal(records[0].data, 'men', '1st record is not match');
      assert.equal(records[1].data, 'a boat', '2nd record is not match');
    });
  });
  describe('reduce', () => {
    it('should reduce records using lambda', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) data = '';
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @partOf(Test)
      class MemoryCollection extends LeanES.NS.Collection {
        @nameBy static  __filename = 'MemoryCollection';
        @meta static object = {};
      }
      // const voMemoryCollection = MemoryCollection.new('MemoryCollection', {
      //   delegate: TestRecord
      // });
      const voMemoryCollection = MemoryCollection.new();
      voMemoryCollection.setName('MemoryCollection');
      voMemoryCollection.setData({
        delegate: TestRecord
      });
      const array = [
        {
          data: 'one',
          type: 'TestRecord'
        },
        {
          data: 'two',
          type: 'TestRecord'
        },
        {
          data: 'three',
          type: 'TestRecord'
        },
        {
          data: 'four',
          type: 'TestRecord'
        }
      ];
      const cursor = Cursor.new(voMemoryCollection, array);
      const records = await cursor.reduce(async (accumulator, item) => {
        accumulator[item.data] = item;
        return await Promise.resolve(accumulator);
      }, {});
      assert.equal(records['one'].data, 'one', '1st record is not match');
      assert.equal(records['two'].data, 'two', '2nd record is not match');
      assert.equal(records['three'].data, 'three', '3rd record is not match');
      assert.equal(records['four'].data, 'four', '4th record is not match');
    });
  });
});
