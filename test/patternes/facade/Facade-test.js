const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  APPLICATION_MEDIATOR,
  initialize, module:moduleD, nameBy, meta, method, property, resolver
} = LeanES.NS;

describe('Facade', () => {
  describe('.getInstance', () => {
    it('should get new or exiciting instance of Facade', () => {
      const { Facade } = LeanES.NS;
      const facade = LeanES.NS.Facade.getInstance('TEST1');
      assert.instanceOf(facade, Facade, 'The `facade` is not an instance of Facade');
      const facade1 = Facade.getInstance('TEST1');
      assert.deepEqual(facade, facade1, 'Instances of facade not equal');
      facade.remove();
    });
  });
  describe('.initializeNotifier', () => {
    it('should initialize notifier', () => {
      const multitonKey = 'TEST2';
      const facade = LeanES.NS.Facade.getInstance(multitonKey);
      expect(facade._multitonKey).to.equal(multitonKey);
      facade.remove();
    });
  });
  describe('.registerCommand', () => {
    it('should register new command', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST3');

        @initialize
        class TestCommand extends LeanES.NS.SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
        }
        facade.registerCommand('TEST_COMMAND', TestCommand);
        assert(facade.hasCommand('TEST_COMMAND'));
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('lazyRegisterCommand', () => {
    let facade = null;
    const INSTANCE_NAME = 'TEST999';
    after(() => {
      if(facade !== null) {
        facade.remove();
      }
    });
    it('should register new command lazily', () => {
      const spy = sinon.spy();

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestCommand extends LeanES.NS.SimpleCommand {
        @nameBy static  __filename = 'TestCommand';
        @meta static object = {};

        @method execute(voNotification: LeanES.NS.NotificationInterface) {
            spy();
        }
      }

      @initialize
      @moduleD(Test)
      class Application extends Test.NS.CoreObject {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
      }

      facade = Test.NS.Facade.getInstance(INSTANCE_NAME);
      facade.registerMediator(Test.NS.Mediator.new(APPLICATION_MEDIATOR, Application.new()));
      const vsNotificationName = 'TEST_COMMAND2';
      facade.lazyRegisterCommand(vsNotificationName, 'TestCommand');
      assert(facade.hasCommand(vsNotificationName));
      facade.sendNotification(vsNotificationName);
      assert(spy.called);
    });
  });
  describe('.removeCommand', () => {
    it('should remove command if present', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST4');

        @initialize
        class TestCommand extends LeanES.NS.SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
        }
        facade.registerCommand('TEST_COMMAND', TestCommand);
        assert(facade.hasCommand('TEST_COMMAND'));
        facade.removeCommand('TEST_COMMAND');
        assert(!facade.hasCommand('TEST_COMMAND'))
        facade.remove();
      }).to.not.throw(Error);
    });
  });
  describe('.hasCommand', () => {
    it('has command', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST5');

        @initialize
        class TestCommand extends LeanES.NS.SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
        }

        facade.registerCommand('TEST_COMMAND', TestCommand);
        assert(facade.hasCommand('TEST_COMMAND'));
        assert(!facade.hasCommand('TEST_COMMAND_ABSENT'))
        facade.remove();
      }).to.not.throw(Error);
    });
  });
  describe('.registerProxy', () => {
    let facade = null;
    const INSTANCE_NAME = 'TEST6';
    after(() => {
      if(facade !== null) {
        facade.remove();
      }
    })
    it('should register new proxy and regiter it', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance(INSTANCE_NAME);
        const onRegister = sinon.spy(() => {});

        @initialize
        class TestProxy extends LeanES.NS.Proxy {
          @nameBy static  __filename = 'TestProxy';
          @meta static object = {};

          @method onRegister() {
            onRegister();
          }
        }
        const proxyData = {data: 'data'};
        const testProxy = TestProxy.new('TEST_PROXY', proxyData);
        facade.registerProxy(testProxy);
        assert(onRegister.called, 'Proxy is not registered');
        onRegister.resetHistory();
        const hasProxy = facade.hasProxy('TEST_PROXY');
        assert(hasProxy, 'Proxy is not registered');
      }).to.not.throw(Error)
    });
  });
  describe('lazyRegisterProxy', () => {
    let facade = null;
    const INSTANCE_NAME = 'TEST66';
    after(() => {
      if(facade !== null) {
        facade.remove();
      }
    });
    it('should create new proxy and register it when needed', () => {
      const onRegister = sinon.spy(() => {});

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestProxy extends LeanES.NS.Proxy {
        @nameBy static  __filename = 'TestProxy';
        @meta static object = {};

        @method onRegister() {
            onRegister();
        }
      }

      @initialize
      @moduleD(Test)
      class Application extends Test.NS.CoreObject {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
      }

      facade = Test.NS.Facade.getInstance(INSTANCE_NAME);
      facade.registerMediator(Test.NS.Mediator.new(APPLICATION_MEDIATOR, Application.new()));
      const proxyData = {data: 'data'};
      facade.lazyRegisterProxy('TEST_PROXY', 'TestProxy', proxyData);
      assert.isFalse(onRegister.called, 'Proxy is already registered');
      onRegister.resetHistory();
      const hasProxy = facade.hasProxy('TEST_PROXY');
      assert(hasProxy, 'Proxy is not registered');
      const testProxy = facade.retrieveProxy('TEST_PROXY');
      assert.instanceOf(testProxy, TestProxy);
      assert(onRegister.called, 'Proxy is not registered')
      onRegister.resetHistory();
    });
  });
  describe('retrieveProxy', () => {
    it('should retrieve registered proxy', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST7');

        @initialize
        class TestProxy extends LeanES.NS.Proxy {
          @nameBy static  __filename = 'TestProxy';
          @meta static object = {};
        }

        const proxyData = {data: 'data'};
        const testProxy = TestProxy.new('TEST_PROXY', proxyData);
        facade.registerProxy(testProxy);
        const retrievedProxy = facade.retrieveProxy('TEST_PROXY');
        assert.deepEqual(retrievedProxy, testProxy, 'Proxy cannot be retrieved');
        const retrievedAbsentProxy = facade.retrieveProxy('TEST_PROXY_ABSENT');
        const hasNoAbsentProxy = !retrievedAbsentProxy;
        assert(hasNoAbsentProxy, 'Absent proxy can be retrieved');
        facade.remove();
      }).to.not.throw(Error);
    });
  });
  describe('.removeProxy', () => {
    it('should create new proxy and register it, after that remove it', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST8');
        const onRemove = sinon.spy(() => {});

        @initialize
        class TestProxy extends LeanES.NS.Proxy {
          @nameBy static  __filename = 'TestProxy';
          @meta static object = {};

          @method onRemove() {
            onRemove();
          }
        }
        const proxyData = {data: 'data'};
        const testProxy = TestProxy.new('TEST_PROXY2', proxyData);
        facade.registerProxy(testProxy);
        const hasProxy = facade.hasProxy('TEST_PROXY2');
        assert(hasProxy, 'Proxy is not registered');
        facade.removeProxy('TEST_PROXY2');
        assert(onRemove.called, 'Proxy is still registered');
        const hasNoProxy = !(facade.hasProxy('TEST_PROXY2'));
        assert(hasNoProxy, 'Proxy is still registered');
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('.hasProxy', () => {
    it('should retrieve registered proxy', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST9');
        @initialize
        class TestProxy extends LeanES.NS.Proxy {
          @nameBy static  __filename = 'TestProxy';
          @meta static object = {};
        }
        const proxyData = {data: 'data'};
        const testProxy = TestProxy.new('TEST_PROXY', proxyData);
        facade.registerProxy(testProxy);
        const hasProxy = facade.hasProxy('TEST_PROXY');
        assert(hasProxy, 'Proxy is absent');
        const hasNoAbsentProxy = !(facade.hasProxy('TEST_PROXY_ABSENT'));
        assert(hasNoAbsentProxy, 'Absent proxy is accessible');
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('.registerMediator', () => {
    it('should register new mediator', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST10');
        const onRegister = sinon.spy(() => {});
        const handleNotification = sinon.spy(() => {});
        const viewComponent = {};

        @initialize
        class TestMediator extends LeanES.NS.Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
          @method listNotificationInterests() {
            return ['TEST_LIST'];
          }
          @method handleNotification() {
            handleNotification();
          }
          @method onRegister() {
            onRegister();
          }
        }

        const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        facade.registerMediator(mediator);
        assert(onRegister.called, 'Mediator is not registered');
        onRegister.resetHistory();
        facade.notifyObservers(LeanES.NS.Notification.new('TEST_LIST'));
        assert(handleNotification.called, 'Mediator cannot subscribe interests');
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('retrieveMediator', () => {
    it('should retrieve registered mediator', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST11');
        const viewComponent = {};

        @initialize
        class TestMediator extends LeanES.NS.Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
        }

        const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        facade.registerMediator(mediator);
        const retrievedMediator = facade.retrieveMediator('TEST_MEDIATOR');
        assert.deepEqual(retrievedMediator, mediator, 'Mediator cannot be retrieved');
        const retrievedAbsentMediator = facade.retrieveMediator('TEST_MEDIATOR_ABSENT');
        assert(!retrievedAbsentMediator, 'Retrieve absent mediator');
        facade.remove();
      }).to.not.throw(Error);
    });
  });
  describe('.removeMediator', () => {
    it('should create new mediator and register it, after that remove it', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST12');
        const onRemove = sinon.spy(() => {});
        const viewComponent = {};

        @initialize
        class TestMediator extends LeanES.NS.Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};

          @method onRemove() {
            onRemove();
          }
        }
        const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        facade.registerMediator(mediator);
        facade.removeMediator('TEST_MEDIATOR');
        assert(onRemove.called, 'Mediator onRemove hook not called');
        const hasMediator = facade.hasMediator('TEST_MEDIATOR');
        assert(!hasMediator, 'Mediator didn`t removed');
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('.hasMediator', () => {
    it('should retrieve registered mediator', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST13');
        @initialize
        class TestMediator extends LeanES.NS.Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
        }
        const viewComponent = {};
        const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        facade.registerMediator(mediator);
        const hasMediator = facade.hasMediator('TEST_MEDIATOR');
        assert(hasMediator, 'Mediator is absent');
        const hasNoAbsentMediator = !(facade.hasMediator('TEST_MEDIATOR_ABSENT'));
        assert(hasNoAbsentMediator, 'Absent mediator is accessible');
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('.notifyObservers', () => {
    it('should call notification for all observers', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST14');
        const handleNotification = sinon.spy(() => {});
        const viewComponent = {};

        @initialize
        class TestMediator extends LeanES.NS.Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
          @method listNotificationInterests() {
            return ['TEST_LIST'];
          }
          @method handleNotification() {
            handleNotification();
          }
        }
        const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        facade.registerMediator(mediator);
        facade.notifyObservers(LeanES.NS.Notification.new('TEST_LIST'));
        assert(handleNotification.called, 'Mediator cannot subscribe interests');
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('.sendNotification', () => {
    it('should send single notification', () => {
      expect(() => {
        const facade = LeanES.NS.Facade.getInstance('TEST15');
        const handleNotification = sinon.spy(() => {});
        const viewComponent = {};

        @initialize
        class TestMediator extends LeanES.NS.Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
          @method listNotificationInterests() {
            return ['TEST_LIST'];
          }
          @method handleNotification() {
            handleNotification();
          }
        }
        const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        facade.registerMediator(mediator);
        facade.sendNotification('TEST_LIST');
        assert(handleNotification.called, 'Mediator cannot subscribe interests');
        facade.remove();
      }).to.not.throw(Error)
    });
  });
  describe('.remove', () => {
    it('should remove facade', () => {
      expect(() => {
        const KEY = 'TEST16';
        const facade = LeanES.NS.Facade.getInstance(KEY);
        // const instanceMapSymbol = Symbol.for('~instanceMap');
        assert.equal(facade, LeanES.NS.Facade._instanceMap[KEY]);
        facade.remove();
        assert.isUndefined(LeanES.NS.Facade._instanceMap[KEY]);
        facade.remove();
      }).to.not.throw(Error);
    });
  });
  describe('.replicateObject', () => {
    let application = null;
    const KEY = 'TEST17';
    after(() => {
      return application != null ? typeof application.finish === "function" ? application.finish() : void 0 : void 0;
    });
    return it('should create replica for facade', async () => {
      @initialize
      @resolver(require, name => require(name))
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class ApplicationFacade extends LeanES.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
        @property static _instanceMap = {};
        @method startup(application) {
          this.registerCommand(LeanES.NS.STARTUP, Test.NS.PrepareViewCommand);
          this.sendNotification(LeanES.NS.STARTUP, application);
        }
        @method finish() {}
        @method static getInstance(asKey) {
          if (Test.NS.Facade._instanceMap[asKey] == null) {
            Test.NS.Facade._instanceMap[asKey] = this.new(asKey);
          }
          return Test.NS.Facade._instanceMap[asKey];
        }
      }

      @initialize
      @moduleD(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestApplication extends LeanES.NS.Application {
        @nameBy static  __filename = 'TestApplication';
        @meta static object = {};
        @property static get NAME(): String {
          return KEY;
        }

        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(TestApplication.NAME, ApplicationFacade);
        }
      }

      @initialize
      @moduleD(Test)
      class PrepareViewCommand extends LeanES.NS.SimpleCommand {
        @nameBy static  __filename = 'PrepareViewCommand';
        @meta static object = {};
        @method execute(aoNotification) {
          const voApplication = aoNotification.getBody();
          this.facade.registerMediator(ApplicationMediator.new(APPLICATION_MEDIATOR, voApplication))
        }
      }
      application = new TestApplication();
      application.start();
      const replica = await ApplicationFacade.replicateObject(application.facade);
      assert.deepEqual(replica, {
        type: 'instance',
        class: 'ApplicationFacade',
        multitonKey: KEY,
        application: 'TestApplication'
      });
    });
  });
  describe('.restoreObject', () => {
    let application = null;
    const KEY = 'TEST18';
    after(() => {
      typeof application != "undefined" && application !== null ? typeof application.finish === "function" ? application.finish() : void 0 : void 0;
    });
    it('should create replica for facade', async () => {
      @initialize
      @resolver(require, name => require(name))
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class ApplicationFacade extends LeanES.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
        @property static _instanceMap = {};
        @method startup(application) {
          this.registerCommand(LeanES.NS.STARTUP, Test.NS.PrepareViewCommand);
          this.sendNotification(LeanES.NS.STARTUP, application);
        }
        @method finish() {}
        @method static getInstance(asKey) {
          if (Test.NS.Facade._instanceMap[asKey] == null) {
            Test.NS.Facade._instanceMap[asKey] = this.new(asKey);
          }
          return Test.NS.Facade._instanceMap[asKey];
        }
      }

      @initialize
      @moduleD(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestApplication extends LeanES.NS.Application {
        @nameBy static  __filename = 'TestApplication';
        @meta static object = {};
        @property static get NAME(): String {
          return KEY;
        }
        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(TestApplication.NAME, ApplicationFacade);
        }
      }

      @initialize
      @moduleD(Test)
      class PrepareViewCommand extends LeanES.NS.SimpleCommand {
        @nameBy static  __filename = 'PrepareViewCommand';
        @meta static object = {};
        @method execute(aoNotification) {
          const voApplication = aoNotification.getBody();
          this.facade.registerMediator(ApplicationMediator.new(APPLICATION_MEDIATOR, voApplication))
        }
      }
      application = TestApplication.new();
      const restoredFacade = await ApplicationFacade.restoreObject(Test, {
        type: 'instance',
        class: 'ApplicationFacade',
        multitonKey: KEY,
        application: 'TestApplication'
      });
      assert.deepEqual(application.facade, restoredFacade);
    });
  });
});
