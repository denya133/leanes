describe('Migration', () => {
  describe('.createEdgeCollection', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step for create edge collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_003';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.createEdgeCollection('collectionName1', 'collectionName2', {
            prop: 'prop'
          });
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: [
            'collectionName1',
            'collectionName2',
            {
              prop: 'prop'
            }
          ],
          method: 'createEdgeCollection'
        });
      });
    });
  });
  describe('.addField', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to add field in record at collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_004';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.addField('collectionName', 'attr1', 'number');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['collectionName', 'attr1', 'number'],
          method: 'addField'
        });
      });
    });
  });
  describe('.addIndex', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to add index in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_005';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.addIndex('collectionName', ['attr1', 'attr2'], {
            type: "hash"
          });
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: [
            'collectionName',
            ['attr1',
            'attr2'],
            {
              type: "hash"
            }
          ],
          method: 'addIndex'
        });
      });
    });
  });
  describe('.addTimestamps', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to add timesteps in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_006';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.addTimestamps('collectionName', {
            prop: 'prop'
          });
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: [
            'collectionName',
            {
              prop: 'prop'
            }
          ],
          method: 'addTimestamps'
        });
      });
    });
  });
  describe('.changeCollection', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to change collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_007';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.changeCollection('collectionName', {
            prop: 'prop'
          });
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: [
            'collectionName',
            {
              prop: 'prop'
            }
          ],
          method: 'changeCollection'
        });
      });
    });
  });
  describe('.changeField', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to change field in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_008';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.changeField('collectionName', 'attr1', 'string');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['collectionName', 'attr1', 'string'],
          method: 'changeField'
        });
      });
    });
  });
  describe('.renameField', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to rename field in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_009';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.renameField('collectionName', 'oldAttrName', 'newAttrName');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['collectionName', 'oldAttrName', 'newAttrName'],
          method: 'renameField'
        });
      });
    });
  });
  describe('.renameIndex', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to rename index in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_010';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.renameIndex('collectionName', 'oldIndexname', 'newIndexName');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['collectionName', 'oldIndexname', 'newIndexName'],
          method: 'renameIndex'
        });
      });
    });
  });
  describe('.renameCollection', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to rename collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_011';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.renameCollection('oldCollectionName', 'newCollectionName');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['oldCollectionName', 'newCollectionName'],
          method: 'renameCollection'
        });
      });
    });
  });
  describe('.dropCollection', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to drop collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_012';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.dropCollection('collectionName');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['collectionName'],
          method: 'dropCollection'
        });
      });
    });
  });
  describe('.dropEdgeCollection', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to drop edge collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_013';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.dropEdgeCollection('collectionName1', 'collectionName2');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['collectionName1', 'collectionName2'],
          method: 'dropEdgeCollection'
        });
      });
    });
  });
  describe('.removeField', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to remove field in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_014';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.removeField('collectionName', 'attr2');
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: ['collectionName', 'attr2'],
          method: 'removeField'
        });
      });
    });
  });
  describe('.removeIndex', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to remove index in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_015';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.removeIndex('collectionName', ['attr1', 'attr2'], {
            type: "hash",
            unique: true,
            sparse: false
          });
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: [
            'collectionName',
            ['attr1',
            'attr2'],
            {
              type: "hash",
              unique: true,
              sparse: false
            }
          ],
          method: 'removeIndex'
        });
      });
    });
  });
  describe('.removeTimestamps', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add step to remove timestamps in collection', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_016';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        BaseMigration.change(() => {
          return this.removeTimestamps('collectionName', {
            prop: 'prop'
          });
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: [
            'collectionName',
            {
              prop: 'prop'
            }
          ],
          method: 'removeTimestamps'
        });
      });
    });
  });
  describe('.reversible', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should add reversible step', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, reversibleArg;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_017';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        reversibleArg = co.wrap(function*(dir) {
          yield dir.up(co.wrap(function*() {}));
          yield dir.down(co.wrap(function*() {}));
        });
        BaseMigration.change(() => {
          return this.reversible(reversibleArg);
        });
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.lengthOf(migration.steps, 1);
        assert.deepEqual(migration.steps[0], {
          args: [reversibleArg],
          method: 'reversible'
        });
      });
    });
  });
  describe('#execute', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run generator closure with some code', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, spyExecute;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_018';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        spyExecute = sinon.spy(function*() {});
        yield migration.execute.body.call(migration, spyExecute);
        assert.isTrue(spyExecute.called);
      });
    });
  });
  describe('.change', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run closure with some code', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, spyChange;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_019';
        facade = LeanES.NS.Facade.getInstance(KEY);
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        spyChange = sinon.spy(() => {});
        BaseMigration.change(spyChange);
        assert.isTrue(spyChange.called);
      });
    });
  });
  describe('#up', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run steps in forward direction', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, spyAddField, spyCreateCollection, spyReversibleUp;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_020';
        facade = LeanES.NS.Facade.getInstance(KEY);
        spyReversibleUp = sinon.spy(function*() {});
        spyCreateCollection = sinon.spy(function*() {});
        spyAddField = sinon.spy(function*() {});
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.change(() => {
            this.reversible(function*({up, down}) {
              yield up(spyReversibleUp);
              yield this.createCollection('TEST_COLLECTION');
            });
            return this.addField('collectionName', 'TEST_FIELD', 'number');
          });

          BaseMigration.public(BaseMigration.async({
            createCollection: FuncG([String, MaybeG(Object)])
          }, {
            default: spyCreateCollection
          }));

          BaseMigration.public(BaseMigration.async({
            addField: FuncG([
              String,
              String,
              UnionG(EnumG(SUPPORTED_TYPES),
              InterfaceG({
                type: EnumG(SUPPORTED_TYPES),
                default: AnyT
              }))
            ])
          }, {
            default: spyAddField
          }));

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        yield migration.up();
        assert.isTrue(spyReversibleUp.called);
        assert.isTrue(spyCreateCollection.calledAfter(spyReversibleUp));
        assert.isTrue(spyAddField.calledAfter(spyCreateCollection));
        assert.equal(spyCreateCollection.args[0][0], 'TEST_COLLECTION');
        assert.deepEqual(spyAddField.args[0], ['collectionName', 'TEST_FIELD', 'number']);
      });
    });
  });
  describe('#down', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run steps in backward direction', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, spyCreateCollection, spyRemoveField, spyRenameIndex, spyReversibleDown;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_021';
        facade = LeanES.NS.Facade.getInstance(KEY);
        spyReversibleDown = sinon.spy(function*() {});
        spyCreateCollection = sinon.spy(function*() {});
        spyRenameIndex = sinon.spy(function*() {});
        spyRemoveField = sinon.spy(function*() {});
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends LeanES.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.change(() => {
            this.reversible(function*({up, down}) {
              yield down(spyReversibleDown);
              yield this.createCollection('TEST_COLLECTION');
            });
            this.addField('collectionName', 'TEST_FIELD', 'number');
            return this.renameIndex('collectionName', 'TEST_INDEX_1', 'TEST_INDEX_2');
          });

          BaseMigration.public(BaseMigration.async({
            createCollection: FuncG([String, MaybeG(Object)])
          }, {
            default: spyCreateCollection
          }));

          BaseMigration.public(BaseMigration.async({
            renameIndex: FuncG([String, String, String])
          }, {
            default: spyRenameIndex
          }));

          BaseMigration.public(BaseMigration.async({
            removeField: FuncG([String, String])
          }, {
            default: spyRemoveField
          }));

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        yield migration.down();
        assert.isTrue(spyRenameIndex.called);
        assert.isTrue(spyRemoveField.calledAfter(spyRenameIndex));
        assert.isTrue(spyReversibleDown.calledAfter(spyRemoveField));
        assert.isTrue(spyCreateCollection.calledAfter(spyReversibleDown));
        assert.equal(spyCreateCollection.args[0][0], 'TEST_COLLECTION');
        assert.deepEqual(spyRemoveField.args[0], ['collectionName', 'TEST_FIELD', 'number']);
        assert.deepEqual(spyRenameIndex.args[0], ['collectionName', 'TEST_INDEX_2', 'TEST_INDEX_1']);
      });
    });
  });
  describe('.up', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should replace forward stepping caller', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, spyUp;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_022';
        facade = LeanES.NS.Facade.getInstance(KEY);
        spyUp = sinon.spy(function*() {});
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends Test.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.up.body.call(BaseMigration, spyUp);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.isFalse(spyUp.called);
        yield migration.up();
        assert.isTrue(spyUp.called);
      });
    });
  });
  describe('.down', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should replace forward stepping caller', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, spyDown;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_023';
        facade = LeanES.NS.Facade.getInstance(KEY);
        spyDown = sinon.spy(function*() {});
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends Test.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.down.body.call(BaseMigration, spyDown);

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        assert.isFalse(spyDown.called);
        yield migration.down();
        assert.isTrue(spyDown.called);
      });
    });
  });
  return describe('#migrate', () => {
    var facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run steps in forward direction', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, spyAddField, spyCreateCollection, spyReversibleUp;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_024';
        facade = LeanES.NS.Facade.getInstance(KEY);
        spyReversibleUp = sinon.spy(function*() {});
        spyCreateCollection = sinon.spy(function*() {});
        spyAddField = sinon.spy(function*() {});
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends Test.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.change(() => {
            this.reversible(function*({up, down}) {
              yield up(spyReversibleUp);
              yield this.createCollection('TEST_COLLECTION');
            });
            return this.addField('collectionName', 'TEST_FIELD', 'number');
          });

          BaseMigration.public(BaseMigration.async({
            createCollection: FuncG([String, MaybeG(Object)])
          }, {
            default: spyCreateCollection
          }));

          BaseMigration.public(BaseMigration.async({
            addField: FuncG([
              String,
              String,
              UnionG(EnumG(SUPPORTED_TYPES),
              InterfaceG({
                type: EnumG(SUPPORTED_TYPES),
                default: AnyT
              }))
            ])
          }, {
            default: spyAddField
          }));

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        yield migration.migrate(BaseMigration.NS.UP);
        assert.isTrue(spyReversibleUp.called);
        assert.isTrue(spyCreateCollection.calledAfter(spyReversibleUp));
        assert.isTrue(spyAddField.calledAfter(spyCreateCollection));
        assert.equal(spyCreateCollection.args[0][0], 'TEST_COLLECTION');
        // assert.equal spyAddField.args[0][0], 'TEST_FIELD'
        assert.deepEqual(spyAddField.args[0], ['collectionName', 'TEST_FIELD', 'number']);
      });
    });
    it('should run steps in backward direction', () => {
      return co(function*() {
        var BaseMigration, KEY, Test, TestsCollection, collection, collectionName, migration, spyCreateCollection, spyRemoveField, spyRenameIndex, spyReversibleDown;
        collectionName = 'TestsCollection';
        KEY = 'TEST_MIGRATION_025';
        facade = LeanES.NS.Facade.getInstance(KEY);
        spyReversibleDown = sinon.spy(function*() {});
        spyCreateCollection = sinon.spy(function*() {});
        spyRenameIndex = sinon.spy(function*() {});
        spyRemoveField = sinon.spy(function*() {});
        Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(__dirname);

          Test.initialize();

          return Test;

        }).call(this);
        TestsCollection = (() => {
          class TestsCollection extends Test.NS.Collection {};

          TestsCollection.inheritProtected();

          TestsCollection.include(LeanES.NS.MemoryCollectionMixin);

          TestsCollection.include(LeanES.NS.GenerateUuidIdMixin);

          TestsCollection.module(Test);

          TestsCollection.initialize();

          return TestsCollection;

        }).call(this);
        BaseMigration = (() => {
          class BaseMigration extends LeanES.NS.Migration {};

          BaseMigration.inheritProtected();

          BaseMigration.module(Test);

          BaseMigration.change(() => {
            this.reversible(function*({up, down}) {
              yield down(spyReversibleDown);
              yield this.createCollection('TEST_COLLECTION');
            });
            this.addField('collectionName', 'TEST_FIELD', 'number');
            return this.renameIndex('collectionName', 'TEST_INDEX_3', 'TEST_INDEX_4');
          });

          BaseMigration.public(BaseMigration.async({
            createCollection: FuncG([String, MaybeG(Object)])
          }, {
            default: spyCreateCollection
          }));

          BaseMigration.public(BaseMigration.async({
            renameIndex: FuncG([String, String, String])
          }, {
            default: spyRenameIndex
          }));

          BaseMigration.public(BaseMigration.async({
            removeField: FuncG([String, String])
          }, {
            default: spyRemoveField
          }));

          BaseMigration.initialize();

          return BaseMigration;

        }).call(this);
        collection = TestsCollection.new(collectionName, {
          delegate: 'BaseMigration'
        });
        facade.registerProxy(collection);
        migration = BaseMigration.new({
          type: 'Test::BaseMigration'
        }, collection);
        yield migration.migrate(BaseMigration.NS.DOWN);
        assert.isTrue(spyRenameIndex.called);
        assert.isTrue(spyRemoveField.calledAfter(spyRenameIndex));
        assert.isTrue(spyReversibleDown.calledAfter(spyRemoveField));
        assert.isTrue(spyCreateCollection.calledAfter(spyReversibleDown));
        assert.equal(spyCreateCollection.args[0][0], 'TEST_COLLECTION');
        assert.deepEqual(spyRemoveField.args[0], ['collectionName', 'TEST_FIELD', 'number']);
        assert.deepEqual(spyRenameIndex.args[0], ['collectionName', 'TEST_INDEX_4', 'TEST_INDEX_3']);
      });
    });
  });
});
