const { expect, assert } = require('chai');
const _ = require('lodash');
const EventEmitter = require('events');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, partOf, nameBy, meta, constant, method
} = LeanES.NS;

describe('DelayedJobScript', () => {
  describe('.new', () => {
    it('should create new command', () => {
      const command = LeanES.NS.DelayedJobScript.new();
      assert.instanceOf(command, LeanES.NS.DelayedJobScript);
    });
  });
  describe('.body', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should run delayed job script (class, sync)', async () => {
      const KEY = 'TEST_DELAYED_JOB_SCRIPT_001';
      facade = LeanES.NS.Facade.getInstance(KEY);
      const trigger = new EventEmitter();

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class TestScript extends LeanES.NS.DelayedJobScript {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method static test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      const mediator = ApplicationMediator.new();
      mediator.setName(LeanES.NS.APPLICATION_MEDIATOR);
      mediator.getViewComponent(TestApplication.new());
      // facade.registerMediator(ApplicationMediator.new(LeanES.NS.APPLICATION_MEDIATOR, TestApplication.new()));
      facade.registerMediator(mediator);
      const command = TestScript.new();
      command.initializeNotifier(KEY);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.constructor.replicateObject(TestClass),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      command.execute(LeanES.NS.Notification.new('TEST', body, 'TEST_TYPE'));
      const data = await promise;
      assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
    it('should run delayed job script (instance, sync)', async () => {
      const KEY = 'TEST_DELAYED_JOB_SCRIPT_002';
      facade = LeanES.NS.Facade.getInstance(KEY);
      const trigger = new EventEmitter();

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class TestScript extends LeanES.NS.DelayedJobScript {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      const mediator = ApplicationMediator.new();
      mediator.setName(LeanES.NS.APPLICATION_MEDIATOR);
      mediator.getViewComponent(TestApplication.new());
      facade.registerMediator(mediator);
      const command = TestScript.new();
      command.initializeNotifier(KEY);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.replicateObject(TestClass.new()),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      command.execute(LeanES.NS.Notification.new('TEST', body, 'TEST_TYPE'));
      const data = await promise;
      assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
    it('should run delayed job script (class, async)', async () => {
      const KEY = 'TEST_DELAYED_JOB_SCRIPT_003';
      facade = LeanES.NS.Facade.getInstance(KEY);
      const trigger = new EventEmitter();

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class TestScript extends LeanES.NS.DelayedJobScript {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method static test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      const mediator = ApplicationMediator.new();
      mediator.setName(LeanES.NS.APPLICATION_MEDIATOR);
      mediator.getViewComponent(TestApplication.new());
      facade.registerMediator(mediator);
      const command = TestScript.new();
      command.initializeNotifier(KEY);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.constructor.replicateObject(TestClass),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      command.execute(LeanES.NS.Notification.new('TEST', body, 'TEST_TYPE'));
      const data = await promise;
      assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
    it('should run delayed job script (instance, async)', async () => {
      const KEY = 'TEST_DELAYED_JOB_SCRIPT_004';
      facade = LeanES.NS.Facade.getInstance(KEY);
      const trigger = new EventEmitter();

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class TestScript extends LeanES.NS.DelayedJobScript {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      facade.registerMediator(ApplicationMediator.new(LeanES.NS.APPLICATION_MEDIATOR, TestApplication.new()));
      const command = TestScript.new();
      command.initializeNotifier(KEY);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.replicateObject(TestClass.new()),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      command.execute(LeanES.NS.Notification.new('TEST', body, 'TEST_TYPE'));
      const data = await promise;
      assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
  });
});
