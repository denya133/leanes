const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const EventEmitter = require('events');
const httpErrors = require('http-errors');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Resource,
  initialize, module: moduleD, nameBy, meta, constant, mixin, property, method, attribute, action
} = LeanES.NS;

const hasProp = {}.hasOwnProperty;

describe('Resource', () => {
  describe('.new', () => {
    it('should create new command', () => {
      expect(() => {
        const resource = Resource.new();
      }).to.not.throw(Error);
    });
  });
  describe('.keyName', () => {
    it('should get key name using entity name', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { keyName } = resource;
      assert.equal(keyName, 'test_entity');
    });
  });
  describe('.itemEntityName', () => {
    it('should get item name using entity name', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { itemEntityName } = resource;
      assert.equal(itemEntityName, 'test_entity');
    });
  });
  describe('.listEntityName', () => {
    it('should get list name using entity name', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { listEntityName } = resource;
      assert.equal(listEntityName, 'test_entities');
    });
  });
  describe('.collectionName', () => {
    it('should get collection name using entity name', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { collectionName } = resource;
      assert.equal(collectionName, 'TestEntitiesCollection');
    });
  });
  describe('.collection', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get collection', () => {
      const TEST_FACADE = 'TEST_FACADE_001';

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      facade = LeanES.NS.Facade.getInstance(TEST_FACADE);
      const resource = TestResource.new();
      resource.initializeNotifier(TEST_FACADE);
      const { collectionName } = resource;

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @property entityName = 'TestEntity';
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
        constructor() {
          super(...arguments);
          this.type = 'Test::TestEntityRecord';
        }
      }
      const boundCollection = TestsCollection.new();
      boundCollection.setName(collectionName);
      boundCollection.setData({
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      const { collection } = resource;
      assert.equal(collection, boundCollection);
    });
  });
  // describe('.action', () => {
  //   it('should create actions', () => {
  //     const default1 = function () {
  //       return 'test1';
  //     };
  //     const default2 = function () {
  //       return 'test2';
  //     };
  //     const default3 = function () {
  //       return 'test3';
  //     };

  //     @initialize
  //     class Test extends LeanES {
  //       @nameBy static __filename = 'Test';
  //       @meta static object = {};
  //       @constant ROOT = __dirname;
  //     }

  //     @initialize
  //     @moduleD(Test)
  //     class TestResource extends LeanES.NS.Resource {
  //       @nameBy static __filename = 'TestResource';
  //       @meta static object = {};
  //       @property entityName = 'TestEntity';
  //       @action test1() {
  //         default1();
  //       }
  //       @action test2() {
  //         default2();
  //       }
  //       @action test3() {
  //         default3();
  //       }
  //     }
  //     const { test1, test2, test3 } = TestResource.metaObject.data.actions;
  //     assert.equal(test1.default, default1);
  //     assert.equal(test1.attr, 'test1');
  //     assert.equal(test1.attrType, LeanES.NS.FunctionT);
  //     assert.equal(test1.level, LeanES.NS.PUBLIC);
  //     assert.equal(test1.async, LeanES.NS.ASYNC);
  //     assert.equal(test1.pointer, 'test1');
  //     assert.equal(test2.default, default2);
  //     assert.equal(test2.attr, 'test2');
  //     assert.equal(test2.attrType, LeanES.NS.FunctionT);
  //     assert.equal(test2.level, LeanES.NS.PUBLIC);
  //     assert.equal(test2.async, LeanES.NS.ASYNC);
  //     assert.equal(test2.pointer, 'test2');
  //     assert.equal(test3.default, default3);
  //     assert.equal(test3.attr, 'test3');
  //     assert.equal(test3.attrType, LeanES.NS.FunctionT);
  //     assert.equal(test3.level, LeanES.NS.PUBLIC);
  //     assert.equal(test3.async, LeanES.NS.ASYNC);
  //     assert.equal(test3.pointer, 'test3');
  //   });
  // });
  // describe('.actions', () => {
  //   it('should get resource actions', () => {
  //       const default1 = function() {
  //         return 'test1';
  //       };
  //       const default2 = function() {
  //         return 'test2';
  //       };
  //       const default3 = function() {
  //         return 'test3';
  //       };

  //       @initialize
  //       class Test extends LeanES {
  //         @nameBy static __filename = 'Test';
  //         @meta static object = {};
  //         @constant ROOT = __dirname;
  //       }

  //       @initialize
  //       @mixin(LeanES.NS.QueryableResourceMixin)
  //       @moduleD(Test)
  //       class TestResource extends LeanES.NS.Resource {
  //         @nameBy static __filename = 'TestResource';
  //         @meta static object = {};
  //         @property entityName = 'TestEntity';
  //         @action test1() {
  //           default1();
  //         }
  //         @action test2() {
  //           default2();
  //         }
  //         @action test3() {
  //           default3();
  //         }
  //       }
  //       const {test1, test2, test3} = TestResource.actions;
  //       assert.equal(test1.default, default1);
  //       assert.equal(test1.attr, 'test1');
  //       assert.equal(test1.attrType, LeanES.NS.FunctionT);
  //       assert.equal(test1.level, LeanES.NS.PUBLIC);
  //       assert.equal(test1.async, LeanES.NS.ASYNC);
  //       assert.equal(test1.pointer, 'test1');
  //       assert.equal(test2.default, default2);
  //       assert.equal(test2.attr, 'test2');
  //       assert.equal(test2.attrType, LeanES.NS.FunctionT);
  //       assert.equal(test2.level, LeanES.NS.PUBLIC);
  //       assert.equal(test2.async, LeanES.NS.ASYNC);
  //       assert.equal(test2.pointer, 'test2');
  //       assert.equal(test3.default, default3);
  //       assert.equal(test3.attr, 'test3');
  //       assert.equal(test3.attrType, LeanES.NS.FunctionT);
  //       assert.equal(test3.level, LeanES.NS.PUBLIC);
  //       assert.equal(test3.async, LeanES.NS.ASYNC);
  //       assert.equal(test3.pointer, 'test3');
  //       const {actions} = TestResource;
  //       assert.propertyVal(actions.list, 'attr', 'list');
  //       assert.propertyVal(actions.list, 'level', LeanES.NS.PUBLIC);
  //       assert.propertyVal(actions.list, 'async', LeanES.NS.ASYNC);
  //       assert.propertyVal(actions.detail, 'attr', 'detail');
  //       assert.propertyVal(actions.detail, 'level', LeanES.NS.PUBLIC);
  //       assert.propertyVal(actions.detail, 'async', LeanES.NS.ASYNC);
  //       assert.propertyVal(actions.create, 'attr', 'create');
  //       assert.propertyVal(actions.create, 'level', LeanES.NS.PUBLIC);
  //       assert.propertyVal(actions.create, 'async', LeanES.NS.ASYNC);
  //       assert.propertyVal(actions.update, 'attr', 'update');
  //       assert.propertyVal(actions.update, 'level', LeanES.NS.PUBLIC);
  //       assert.propertyVal(actions.update, 'async', LeanES.NS.ASYNC);
  //       assert.propertyVal(actions.delete, 'attr', 'delete');
  //       assert.propertyVal(actions.delete, 'level', LeanES.NS.PUBLIC);
  //       assert.propertyVal(actions.delete, 'async', LeanES.NS.ASYNC);
  //   });
  // });
  describe('.beforeActionHook', () => {
    it('should parse action params as arguments', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: void 0
      });
      const ctx = Symbol('ctx');
      resource.beforeActionHook(ctx);
      assert.strictEqual(resource.context, ctx, 'beforeActionHook called with context and set it in resource.context');
    });
  });
  describe('.getQuery', () => {
    it('should get resource query', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'listQuery', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          query: {
            query: '{"test":"test123"}'
          }
        }
      });
      resource.getQuery();
      assert.deepEqual(resource.listQuery, {
        test: 'test123'
      });
    });
  });
  describe('.getRecordId', () => {
    it('should get resource record ID', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          pathParams: {
            test_entity: 'ID123456'
          }
        }
      });
      resource.getRecordId();
      assert.deepEqual(resource.recordId, 'ID123456');
    });
  });
  describe('.getRecordBody', () => {
    it('should get body', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          request: {
            body: {
              test_entity: {
                test: 'test9'
              }
            }
          }
        }
      });
      resource.getRecordBody();
      assert.deepEqual(resource.recordBody, {
        test: 'test9'
      });
    });
  });
  describe('.omitBody', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should clean body from unneeded properties', () => {
      const TEST_FACADE = 'TEST_FACADE_002';
      facade = LeanES.NS.Facade.getInstance(TEST_FACADE);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          TestEntityRecord;
        }
      }
      const resource = TestResource.new();
      resource.initializeNotifier(TEST_FACADE);
      const { collectionName } = resource;
      const boundCollection = TestsCollection.new();
      boundCollection.setName(collectionName);
      boundCollection.setData({
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          request: {
            body: {
              test_entity: {
                _id: '123',
                test: 'test9',
                _space: 'test',
                type: 'TestEntityRecord'
              }
            }
          }
        }
      });
      resource.getRecordBody();
      resource.omitBody();
      assert.deepEqual(resource.recordBody, {
        test: 'test9',
        type: 'Test::TestEntityRecord'
      });
    });
  });
  describe('.beforeUpdate', () => {
    it('should get body with ID', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          pathParams: {
            test_entity: 'ID123456'
          },
          request: {
            body: {
              test_entity: {
                test: 'test9'
              }
            }
          }
        }
      });
      resource.getRecordId();
      resource.getRecordBody();
      resource.beforeUpdate();
      assert.deepEqual(resource.recordBody, {
        id: 'ID123456',
        test: 'test9'
      });
    });
  });
  describe('.list', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should list of resource items', async () => {
      const KEY = 'TEST_RESOURCE_001';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord
        }
      }

      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method parseQuery(aoQuery) {
          return aoQuery;
        }
        @method async takeAll() {
          return await LeanES.NS.Cursor.new(this, this.getData().data)
        }
        @method executeQuery(aoParsedQuery) {
          const data = _.filter(this.getData().data, aoParsedQuery.$filter);
          LeanES.NS.Cursor.new(this, data);
        }
        @method push(aoRecord) {
          aoRecord.id = LeanES.NS.Utils.uuid.v4();
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method async includes() {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {};

        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entitis',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const COLLECTION_NAME = 'TestEntitiesCollection';
      const col = TestsCollection.new();
      col.setName(COLLECTION_NAME);
      col.setData({
        delegate: 'TestRecord',
        // serializer: LeanES.NS.Serializer,
        data: []
      });
      facade.registerProxy(col);
      const collection = facade.retrieveProxy(COLLECTION_NAME);
      await collection.create({
        test: 'test1'
      });
      await collection.create({
        test: 'test2'
      });
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new(switchMediator, req, res);
      context.query = {
        query: '{}'
      };
      const { items, meta: metaResult } = await resource.list(context);
      assert.deepEqual(metaResult, {
        pagination: {
          limit: 'not defined',
          offset: 'not defined'
        }
      });
      assert.propertyVal(items[0], 'test', 'test1');
      assert.propertyVal(items[1], 'test', 'test2');
    });
  });
  describe('.detail', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get resource single item', async () => {
      const KEY = 'TEST_RESOURCE_002';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method parseQuery(aoQuery) {
          return aoQuery;
        }
        @method async executeQuery(aoParsedQuery) {
          const data = _.filter(this.getData().data, aoParsedQuery.$filter);
          return await LeanES.NS.Cursor.new(this, data);
        }
        @method push(aoRecord) {
          aoRecord.id = LeanES.NS.Utils.uuid.v4();
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = LeanES.NS.Cursor.new(this, result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {}
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entitis',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const COLLECTION_NAME = 'TestEntitiesCollection';
      const col = TestsCollection.new();
      col.setName(COLLECTION_NAME);
      col.setData({
        delegate: 'TestRecord',
        serializer: () => {
          return LeanES.NS.Serializer;
        },
        data: []
      });
      facade.registerProxy(col);
      const collection = facade.retrieveProxy(COLLECTION_NAME);

      await collection.create({
        test: 'test1'
      });
      const record = await collection.create({
        test: 'test2'
      });
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new(switchMediator, req, res);
      context.pathParams = {
        [`${resource.keyName}`]: record.id
      };
      const result = await resource.detail(context);
      assert.propertyVal(result, 'id', record.id);
      assert.propertyVal(result, 'test', 'test2');
    });
  });
  describe('.create', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create resource single item', async () => {
      const KEY = 'TEST_RESOURCE_003';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method parseQuery(aoQuery) {
          return aoQuery;
        }
        @method async executeQuery(aoParsedQuery) {
          const data = _.filter(this.getData().data, aoParsedQuery.$filter);
          return await LeanES.NS.Cursor.new(this, data);
        }
        @method push(aoRecord) {
          aoRecord.id = LeanES.NS.Utils.uuid.v4();
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = LeanES.NS.Cursor.new(this, result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }
      const COLLECTION_NAME = 'TestEntitiesCollection';
      const col = TestsCollection.new();
      col.setName(COLLECTION_NAME);
      col.setData({
        delegate: 'TestRecord',
        // serializer: LeanES.NS.Serializer,
        data: []
      });
      facade.registerProxy(col);
      const collection = facade.retrieveProxy(COLLECTION_NAME);
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: void 0
      });
      const ctx = {
        request: {
          body: {
            test_entity: {
              test: 'test3'
            }
          }
        }
      };
      const result = await resource.create(ctx);
      assert.propertyVal(result, 'test', 'test3');
    });
  });
  describe('.update', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should update resource single item', async () => {
      const KEY = 'TEST_RESOURCE_005';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @moduleD(Test)
      class TestCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestCollection';
        @meta static object = {};
        @method parseQuery(aoQuery) {
          return aoQuery;
        }
        @method async executeQuery(aoParsedQuery) {
          const data = _.filter(this.getData().data, aoParsedQuery.$filter);
          return await LeanES.NS.Cursor.new(this, data);
        }
        @method async push(aoRecord) {
          aoRecord.id = LeanES.NS.Utils.uuid.v4();
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method override(id, aoRecord) {
          const item = _.find(this.getData().data, { id });
          if (item != null) {
            const FORBIDDEN = ['_key', '_id', '_type', '_rev'];
            const snapshot = _.omit(((typeof aoRecord.toJSON === "function" ? aoRecord.toJSON() : void 0) != null ? aoRecord.toJSON() : aoRecord) != null ? aoRecord : {}, FORBIDDEN);
            for (let key in snapshot) {
              if (!hasProp.call(snapshot, key)) continue;
              const value = snapshot[key];
              item[key] = value;
            }
          }
          return aoRecord;
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = LeanES.NS.Cursor.new(this, result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }
      const COLLECTION_NAME = 'TestEntitiesCollection';
      const col = TestCollection.new();
      col.setName(COLLECTION_NAME);
      col.setData({
        delegate: 'TestRecord',
        serializer: LeanES.NS.Serializer,
        data: []
      });
      facade.registerProxy(col);
      const collection = facade.retrieveProxy(COLLECTION_NAME);
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: void 0
      });
      const record = await collection.create({
        test: 'test3'
      });
      const ctx = {
        type: 'Test::TestRecord',
        pathParams: {
          test_entity: record.id
        },
        request: {
          body: {
            test_entity: {
              test: 'test8'
            }
          }
        }
      };
      const result = await resource.update(ctx);

      assert.propertyVal(result, 'test', 'test8');
    });
  });
  describe('.delete', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should remove resource single item', async () => {
      const KEY = 'TEST_RESOURCE_006';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method parseQuery(aoQuery) {
          return aoQuery;
        }
        @method async executeQuery(aoParsedQuery) {
          const data = _.filter(this.getData().data, aoParsedQuery.$filter);
          return await LeanES.NS.Cursor.new(this, data);
        }
        @method async push(aoRecord) {
          aoRecord.id = LeanES.NS.Utils.uuid.v4();
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method override(id, aoRecord) {
          const item = _.find(this.getData().data, { id });
          if (item != null) {
            const FORBIDDEN = ['_key', '_id', '_type', '_rev'];
            const snapshot = _.omit(((typeof aoRecord.toJSON === "function" ? aoRecord.toJSON() : void 0) != null ? aoRecord.toJSON() : aoRecord) != null ? aoRecord : {}, FORBIDDEN);
            for (let key in snapshot) {
              if (!hasProp.call(snapshot, key)) continue;
              const value = snapshot[key];
              item[key] = value;
            }
          }
          return aoRecord;
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = LeanES.NS.Cursor.new(this, result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {}
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entitis',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const COLLECTION_NAME = 'TestEntitiesCollection';
      const col = TestsCollection.new();
      col.setName(COLLECTION_NAME);
      col.setData({
        delegate: 'TestRecord',
        data: []
      });
      facade.registerProxy(col);
      const collection = facade.retrieveProxy(COLLECTION_NAME);

      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new(switchMediator, req, res);
      const record = await collection.create({
        test: 'test3'
      });
      context.pathParams = {
        test_entity: record.id
      };
      const result = await resource.delete(context);
      assert.isUndefined(result);
    });
  });
  describe('.execute', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should call execution', async () => {
      const KEY = 'TEST_RESOURCE_008';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {};
        @method getDelayed() {
          return [];
        }
        constructor(...args) {
          super(...args);
          this.jobs = {};
        }
      }

      const resque = TestResque.new();
      resque.setName(LeanES.NS.RESQUE);
      resque.setData({
        data: []
      });
      facade.registerProxy(resque);

      @initialize
      @mixin(LeanES.NS.QueryableCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @property jobs = {};
        @method async takeAll() {
          return await LeanES.NS.Cursor.new(this, this.getData().data);
        }

        @method push(aoRecord) {
          aoRecord.id = LeanES.NS.Utils.uuid.v4();
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }

        @method remove(id) {
          _.remove(this.getData().data, { id });
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id })
          if (data != null) {
            result.push(data);
          }
          const cursor = LeanES.NS.Cursor.new(this, result);
          await cursor.first();
        }

        @method includes(id) {
          return (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }
      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entitis',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const COLLECTION_NAME = 'TestEntitiesCollection';
      const col = TestsCollection.new();
      col.setName(COLLECTION_NAME);
      col.setData({
        delegate: 'TestRecord',
        data: []
      });
      facade.registerProxy(col);
      const mediatorM = LeanES.NS.Mediator.new();
      mediatorM.setName(LeanES.NS.APPLICATION_MEDIATOR);
      mediatorM.setViewComponent({
        context: {}
      });
      facade.registerMediator(mediatorM);
      const collection = facade.retrieveProxy(COLLECTION_NAME);
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new(switchMediator, req, res);
      context.query = {
        query: '{"test":{"$eq":"test2"}}'
      };
      await collection.create({
        test: 'test1'
      });
      await collection.create({
        test: 'test2'
      });
      await collection.create({
        test: 'test2'
      });
      const spySendNotitfication = sinon.spy(resource, 'sendNotification');
      const testBody = {
        context: context,
        reverse: 'TEST_REVERSE'
      };
      const notification = LeanES.NS.Notification.new('TEST_NAME', testBody, 'list');
      await resource.execute(notification);
      const [name, body, type] = spySendNotitfication.lastCall.args;
      assert.equal(name, LeanES.NS.HANDLER_RESULT);
      assert.isUndefined(body.error, body.error);
      const {
        result,
        resource: voResource
      } = body;
      const { meta:resultMeta, items } = result;
      assert.deepEqual(resultMeta, {
        pagination: {
          limit: 'not defined',
          offset: 'not defined'
        }
      });
      assert.deepEqual(voResource, resource);
      assert.lengthOf(items, 3);
      assert.equal(type, 'TEST_REVERSE');
    });
  });
  describe('.checkApiVersion', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check API version', async () => {
      const KEY = 'TEST_RESOURCE_001';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
        @action test() { }
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/v/v2.0/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      resource.context = Test.NS.Context.new(switchMediator, req, res);
      let e;
      try {
        resource.context.pathParams = {
          v: 'v1.0',
          test_entity: 'ID123456'
        };
        await resource.checkApiVersion();
      } catch (error) {
        e = error;
      }
      assert.isDefined(e);
      try {
        resource.context.pathParams = {
          v: 'v2.0',
          test_entity: 'ID123456'
        };
        await resource.checkApiVersion();
      } catch (error) {
        e = error;
        assert.isDefined(e);
      }
    });
  });
  describe('.setOwnerId', () => {
    it('should get owner ID for body', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'session', {
        writable: true,
        value: {
          uid: 'ID123'
        }
      });
      const ctx = {
        pathParams: {
          test_entity: 'ID123456'
        },
        request: {
          body: {
            test_entity: {
              test: 'test9'
            }
          }
        }
      };
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: ctx
      });
      resource.getRecordId();
      resource.getRecordBody();
      resource.beforeUpdate();
      await resource.setOwnerId();
      assert.deepEqual(resource.recordBody, {
        test: 'test9',
        id: 'ID123456',
        ownerId: 'ID123'
      });
    });
  });
  describe('.protectOwnerId', () => {
    it('should omit owner ID from body', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'session', {
        writable: true,
        value: {
          uid: 'ID123'
        }
      });
      const ctx = {
        pathParams: {
          test_entity: 'ID123456'
        },
        request: {
          body: {
            test_entity: {
              test: 'test9'
            }
          }
        }
      };
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: ctx
      });
      resource.getRecordId();
      resource.getRecordBody();
      resource.beforeUpdate();
      await resource.setOwnerId();
      assert.deepEqual(resource.recordBody, {
        test: 'test9',
        id: 'ID123456',
        ownerId: 'ID123'
      });
      await resource.protectOwnerId();
      assert.deepEqual(resource.recordBody, {
        test: 'test9',
        id: 'ID123456'
      });
    });
  });
  describe('.filterOwnerByCurrentUser', () => {
    it('should update query if caller user is not admin', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'session', {
        writable: true,
        value: {
          uid: 'ID123',
          userIsAdmin: false
        }
      });
      const ctx = {
        pathParams: {
          test_entity: 'ID123456',
          space: 'SPACE123'
        },
        request: {
          body: {
            test_entity: {
              test: 'test9'
            }
          }
        }
      };
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: ctx
      });
      resource.getRecordId();
      resource.getRecordBody();
      resource.beforeUpdate();
      await resource.filterOwnerByCurrentUser();
      assert.deepEqual(resource.listQuery, {
        $filter: {
          '@doc.ownerId': {
            '$eq': 'ID123'
          }
        }
      });
    });
  });
  describe('.checkOwner', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check if user is resource owner', async () => {
      const KEY = 'TEST_RESOURCE_003';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @attribute({ type: 'string' }) ownerId;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestCollection';
        @meta static object = {};
      }
      let resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const { collectionName } = resource;
      const boundCollection = TestCollection.new();
      boundCollection.setName(collectionName);
      boundCollection.setData({
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      await boundCollection.create({
        id: 'ID123456',
        test: 'test',
        ownerId: 'ID124'
      });
      await boundCollection.create({
        id: 'ID123457',
        test: 'test',
        ownerId: 'ID123'
      });
      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      resource = TestResource.new();
      resource.initializeNotifier(KEY);
      resource.context = Test.NS.Context.new(switchMediator, req, res);
      resource.context.pathParams = {
        test_entity: 'ID123455',
        space: 'SPACE123'
      };
      resource.context.request.body = {
        test_entity: {
          test: 'test9'
        }
      };
      resource.getRecordId();
      resource.getRecordBody();
      resource.beforeUpdate();
      resource.session = {};
      let e;
      try {
        await resource.checkOwner();
      } catch (error) {
        e = error;
      }
      assert.instanceOf(e, httpErrors.Unauthorized);
      resource.session = {
        uid: 'ID123',
        userIsAdmin: false
      };
      resource.context.pathParams.test_entity = 'ID0123456';
      try {
        await resource.checkOwner();
      } catch (error) {
        e = error;
      }
      assert.instanceOf(e, httpErrors.NotFound);
      resource.context.pathParams.test_entity = 'ID123456';
      try {
        await resource.checkOwner();
      } catch (error) {
        e = error;
      }
      assert.instanceOf(e, httpErrors.Forbidden);
      resource.context.pathParams.test_entity = 'ID123457';
      await resource.checkOwner();
    });
  });
  describe('.checkExistence', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check if entity exists', async () => {
      const KEY = 'TEST_RESOURCE_102';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @attribute({ type: 'string' }) ownerId;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestCollection';
        @meta static object = {};
      }
      let resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const { collectionName } = resource;
      const boundCollection = TestCollection.new();
      boundCollection.setName(collectionName);
      boundCollection.setData({
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      await boundCollection.create({
        id: 'ID123456',
        test: 'test',
        ownerId: 'ID124'
      });
      await boundCollection.create({
        id: 'ID123457',
        test: 'test',
        ownerId: 'ID123'
      });
      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      resource = TestResource.new();
      resource.initializeNotifier(KEY);
      resource.context = Test.NS.Context.new(switchMediator, req, res);
      resource.context.pathParams = {
        test_entity: 'ID123455',
        space: 'SPACE123'
      };
      resource.context.request.body = {
        test_entity: {
          test: 'test9'
        }
      };
      resource.getRecordId();
      resource.session = {
        uid: 'ID123',
        userIsAdmin: false
      };
      let e;
      try {
        await resource.checkExistence();
      } catch (error) {
        e = error;
      }
      assert.instanceOf(e, httpErrors.NotFound);
      resource.context.pathParams.test_entity = 'ID123457';
      resource.getRecordId();
      await resource.checkExistence();
    });
  });
  describe('.adminOnly', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check if user is administrator', async () => {
      const KEY = 'TEST_RESOURCE_004';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @attribute({ type: 'string' }) ownerId;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestCollection';
        @meta static object = {};
      }
      let resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const { collectionName } = resource;
      const boundCollection = TestCollection.new();
      boundCollection.setName(collectionName);
      boundCollection.setData({
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      await boundCollection.create({
        id: 'ID123456',
        test: 'test',
        ownerId: 'ID124'
      });
      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      resource = TestResource.new();
      resource.initializeNotifier(KEY);
      resource.context = Test.NS.Context.new(switchMediator, req, res);
      resource.context.pathParams = {
        test_entity: 'ID123456',
        space: 'SPACE123'
      };
      resource.context.request.body = {
        test_entity: {
          test: 'test9'
        }
      };
      resource.getRecordId();
      resource.getRecordBody();
      resource.beforeUpdate();
      resource.session = {};
      let e;
      try {
        await resource.checkOwner();
      } catch (error) {
        e = error;
      }
      assert.instanceOf(e, httpErrors.Unauthorized);
      resource.session = {
        uid: 'ID123'
      };
      try {
        await resource.adminOnly();
      } catch (error) {
        e = error;
      }
      assert.instanceOf(e, httpErrors.Forbidden);
      resource.session = {
        uid: 'ID123',
        userIsAdmin: true
      };
      await resource.adminOnly();
    });
  });
  describe('.doAction', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should run specified action', async () => {
      const KEY = 'TEST_RESOURCE_104';
      facade = LeanES.NS.Facade.getInstance(KEY);
      const testAction = sinon.spy(function () {
        return true;
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {};
        @method getDelayed() {
          return [];
        }
        constructor(...args) {
          super(...args);
          this.jobs = {};
        }
      }
      const resque = TestResque.new();
      resque.setName(LeanES.NS.RESQUE);
      resque.setData({
        data: []
      });
      facade.registerProxy(resque);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @action test(context) {
          testAction(context);
        }
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }
      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      let resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new(switchMediator, req, res);
      await resource.doAction('test', context);
      assert.isTrue(testAction.called);
      assert.isTrue(testAction.calledWith(context));
    });
  });
  describe('.saveDelayeds', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should save delayed jobs from cache into queue', async () => {
      const MULTITON_KEY = 'TEST_RESOURCE_105|>123456765432';
      facade = LeanES.NS.Facade.getInstance(MULTITON_KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {};
        @method getDelayed() {
          return [];
        }
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
        @method getQueue(asQueueName) {
          return _.find(this.getData().data, {
            name: asQueueName
          });
        }
        @method pushJob(name, scriptName, data, delayUntil) {
          const id = LeanES.NS.Utils.uuid.v4();
          this.jobs[id] = { name, scriptName, data, delayUntil };
          return id;
        }
        constructor(...args) {
          super(...args);
          this.jobs = {};
        }
      }
      const resque = TestResque.new();
      resque.setName(LeanES.NS.RESQUE);
      resque.setData({
        data: []
      });
      facade.registerProxy(resque);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
      }
      const resource = TestResource.new();
      resource.initializeNotifier(MULTITON_KEY);
      const DELAY = Date.now() + 1000000;
      await resque.create('TEST_QUEUE_1', 4);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data1'
      }, DELAY);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data2'
      }, DELAY);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data3'
      }, DELAY);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data4'
      }, DELAY);
      await resource.saveDelayeds({ facade });
      const delayeds = resque.jobs;
      let index = 0;
      for (let id in delayeds) {
        const delayed = delayeds[id];
        assert.isDefined(delayed);
        assert.isNotNull(delayed);
        assert.include(delayed, {
          name: 'TEST_QUEUE_1',
          scriptName: 'TestScript',
          delayUntil: DELAY
        });
        assert.deepEqual(delayed.data, {
          data: `data${index + 1}`
        });
        ++index;
      }
    });
  });
  describe('.writeTransaction', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should test if transaction is needed', async () => {
      const KEY = 'TEST_RESOURCE_106';
      facade = LeanES.NS.Facade.getInstance(KEY);
      const testAction = sinon.spy(function () { });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @action test() {
          testAction();
        }
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      let resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const switchM = TestSwitch.new();
      switchM.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(switchM);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new(switchMediator, req, res);
      assert.isFalse(await resource.writeTransaction('test', context));
      context.request.method = 'POST';
      assert.isTrue(await resource.writeTransaction('test', context));
    });
  });
});
