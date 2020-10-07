const { expect, assert } = require('chai');
const sinon = require('sinon');
const EventEmitter = require('events');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  RollbackCommand,
  initialize, module: moduleD, nameBy, meta, constant, mixin, property, method, attribute, action
} = LeanES.NS;

describe('RollbackCommand', () => {
  describe('.new', () => {
    it('should create new command', () => {
      const command = RollbackCommand.new();
      assert.instanceOf(command, RollbackCommand);
    });
  });
  describe('.initializeNotifier', () => {
    it('should initialize command', () => {
      const KEY = 'TEST_ROLLBACK_COMMAND_001';
      const facade = LeanES.NS.Facade.getInstance(KEY);

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
        @attribute({type: 'string'}) test
        @method init() {
          this.super(...arguments);
          this.type = 'TestRecord'
        }
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestMemoryCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestMemoryCollection';
        @meta static object = {};
      }
      facade.registerProxy(TestMemoryCollection.new(LeanES.NS.MIGRATIONS, {
        delegate: TestRecord,
        serializer: LeanES.NS.Serializer
      }));
      const command = RollbackCommand.new();
      command.initializeNotifier(KEY);
      assert.equal(command.migrationsCollection, facade.retrieveProxy(LeanES.NS.MIGRATIONS));
      assert.isNotNull(command.migrationsCollection);
      assert.isDefined(command.migrationsCollection);
      facade.remove();
    });
  });
  describe('migrationsDir', () => {
    it('should get migrations directory path', () => {
      const KEY = 'TEST_ROLLBACK_COMMAND_002';
      const facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      @mixin(LeanES.NS.SchemaModuleMixin)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      @initialize
      @moduleD(Test)
      class TestConfiguration extends LeanES.NS.Configuration {
        @nameBy static __filename = 'TestConfiguration';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) test
        @method init() {
          this.super(...arguments);
          this.type = 'TestRecord'
        }
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestMemoryCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestMemoryCollection';
        @meta static object = {};
      }
      facade.registerProxy(TestMemoryCollection.new(LeanES.NS.MIGRATIONS, {
        delegate: TestRecord,
        serializer: LeanES.NS.Serializer
      }));
      facade.registerProxy(TestConfiguration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT));

      const command = RollbackCommand.new();
      command.initializeNotifier(KEY);
      const { migrationsDir } = command;
      console.log('Root', Test.NS);

      assert.equal(migrationsDir, `${Test.NS.ROOT}/migrations`);
      facade.remove();
    });
  });
  describe('migrationsNames', () => {
    it('should get migration names', () => {
      const KEY = 'TEST_ROLLBACK_COMMAND_003';
      const facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      @mixin(LeanES.NS.SchemaModuleMixin)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
      }

      @initialize
      @moduleD(Test)
      class TestConfiguration extends LeanES.NS.Configuration {
        @nameBy static __filename = 'TestConfiguration';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @attribute({type: 'string'}) test
        @method init() {
          this.super(...arguments);
          this.type = 'TestRecord'
        }
      }

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @mixin(LeanES.NS.GenerateUuidIdMixin)
      @moduleD(Test)
      class TestMemoryCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestMemoryCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestCommand extends RollbackCommand {
        @nameBy static __filename = 'TestCommand';
        @meta static object = {};
      }
      facade.registerProxy(TestMemoryCollection.new(LeanES.NS.MIGRATIONS, {
        delegate: TestRecord,
        serializer: LeanES.NS.Serializer
      }));
      facade.registerProxy(TestConfiguration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT));

      @initialize
      @moduleD(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      facade.registerMediator(ApplicationMediator.new(LeanES.NS.APPLICATION_MEDIATOR, TestApplication.new()));
      const command = TestCommand.new();
      command.initializeNotifier(KEY);
      const migrationNames = command.migrationNames();
      assert.deepEqual(migrationNames, [ '01_migration', '02_migration', '03_migration' ]);
      facade.remove();
    });
  });
  describe('.rollback', () => {
    it('should run migrations', () => {

    })
  })
});

