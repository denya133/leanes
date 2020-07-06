const EventEmitter = require('events');
const {expect, assert} = require('chai');
const sinon = require('sinon');
const LeanES = require.main.require('lib');
const {co} = LeanES.prototype.Utils;

describe('DelayedJobScript', function() {
  describe('.new', function() {
    return it('should create new command', function() {
      return co(function*() {
        const command = LeanES.prototype.DelayedJobScript.new();
        assert.instanceOf(command, LeanES.prototype.DelayedJobScript);
      });
    });
  });
  return describe('#body', function() {
    var facade;
    facade = null;
    afterEach(function() {
      return facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run delayed job script (class, sync)', function() {
      return co(function*() {
        var ApplicationMediator, KEY, Test, TestApplication, TestClass, TestScript, body, command, data, promise, trigger;
        KEY = 'TEST_DELAYED_JOB_SCRIPT_001';
        facade = LeanES.prototype.Facade.getInstance(KEY);
        trigger = new EventEmitter();
        Test = (function() {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(`${__dirname}/config/root2`);

          Test.initialize();

          return Test;

        }).call(this);
        TestScript = (function() {
          class TestScript extends LeanES.prototype.DelayedJobScript {};

          TestScript.inheritProtected();

          TestScript.module(Test);

          TestScript.initialize();

          return TestScript;

        }).call(this);
        TestClass = (function() {
          class TestClass extends LeanES.prototype.CoreObject {};

          TestClass.inheritProtected();

          TestClass.module(Test);

          TestClass.public(TestClass.static({
            test: Function
          }, {
            default: function(...args) {
              trigger.emit('RUN_SCRIPT', args);
            }
          }));

          TestClass.initialize();

          return TestClass;

        }).call(this);
        ApplicationMediator = (function() {
          class ApplicationMediator extends LeanES.prototype.Mediator {};

          ApplicationMediator.inheritProtected();

          ApplicationMediator.module(Test);

          ApplicationMediator.initialize();

          return ApplicationMediator;

        }).call(this);
        TestApplication = (function() {
          class TestApplication extends LeanES.prototype.CoreObject {};

          TestApplication.inheritProtected();

          TestApplication.module(Test);

          TestApplication.initialize();

          return TestApplication;

        }).call(this);
        facade.registerMediator(ApplicationMediator.new(LeanES.prototype.APPLICATION_MEDIATOR, TestApplication.new()));
        command = TestScript.new();
        command.initializeNotifier(KEY);
        promise = LeanES.prototype.Promise.new(function(resolve, reject) {
          trigger.once('RUN_SCRIPT', function(options) {
            return resolve(options);
          });
        });
        body = {
          moduleName: 'Test',
          replica: (yield TestClass.constructor.replicateObject(TestClass)),
          methodName: 'test',
          args: ['ARG_1', 'ARG_2', 'ARG_3']
        };
        command.execute(LeanES.prototype.Notification.new('TEST', body, 'TEST_TYPE'));
        data = (yield promise);
        assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
      });
    });
    it('should run delayed job script (instance, sync)', function() {
      return co(function*() {
        var ApplicationMediator, KEY, Test, TestApplication, TestClass, TestScript, body, command, data, promise, trigger;
        KEY = 'TEST_DELAYED_JOB_SCRIPT_002';
        facade = LeanES.prototype.Facade.getInstance(KEY);
        trigger = new EventEmitter();
        Test = (function() {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(`${__dirname}/config/root2`);

          Test.initialize();

          return Test;

        }).call(this);
        TestScript = (function() {
          class TestScript extends LeanES.prototype.DelayedJobScript {};

          TestScript.inheritProtected();

          TestScript.module(Test);

          TestScript.initialize();

          return TestScript;

        }).call(this);
        TestClass = (function() {
          class TestClass extends LeanES.prototype.CoreObject {};

          TestClass.inheritProtected();

          TestClass.module(Test);

          TestClass.public({
            test: Function
          }, {
            default: function(...args) {
              trigger.emit('RUN_SCRIPT', args);
            }
          });

          TestClass.initialize();

          return TestClass;

        }).call(this);
        ApplicationMediator = (function() {
          class ApplicationMediator extends LeanES.prototype.Mediator {};

          ApplicationMediator.inheritProtected();

          ApplicationMediator.module(Test);

          ApplicationMediator.initialize();

          return ApplicationMediator;

        }).call(this);
        TestApplication = (function() {
          class TestApplication extends LeanES.prototype.CoreObject {};

          TestApplication.inheritProtected();

          TestApplication.module(Test);

          TestApplication.initialize();

          return TestApplication;

        }).call(this);
        facade.registerMediator(ApplicationMediator.new(LeanES.prototype.APPLICATION_MEDIATOR, TestApplication.new()));
        command = TestScript.new();
        command.initializeNotifier(KEY);
        promise = LeanES.prototype.Promise.new(function(resolve, reject) {
          trigger.once('RUN_SCRIPT', function(options) {
            return resolve(options);
          });
        });
        body = {
          moduleName: 'Test',
          replica: (yield TestClass.replicateObject(TestClass.new())),
          methodName: 'test',
          args: ['ARG_1', 'ARG_2', 'ARG_3']
        };
        command.execute(LeanES.prototype.Notification.new('TEST', body, 'TEST_TYPE'));
        data = (yield promise);
        assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
      });
    });
    it('should run delayed job script (class, async)', function() {
      return co(function*() {
        var ApplicationMediator, KEY, Test, TestApplication, TestClass, TestScript, body, command, data, promise, trigger;
        KEY = 'TEST_DELAYED_JOB_SCRIPT_003';
        facade = LeanES.prototype.Facade.getInstance(KEY);
        trigger = new EventEmitter();
        Test = (function() {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(`${__dirname}/config/root2`);

          Test.initialize();

          return Test;

        }).call(this);
        TestScript = (function() {
          class TestScript extends LeanES.prototype.DelayedJobScript {};

          TestScript.inheritProtected();

          TestScript.module(Test);

          TestScript.initialize();

          return TestScript;

        }).call(this);
        TestClass = (function() {
          class TestClass extends LeanES.prototype.CoreObject {};

          TestClass.inheritProtected();

          TestClass.module(Test);

          TestClass.public(TestClass.async(TestClass.static({
            test: Function
          }, {
            default: function*(...args) {
              trigger.emit('RUN_SCRIPT', args);
            }
          })));

          TestClass.initialize();

          return TestClass;

        }).call(this);
        ApplicationMediator = (function() {
          class ApplicationMediator extends LeanES.prototype.Mediator {};

          ApplicationMediator.inheritProtected();

          ApplicationMediator.module(Test);

          ApplicationMediator.initialize();

          return ApplicationMediator;

        }).call(this);
        TestApplication = (function() {
          class TestApplication extends LeanES.prototype.CoreObject {};

          TestApplication.inheritProtected();

          TestApplication.module(Test);

          TestApplication.initialize();

          return TestApplication;

        }).call(this);
        facade.registerMediator(ApplicationMediator.new(LeanES.prototype.APPLICATION_MEDIATOR, TestApplication.new()));
        command = TestScript.new();
        command.initializeNotifier(KEY);
        promise = LeanES.prototype.Promise.new(function(resolve, reject) {
          trigger.once('RUN_SCRIPT', function(options) {
            return resolve(options);
          });
        });
        body = {
          moduleName: 'Test',
          replica: (yield TestClass.constructor.replicateObject(TestClass)),
          methodName: 'test',
          args: ['ARG_1', 'ARG_2', 'ARG_3']
        };
        command.execute(LeanES.prototype.Notification.new('TEST', body, 'TEST_TYPE'));
        data = (yield promise);
        assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
      });
    });
    return it('should run delayed job script (instance, async)', function() {
      return co(function*() {
        var ApplicationMediator, KEY, Test, TestApplication, TestClass, TestScript, body, command, data, promise, trigger;
        KEY = 'TEST_DELAYED_JOB_SCRIPT_004';
        facade = LeanES.prototype.Facade.getInstance(KEY);
        trigger = new EventEmitter();
        Test = (function() {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.root(`${__dirname}/config/root2`);

          Test.initialize();

          return Test;

        }).call(this);
        TestScript = (function() {
          class TestScript extends LeanES.prototype.DelayedJobScript {};

          TestScript.inheritProtected();

          TestScript.module(Test);

          TestScript.initialize();

          return TestScript;

        }).call(this);
        TestClass = (function() {
          class TestClass extends LeanES.prototype.CoreObject {};

          TestClass.inheritProtected();

          TestClass.module(Test);

          TestClass.public(TestClass.async({
            test: Function
          }, {
            default: function*(...args) {
              trigger.emit('RUN_SCRIPT', args);
            }
          }));

          TestClass.initialize();

          return TestClass;

        }).call(this);
        ApplicationMediator = (function() {
          class ApplicationMediator extends LeanES.prototype.Mediator {};

          ApplicationMediator.inheritProtected();

          ApplicationMediator.module(Test);

          ApplicationMediator.initialize();

          return ApplicationMediator;

        }).call(this);
        TestApplication = (function() {
          class TestApplication extends LeanES.prototype.CoreObject {};

          TestApplication.inheritProtected();

          TestApplication.module(Test);

          TestApplication.initialize();

          return TestApplication;

        }).call(this);
        facade.registerMediator(ApplicationMediator.new(LeanES.prototype.APPLICATION_MEDIATOR, TestApplication.new()));
        command = TestScript.new();
        command.initializeNotifier(KEY);
        promise = LeanES.prototype.Promise.new(function(resolve, reject) {
          trigger.once('RUN_SCRIPT', function(options) {
            return resolve(options);
          });
        });
        body = {
          moduleName: 'Test',
          replica: (yield TestClass.replicateObject(TestClass.new())),
          methodName: 'test',
          args: ['ARG_1', 'ARG_2', 'ARG_3']
        };
        command.execute(LeanES.prototype.Notification.new('TEST', body, 'TEST_TYPE'));
        data = (yield promise);
        assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
        return;
      });
    });
  });
});