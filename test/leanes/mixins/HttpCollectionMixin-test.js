const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module: moduleD, nameBy, meta, mixin, constant, method, attribute, property
} = LeanES.NS;

const commonServerInitializer = require('../../../test/common/server');
const server = commonServerInitializer({
  fixture: 'HttpCollectionMixin'
});

describe('HttpCollectionMixin', () => {
  describe('.new', () => {
    it('should create HTTP collection instance', () => {
      const collectionName = 'TestsCollection';

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        constructor() {
          super(...arguments);
          this.type = 'Test::TestRecord';
        }
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @mixin(LeanES.NS.HttpCollectionMixin)
      @moduleD(Test)
      class HttpCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'HttpCollection';
        @meta static object = {};
      }
      const collection = HttpCollection.new();
      collection.setName(collectionName);
      collection.setData({
        delegate: 'TestRecord'
      });
      assert.instanceOf(collection, HttpCollection, 'The `collection` is not an instance of HttpCollection')
    });
  });
  describe('.sendRequest', () => {
    let facade = null;
    before(() => {
      server.listen(8000);
    });
    after(() => {
      server.close();
      if (typeof facade !== "undefined" && facade !== null) {
        if (typeof facade.remove === "function") {
          facade.remove();
        }
      }
    });
    it('should make simple request', async () => {
      const collectionName = 'TestsCollection';
      const KEY = 'FACADE_TEST_HTTP_COLLECTION_000';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        constructor() {
          super(...arguments);
          this.type = 'Test::TestRecord';
        }
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @mixin(LeanES.NS.HttpCollectionMixin)
      @moduleD(Test)
      class HttpCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'HttpCollection';
        @meta static object = {};
      }
      const collection = HttpCollection.new();
      collection.setName(collectionName);
      collection.setData({
        delegate: 'TestRecord'
      });
      facade.registerProxy(collection);
      assert.instanceOf(collection, HttpCollection, 'The `collection` is not an instance of HttpCollection');
      const data = await collection.sendRequest({
        method: 'GET',
        url: 'http://localhost:8000',
        options: {
          json: true,
          headers: {}
        }
      });
      assert.equal(data.status, 200);
      assert.equal((data.body != null ? data.body.message : ''), 'OK')
    });
  });
});
