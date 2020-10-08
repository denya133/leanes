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

describe('MigrateCommand', () => {
  describe('.new', () => {
    it('should create new command', () => {
      const command = LeanES.NS.MigrateCommand.new();
      assert.instanceOf(command, LeanES.NS.MigrateCommand);
    });
  });
  describe('.initializeNotifier', () => {
    it('should initialize command', () => {
      const KEY = 'TEST_MIGRATE_COMMAND_001';
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
        @property entityName = 'TestEntity';
        @attribute({ type: 'string' }) test;
        @method init() {
          this.super(...arguments);
          this.type = 'TestRecord';
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
      const command = LeanES.NS.MigrateCommand.new();
      command.initializeNotifier(KEY);
      assert.equal(command.migrationsCollection, facade.retrieveProxy(LeanES.NS.MIGRATIONS));
      assert.isNotNull(command.migrationsCollection);
      assert.isDefined(command.migrationsCollection);
      facade.remove();
    });
  });
  describe('.migrationsDir', () => {
    it('should get migrations directory path', () => {
      const KEY = 'TEST_MIGRATE_COMMAND_002';
      const facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
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
        @attribute({ type: 'string' }) test;
        @method init() {
          this.super(...arguments);
          this.type = 'TestRecord';
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
      const command = LeanES.NS.MigrateCommand.new();
      command.initializeNotifier(KEY);
      const { migrationsDir } = command;
      assert.equal(migrationsDir, `${Test.NS.ROOT}/migrations`);
      facade.remove();
    });
  });
  describe('.migrationNames', () => {
    it('should get migration names', () => {
      const KEY = 'TEST_MIGRATE_COMMAND_003';
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
        @attribute({ type: 'string' }) test;
        @method init() {
          this.super(...arguments);
          this.type = 'TestRecord';
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
      class TestCommand extends LeanES.NS.MigrateCommand {
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
      console.log(',.,.,.,.migrationNames', command.migrationNames);
      const migrationNames = command.migrationNames;

      assert.deepEqual(migrationNames, ['01_migration', '02_migration', '03_migration']);
      facade.remove();
    });
  });
  describe('.migrate', () => {
    it('should run migrations', async () => {
      const KEY = 'TEST_MIGRATE_COMMAND_004';
      const facade = LeanES.NS.Facade.getInstance(KEY);
      const defineMigration = function (Module) {
        @initialize
        @moduleD(Module)
        class TestMigration extends LeanES.NS.Migration {
          @nameBy static __filename = 'TestMigration';
          @meta static object = {};
          @method static findRecordByName() {
            return Test.NS.TestMigration;
          }
          @method init() {
            this.super(...arguments);
            this.type = 'Test::TestMigration';
          }
        }
      };

      @initialize
      @mixin(LeanES.NS.SchemaModuleMixin)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }
      defineMigration(Test.Module);

      @initialize
      @moduleD(Test)
      class TestConfiguration extends LeanES.NS.Configuration {
        @nameBy static __filename = 'TestConfiguration';
        @meta static object = {};
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
      class TestCommand extends LeanES.NS.MigrateCommand {
        @nameBy static __filename = 'TestCommand';
        @meta static object = {};
      }

      facade.registerProxy(TestMemoryCollection.new(LeanES.NS.MIGRATIONS, {
        delegate: Test.NS.TestMigration,
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
      const migrationNames = command.migrationNames;
      const untilName = '00000000000002_second_migration';
      await command.migrate({
        until: untilName
      });
      const collectionData = facade.retrieveProxy(LeanES.NS.MIGRATIONS)[Symbol.for('~collection')];
      for (let i = 0; i < migrationNames.length; i++) {
        const migrationName = migrationNames[i];
        assert.property(collectionData, migrationName);
        if (migrationName === untilName) {
          break;
        }
      }
      facade.remove();
    });
  });
  describe('.execute', () => {
    it('should run migrations via "execute"', async () => {
       const KEY = 'TEST_MIGRATE_COMMAND_005';
        const facade = LeanES.NS.Facade.getInstance(KEY);
        const trigger = new EventEmitter();
        const defineMigration = function (Module) {
          @initialize
          @moduleD(Module)
          class TestMigration extends LeanES.NS.Migration {
            @nameBy static __filename = 'TestMigration';
            @meta static object = {};
            @method static findRecordByName() {
              return Test.NS.TestMigration;
            }
            @method init() {
              this.super(...arguments);
              this.type = 'TestMigration';
            }
          }
        };

        @initialize
        @mixin(LeanES.NS.SchemaModuleMixin)
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant ROOT = `${__dirname}/config/root2`;
        }
        defineMigration(Test.Module);

        @initialize
        @moduleD(Test)
        class TestConfiguration extends LeanES.NS.Configuration {
          @nameBy static __filename = 'TestConfiguration';
          @meta static object = {};
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
        class TestCommand extends LeanES.NS.MigrateCommand {
          @nameBy static __filename = 'TestCommand';
          @meta static object = {};
          @method async migrate(options) {
            const result = await this.super(options);
            trigger.emit('MIGRATE', options);
            return result;
          }
        }
        facade.registerProxy(TestMemoryCollection.new(LeanES.NS.MIGRATIONS, {
          delegate: Test.NS.TestMigration,
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
        const untilName = '00000000000002_second_migration';
        const promise = new Promise(function(resolve, reject) {
          trigger.once('MIGRATE', function(options) {
            resolve(options);
          });
        });
        await command.execute(LeanES.NS.Notification.new(LeanES.NS.MIGRATE, {
          until: untilName
        }));
        options = await promise;
        assert.deepEqual(options, {
          until: untilName
        });
        facade.remove();
    });
  });
});