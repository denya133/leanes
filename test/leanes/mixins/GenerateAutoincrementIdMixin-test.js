const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  RecordInterface, QueryInterface, CursorInterface, CollectionInterface,
  initialize, module:moduleD, nameBy, resolver, meta, attribute, mixin, constant, method, property
} = LeanES.NS;

describe('GenerateAutoincrementIdMixin', () => {
  describe('.generateId', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should generate id for itemsusing autoincrement', async () => {
      const KEY = 'FACADE_TEST_AUTOINCREMENT_ID_001';
      const facade = LeanES.NS.Facade.getInstance(KEY);initialize;
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static  __filename = 'TestRecord';
        @meta static object = {};
        @method init() {
          this.super(...arguments);
          this.type = 'TestRecord';
        }
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @mixin(LeanES.NS.GenerateAutoincrementIdMixin)
      @moduleD(Test)
      class Queryable extends LeanES.NS.Collection {
        @nameBy static  __filename = 'Queryable';
        @meta static object = {};
        @property delegate = TestRecord;
        @method async parseQuery(aoQuery) {
          return aoQuery;
        }
        @method async executeQuery(aoParsedQuery) {
          const data = [];
          let isCustomReturn = false;
          let property = aoParsedQuery['$max'];
          if (property != null) {
            isCustomReturn = true;
            property = property.replace('@doc.', '');
            const sorted = _.sortBy(this.getData(), (doc) => {
              return doc[property];
            });
            const doc = _.last(sorted);
            if (doc != null) {
              data.push(doc[property]);
            }
          }
          const voCursor = isCustomReturn ? LeanES.NS.Cursor.new(null, data) : LeanES.NS.Cursor.new(this, data);
          return voCursor;
        }
        @method async push(record) {
          const item = await this.delegate.serialize(record);
          this.getData().push(item);
          return record;
        }
        @method async take(id) {
          const data = _.find(this.getData(), {id});
          if (data == null) {
            throw new Error('NOT_FOUND');
          }
          await data;
        }
      }
      facade.registerProxy(Queryable.new(KEY, []));
      const collection = facade.retrieveProxy(KEY);
      let j;
      for (let i = j = 1; j <= 10; i = ++j) {
        const {id} = await collection.create({
          type: 'TestRecord'
        });
        assert.equal(i, id);
      }
    });
  });
});
