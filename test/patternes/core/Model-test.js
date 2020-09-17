const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  APPLICATION_MEDIATOR,
  Proxy, Model,
  initialize, module:moduleD, nameBy, meta, method, property, resolver
} = LeanES.NS;

describe('Model', () => {
  describe('.getInstance', () => {
    it('should get new or exiciting instance of Model', () => {
      expect(() => {
        const model = Model.getInstance('TEST1');
        if(!(model instanceof Model)) {
          throw new Error('The `model` is not an instance of Model');
        }
      }).to.not.throw(Error);
    });
  });
  describe('.removeModel', () => {
    it('should get new instance of Model, remove it and get new one', () => {
      expect(() => {
        const model = Model.getInstance('TEST2');
        Model.removeModel('TEST2');
        const newModel = Model.getInstance('TEST2');
        if(model === newModel) {
          throw new Error('Model instance didn`t renewed')
        }
      }).to.not.throw(Error);
    });
  });
  describe('.registerProxy', () => {
    it('should register new proxy and register it', () => {
      expect(() => {
        const model = Model.getInstance('TEST3');
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
        model.registerProxy(testProxy);
        assert(onRegister.called, 'Proxy is not registered');
        onRegister.resetHistory();
        const hasProxy = model.hasProxy('TEST_PROXY');
        assert(hasProxy, 'Proxy is not registered');
      }).to.not.throw(Error)
    });
  });
  describe('.lazyRegisterProxy', () => {
    let facade = null;
    const INSTANCE_NAME = 'TEST33';
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
      class TestProxy extends Proxy {
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
      const model = Test.NS.Model.getInstance(INSTANCE_NAME);
      facade.registerMediator(Test.NS.Mediator.new(APPLICATION_MEDIATOR, Application.new()));
      const proxyData = {data: 'data'};
      model.lazyRegisterProxy('TEST_PROXY', 'TestProxy', proxyData);
      assert.isFalse(onRegister.called, 'Proxy is already registered');
      onRegister.resetHistory();
      const hasProxy = model.hasProxy('TEST_PROXY');
      assert(hasProxy, 'Proxy is not registered');
      const testProxy = model.retrieveProxy('TEST_PROXY');
      assert.instanceOf(testProxy, TestProxy);
      assert(onRegister.called, 'Proxy is not registered')
      onRegister.resetHistory();
    });
  });
  describe('.removeProxy', () => {
    it('should create new proxy and register it, after that remove it', () => {
      expect(() => {
        const model = Model.getInstance('TEST4');
        const onRegister = sinon.spy();
        const onRemove = sinon.spy();
        @initialize
        class TestProxy extends Proxy {
          @nameBy static  __filename = 'TestProxy';
          @meta static object = {};
          @method onRegister() {
            onRegister();
          }
          @method onRemove() {
            onRemove();
          }
        }
        const proxyData = {data: 'data'};
        const testProxy = TestProxy.new('TEST_PROXY2', proxyData);
        model.registerProxy(testProxy);
        assert(onRegister.called, 'Proxy is not registered');
        const hasProxy = model.hasProxy('TEST_PROXY2');
        assert(hasProxy, 'Proxy is not registered');
        onRegister.resetHistory();
        model.removeProxy('TEST_PROXY2');
        assert(onRemove.called, 'Proxy is still registered');
        const hasNoProxy = !(model.hasProxy('TEST_PROXY2'));
        assert(hasNoProxy, 'Proxy is still registered');
      }).to.not.throw(Error)
    });
  });
  describe('retrieveProxy', () => {
    it('should retrieve registered proxy', () => {
      expect(() => {
        const model = Model.getInstance('TEST5');
        @initialize
        class TestProxy extends Proxy {
          @nameBy static  __filename = 'TestProxy';
          @meta static object = {};
        }
        const proxyData = {data: 'data'};
        const testProxy = TestProxy.new('TEST_PROXY', proxyData);
        model.registerProxy(testProxy);
        const retrievedProxy = model.retrieveProxy('TEST_PROXY');
        assert(retrievedProxy, 'Proxy cannot be retrieved');
        const retrievedAbsentProxy = model.retrieveProxy('TEST_PROXY_ABSENT');
        const hasNoAbsentProxy = !retrievedAbsentProxy;
        assert(hasNoAbsentProxy, 'Absent proxy can be retrieved');
      }).to.not.throw(Error);
    });
  });
  describe('.hasProxy', () => {
    it('should retrieve registered proxy', () => {
      expect(() => {
        const model = Model.getInstance('TEST6');
        @initialize
        class TestProxy extends LeanES.NS.Proxy {
          @nameBy static  __filename = 'TestProxy';
          @meta static object = {};
        }
        const proxyData = {data: 'data'};
        const testProxy = TestProxy.new('TEST_PROXY', proxyData);
        model.registerProxy(testProxy);
        const hasProxy = model.hasProxy('TEST_PROXY');
        assert(hasProxy, 'Proxy is absent');
        const hasNoAbsentProxy = !(model.hasProxy('TEST_PROXY_ABSENT'));
        assert(hasNoAbsentProxy, 'Absent proxy is accessible');
      }).to.not.throw(Error)
    });
  });
});
