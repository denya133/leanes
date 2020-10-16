const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Migration,
  initialize, module: moduleD, nameBy, meta, constant, method, attribute, mixin, computed
} = LeanES.NS;
// const { SUPPORTED_TYPES } = Migration.NS

describe('Migration', () => {
  describe('.new', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create migration instance', () => {
      const collectionName = 'TestsCollection';
      const KEY = 'TEST_MIGRATION_001';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class BaseMigration extends LeanES.NS.Migration {
        @nameBy static __filename = 'BaseMigration';
        @meta static object = {};

        @method static change() {}
      }
      const collection = TestsCollection.new();
      collection.setName(collectionName);
      collection.setData({
        delegate: 'BaseMigration'
      });
      facade.registerProxy(collection);
      const migration = BaseMigration.new({
        type: 'Migration'
      }, collection);
      assert.lengthOf(migration.steps, 0);
    });
  });
  describe('.createCollection', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step for create collection', () => {
      const collectionName = 'TestsCollection';
      const KEY = 'TEST_MIGRATION_002';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class BaseMigration extends LeanES.NS.Migration {
        @nameBy static __filename = 'BaseMigration';
        @meta static object = {};

        @method static change() {
          this.createCollection('collectionName', {
            prop: 'prop'
          });
        }
      }
      const collection = TestsCollection.new();
      collection.setName(collectionName);
      collection.setData({
        delegate: 'BaseMigration'
      });
      facade.registerProxy(collection);
      // BaseMigration.change(function () {
      //   return this.createCollection('collectionName', {
      //     prop: 'prop'
      //   });
      // });
      const migration = BaseMigration.new({
        type: 'Test::BaseMigration'
      }, collection);
      console.log('dfdf', migration);
      assert.lengthOf(migration.steps, 1);
      assert.deepEqual(migration.steps[0], {
        args: [
          'collectionName',
          {
            prop: 'prop'
          }
        ],
        method: 'createCollection'
      });
    });
  });
});
