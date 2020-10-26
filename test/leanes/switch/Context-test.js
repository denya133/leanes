const { Readable } = require('stream');
const EventEmitter = require('events');
const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const httpErrors = require('http-errors');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, partOf, nameBy, meta, constant, property
} = LeanES.NS;

describe('Context', () => {
  describe('.new', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create Context instance', () => {
      const KEY = 'TEST_CONTEXT_001';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.instanceOf(context, TestContext, 'The `context` is not an instance of TestContext')
    });
  });
  describe('.throw', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should throw an error exception', () => {
      const KEY = 'TEST_CONTEXT_002';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwaded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.throws(() => {
        context.throw(404)
      }, httpErrors.HttpError);
      assert.throws(() => {
        context.throw(501, 'Not Implemented')
      }, httpErrors.HttpError);
    });
  });
  describe('.assert', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should assert with status codes', () => {
      const KEY = 'TEST_CONTEXT_003';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forward-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.doesNotThrow(() => {
        context.assert(true);
      });
      assert.throws(() => {
        context.assert('test' === 'TEST', 500, 'Internal Error');
      }, Error);
    });
  });
  describe('.header', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request header', () => {
      const KEY = 'TEST_CONTEXT_004';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.header, req.headers);
    });
  });
  describe('.headers', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request headers', () => {
      const KEY = 'TEST_CONTEXT_005';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.headers, req.headers);
    });
  });
  describe('.method', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set request method', () => {
      const KEY = 'TEST_CONTEXT_006';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.method, 'POST');
      context.method = 'PUT';
      assert.equal(context.method, 'PUT');
      assert.equal(req.method, 'PUT');
    });
  });
  describe('.url', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set request URL', () => {
      const KEY = 'TEST_CONTEXT_007';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.url, 'http://localhost:8888/test1');
      context.url = 'http://localhost:8888/test2';
      assert.equal(context.url, 'http://localhost:8888/test2');
      assert.equal(req.url, 'http://localhost:8888/test2');
    });
  });
  describe('.originalUri', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get original request URL', () => {
      const KEY = 'TEST_CONTEXT_008';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.originalUrl, 'http://localhost:8888/test1');
    });
  });
  describe('.origin', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request origin data', () => {
      const KEY = 'TEST_CONTEXT_009';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:8888'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.origin, 'http://localhost:8888');
      req.secure = true;
      assert.equal(context.origin, 'https://localhost:8888');
    });
  });
  describe('.href', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request hyper reference', () => {
      const KEY = 'TEST_CONTEXT_010';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:8888'
        },
        secure: false
      };
      let context = TestContext.new(switchMediator, req, res);
      assert.equal(context.href, 'http://localhost:8888/test1');
      req.url = 'http://localhost1:9999/test2';
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.href, 'http://localhost1:9999/test2');
    });
  });
  describe('.path', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set request path', () => {
      const KEY = 'TEST_CONTEXT_011';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1?t=ttt',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.path, '/test1');
      context.path = '/test2';
      assert.equal(context.path, '/test2');
      assert.equal(req.url, 'http://localhost:8888/test2?t=ttt');
    });
  });
  describe('.query', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set request query object', () => {
      const KEY = 'TEST_CONTEXT_012';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1?t=ttt',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.query, {
        t: 'ttt'
      });
      context.query = {
        a: 'aaa'
      };
      assert.deepEqual(context.query, {
        a: 'aaa'
      });
      assert.equal(req.url, 'http://localhost:8888/test1?a=aaa');
    });
  });
  describe('.querystring', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set request query object', () => {
      const KEY = 'TEST_CONTEXT_013';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        method: 'POST',
        url: 'http://localhost:8888/test1?t=ttt',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.querystring, 't=ttt');
      context.querystring = 'a=aaa';
      assert.equal(context.querystring, 'a=aaa');
      assert.equal(req.url, 'http://localhost:8888/test1?a=aaa');
    });
  });
  describe('.host', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request host', () => {
      const KEY = 'TEST_CONTEXT_014';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      let req = {
        url: 'http://localhost:8888/test1?t=ttt',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:9999'
        }
      };
      let context = TestContext.new(switchMediator, req, res);
      assert.equal(context.host, 'localhost:9999');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-host': 'localhost:8888, localhost:9999'
        }
      };
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.host, 'localhost:8888');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.host, '');
    });
  });
  describe('.hostname', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request host name', () => {
      const KEY = 'TEST_CONTEXT_015';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'Foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();

      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:9999'
        }
      };
      let context = TestContext.new(switchMediator, req, res);
      assert.equal(context.hostname, 'localhost');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-host': 'localhost1:8888, localhost:9999'
        }
      };
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.hostname, 'localhost1');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.hostname, '');
    });
  });
  describe('.fresh', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should test request freshness', () => {
      const KEY = 'TEST_CONTEXT_016';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'etag': '"bar"'
          };
        }
      };
      const res = new MyResponse();
      let req = {
        method: 'GET',
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      let context = TestContext.new(switchMediator, req, res);
      context.status = 200;
      assert.isFalse(context.fresh);
      req = {
        method: 'GET',
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      res._headers = {
        'etag': '"foo"'
      };
      context = TestContext.new(switchMediator, req, res);
      context.status = 200;
      assert.isTrue(context.fresh);
    });
  });
  describe('.stale', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should test request non-freshness', () => {
      const KEY = 'TEST_CONTEXT_017';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          this._headers = {
            'etag': '"bar"'
          };
        }
      };
      const res = new MyResponse();
      let req = {
        method: 'GET',
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      let context = TestContext.new(switchMediator, req, res);
      context.status = 200;
      assert.isTrue(context.stale);
      req = {
        method: 'GET',
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      res._headers = {
        'etag': '"foo"'
      };
      context = TestContext.new(switchMediator, req, res);
      context.status = 200;
      assert.isFalse(context.stale);
    });
  });
  describe('.socket', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request socket', () => {
      const KEY = 'TEST_CONTEXT_018';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        socket: {}
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.socket, req.socket);
    });
  });
  describe('.protocol', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request protocol', () => {
      const KEY = 'TEST_CONTEXT_019';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      Reflect.defineProperty(switchMediator, 'configs', {
        writable: true,
        value: {
          trustProxy: false
        }
      });
      let context = TestContext.new(switchMediator, req, res);
      assert.equal(context.protocol, 'http');
      Reflect.defineProperty(switchMediator, 'configs', {
        writable: true,
        value: {
          trustProxy: true
        }
      });
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.protocol, 'http');
      req.socket = {
        encrypted: true
      };
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.protocol, 'https');
      delete req.socket;
      req.secure = true;
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.protocol, 'https');
      delete req.secure;
      req.headers['x-forwarded-proto'] = 'https';
      context = TestContext.new(switchMediator, req, res);
      assert.equal(context.protocol, 'https');
    });
  });
  describe('.secure', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check if request secure', () => {
      const KEY = 'TEST_CONTEXT_020';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      Reflect.defineProperty(switchMediator, 'configs', {
        writable: true,
        value: {
          trustProxy: false
        }
      });
      let context = TestContext.new(switchMediator, req, res);
      assert.isFalse(context.secure);
      Reflect.defineProperty(switchMediator, 'configs', {
        writable: true,
        value: {
          trustProxy: true
        }
      });
      context = TestContext.new(switchMediator, req, res);
      assert.isFalse(context.secure);
      req.socket = {
        encrypted: true
      };
      context = TestContext.new(switchMediator, req, res);
      assert.isTrue(context.secure);
      delete req.socket;
      req.secure = true;
      context = TestContext.new(switchMediator, req, res);
      assert.isTrue(context.secure);
      delete req.secure;
      req.headers['x-forwarded-proto'] = 'https';
      context = TestContext.new(switchMediator, req, res);
      assert.isTrue(context.secure);
    });
  });
  describe('.ips', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request IPse', () => {
      const KEY = 'TEST_CONTEXT_021';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1, 192.168.1.1, 123.222.12.21'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.ips, ['192.168.0.1', '192.168.1.1', '123.222.12.21']);
    });
  });
  describe('.ip', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request IP', () => {
      const KEY = 'TEST_CONTEXT_022';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1, 192.168.1.1, 123.222.12.21'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.ip, '192.168.0.1');
    });
  });
  describe('.subdomains', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request subdomains', () => {
      const KEY = 'TEST_CONTEXT_023';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'www.test.localhost:9999'
        }
      };
      let context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.subdomains, ['test', 'www']);
      req.headers.host = '192.168.0.2:9999';
      context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.subdomains, []);
    });
  });
  describe('.is', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should test types from request', () => {
      const KEY = 'TEST_CONTEXT_024';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'content-type': 'application/json',
          'content-length': '0'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.is('html', 'application/*'), 'application/json');
    });
  });
  describe('.accepts', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable types from request', () => {
      const KEY = 'TEST_CONTEXT_025';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept': 'application/json, text/plain, image/png'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.accepts(), ['application/json', 'text/plain', 'image/png']);
    });
  });
  describe('.acceptsEncodings', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable encodings from request', () => {
      const KEY = 'TEST_CONTEXT_026';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept-encoding': 'compress, gzip, deflate, sdch, identity'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.acceptsEncodings(), ['compress', 'gzip', 'deflate', 'sdch', 'identity']);
    });
  });
  describe('.acceptsCharsets', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable charsets from request', () => {
      const KEY = 'TEST_CONTEXT_027';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept-charset': 'utf-8, iso-8859-1;q=0.5, *;q=0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.acceptsCharsets(), ['utf-8', 'iso-8859-1', '*']);
    });
  });
  describe('.acceptsLanguages', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable languages from request', () => {
      const KEY = 'TEST_CONTEXT_028';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept-language': 'en, ru, cn, fr'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.deepEqual(context.acceptsLanguages(), ['en', 'ru', 'cn', 'fr']);
    });
  });
  describe('.get', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get single header from reques', () => {
      const KEY = 'TEST_CONTEXT_029';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'referrer': 'localhost',
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https',
          'abc': 'def'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.get('Referrer'), 'localhost');
      assert.equal(context.get('X-Forwarded-For'), '192.168.0.1');
      assert.equal(context.get('X-Forwarded-Proto'), 'https');
      assert.equal(context.get('Abc'), 'def');
      assert.equal(context.get('123'), '');
    });
  });
  describe('.body', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set response body', () => {
      const KEY = 'TEST_CONTEXT_030';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        getHeaders: function () {
          return LeanES.NS.Utils.copy(this._headers);
        },
        setHeader: function (field, value) {
          return this._headers[field.toLowerCase()] = value;
        },
        removeHeader: function (field) {
          return delete this._headers[field.toLowerCase()];
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.isUndefined(context.body);
      context.body = 'TEST';
      assert.equal(context.status, 200);
      assert.equal(context.message, 'OK');
      assert.equal(context.response.get('Content-Type'), 'text/plain; charset=utf-8');
      assert.equal(context.response.get('Content-Length'), '4');
      context.body = null;
      assert.equal(context.status, 204);
      assert.equal(context.message, 'No Content');
      assert.equal(context.response.get('Content-Type'), '');
      assert.equal(context.response.get('Content-Length'), '');
      context.response._explicitStatus = false;
      context.body = Buffer.from('7468697320697320612074c3a97374', 'hex');
      assert.equal(context.status, 200);
      assert.equal(context.message, 'OK');
      assert.equal(context.response.get('Content-Type'), 'application/octet-stream');
      assert.equal(context.response.get('Content-Length'), '15');
      context.body = null;
      context.response._explicitStatus = false;
      context.body = '<html></html>';
      assert.equal(context.status, 200);
      assert.equal(context.message, 'OK');
      assert.equal(context.response.get('Content-Type'), 'text/html; charset=utf-8');
      assert.equal(context.response.get('Content-Length'), '13');
      const data = 'asdfsdzdfvhasdvsjvcsdvcivsiubcuibdsubs\nbszdbiszdbvibdivbsdibvsd';
      class MyStream extends Readable {
        constructor(options = {}) {
          super(options);
          this.__data = options.data;
          return;
        }

        _read(size) {
          this.push(this.__data.slice(0, size));
          this.push(null);
        }
      };
      const stream = new MyStream({ data });
      context.body = null;
      context.response._explicitStatus = false;
      context.body = stream;
      stream.read();
      assert.equal(context.status, 200);
      assert.equal(context.message, 'OK');
      assert.equal(context.response.get('Content-Type'), 'application/octet-stream');
      assert.equal(context.response.get('Content-Length'), '');
      context.body = null;
      context.response._explicitStatus = false;
      context.body = {
        test: 'TEST'
      };
      assert.equal(context.status, 200);
      assert.equal(context.message, 'OK');
      assert.equal(context.response.get('Content-Type'), 'application/json; charset=utf-8');
      assert.equal(context.response.get('Content-Length'), '');
    });
  });
  describe('.status', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set response status', () => {
      const KEY = 'TEST_CONTEXT_031';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.status, 200);
      context.status = 400;
      assert.equal(context.status, 400);
      assert.equal(res.statusCode, 400);
      assert.throws(function () {
        return context.status = 'TEST';
      });
      assert.throws(function () {
        return context.status = 0;
      });
      assert.doesNotThrow(function () {
        return context.status = 200;
      });
      res.headersSent = true;
      assert.throws(function () {
        return context.status = 200;
      });
    });
  });
  describe('.message', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set response message', () => {
      const KEY = 'TEST_CONTEXT_032';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.message, 'OK');
      context.message = 'TEST';
      assert.equal(context.message, 'TEST');
      assert.equal(res.statusMessage, 'TEST');
    });
  });
  describe('.length', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set response length', () => {
      const KEY = 'TEST_CONTEXT_033';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.length, 0);
      context.length = 10;
      assert.equal(context.length, 10);
      context.response.remove('Content-Length');
      context.body = '<html></html>';
      assert.equal(context.length, 13);
      context.response.remove('Content-Length');
      context.body = Buffer.from('7468697320697320612074c3a97374', 'hex');
      assert.equal(context.length, 15);
      context.response.remove('Content-Length');
      context.body = {
        test: 'TEST123'
      };
    });
  });
  describe('.writable', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check if response is writable', () => {
      const KEY = 'TEST_CONTEXT_034';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
          this.finished = true;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = TestContext.new(switchMediator, req, res);
      assert.isFalse(context.writable);
      res.finished = false;
      context = TestContext.new(switchMediator, req, res);
      assert.isTrue(context.writable);
      delete res.finished;
      context = TestContext.new(switchMediator, req, res);
      assert.isTrue(context.writable);
      res.socket = {
        writable: true
      };
      assert.isTrue(context.writable);
      res.socket.writable = false;
      context = TestContext.new(switchMediator, req, res);
      assert.isFalse(context.writable);
    });
  });
  describe('.type', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get, set and remove `Content-Type` header', () => {
      const KEY = 'TEST_CONTEXT_035';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.type, '');
      context.type = 'markdown';
      assert.equal(context.type, 'text/markdown');
      assert.equal(res._headers['content-type'], 'text/markdown; charset=utf-8');
      context.type = 'file.json';
      assert.equal(context.type, 'application/json');
      assert.equal(res._headers['content-type'], 'application/json; charset=utf-8');
      context.type = 'text/html';
      assert.equal(context.type, 'text/html');
      assert.equal(res._headers['content-type'], 'text/html; charset=utf-8');
      context.type = null;
      assert.equal(context.type, '');
      assert.isUndefined(res._headers['content-type']);
    });
  });
  describe('.headersSent', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get res.headersSent value', () => {
      const KEY = 'TEST_CONTEXT_036';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      assert.equal(context.headerSent, res.headersSent);
    });
  });
  describe('.redirect', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should send redirect', () => {
      const KEY = 'TEST_CONTEXT_037';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept': 'application/json, text/plain, image/png'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      context.redirect('back', 'http://localhost:8888/test1');
      assert.equal(context.response.get('Location'), 'http://localhost:8888/test1');
      assert.equal(context.status, 302);
      assert.equal(context.message, 'Found');
      assert.equal(context.type, 'text/plain');
      assert.equal(context.body, 'Redirecting to http://localhost:8888/test1');
      req.headers.referrer = 'http://localhost:8888/test3';
      context.redirect('back');
      assert.equal(context.response.get('Location'), 'http://localhost:8888/test3');
      assert.equal(context.status, 302);
      assert.equal(context.message, 'Found');
      assert.equal(context.type, 'text/plain');
      assert.equal(context.body, 'Redirecting to http://localhost:8888/test3');
      context.redirect('http://localhost:8888/test2');
      assert.equal(context.response.get('Location'), 'http://localhost:8888/test2');
      assert.equal(context.status, 302);
      assert.equal(context.message, 'Found');
      assert.equal(context.type, 'text/plain');
      assert.equal(context.body, 'Redirecting to http://localhost:8888/test2');
    });
  });
  describe('.attachment', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should setup attachment', () => {
      const KEY = 'TEST_CONTEXT_038';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      context.attachment(`${__dirname}/${__filename}`);
      assert.equal(context.type, 'application/javascript');
      assert.equal(context.response.get('Content-Disposition'), 'attachment; filename="Context-test.js"');
      context.attachment('attachment.js');
      assert.equal(context.response.get('Content-Disposition'), 'attachment; filename="attachment.js"');
    });
  });
  describe('.set', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should set specified response header', () => {
      const KEY = 'TEST_CONTEXT_039';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      context.set('Content-Type', 'text/plain');
      assert.equal(res._headers['content-type'], 'text/plain');
      assert.equal(context.response.get('Content-Type'), 'text/plain');
      const now = new Date();
      context.set('Date', now);
      assert.equal(context.response.get('Date'), `${now}`);
      const array = [1, now, 'TEST'];
      context.set('Test', array);
      assert.deepEqual(context.response.get('Test'), ['1', `${now}`, 'TEST']);
      context.set({
        'Abc': 123,
        'Last-Date': now,
        'New-Test': 'Test'
      });
      assert.equal(context.response.get('Abc'), '123');
      assert.equal(context.response.get('Last-Date'), `${now}`);
      assert.equal(context.response.get('New-Test'), 'Test');
    });
  });
  describe('.append', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should add specified response header value', () => {
      const KEY = 'TEST_CONTEXT_040';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      context.append('Test', 'data');
      assert.equal(context.response.get('Test'), 'data');
      context.append('Test', 'Test');
      assert.deepEqual(context.response.get('Test'), ['data', 'Test']);
      context.append('Test', 'Test');
      assert.deepEqual(context.response.get('Test'), ['data', 'Test', 'Test']);
    });
  });
  describe('.vary', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should set `Vary` header', () => {
      const KEY = 'TEST_CONTEXT_041';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      context.vary('Origin');
      assert.equal(context.response.get('Vary'), 'Origin');
    });
  });
  describe('.flushHeaders', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should clear all headers', () => {
      const KEY = 'TEST_CONTEXT_042';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      const now = new Date();
      const array = [1, now, 'TEST'];
      context.set({
        'Content-Type': 'text/plain',
        'Date': now,
        'Abc': 123,
        'Last-Date': now,
        'New-Test': 'Test',
        'Test': array
      });
      assert.equal(context.response.get('Content-Type'), 'text/plain');
      assert.equal(context.response.get('Date'), `${now}`);
      assert.equal(context.response.get('Abc'), '123');
      assert.equal(context.response.get('Last-Date'), `${now}`);
      assert.equal(context.response.get('New-Test'), 'Test');
      assert.deepEqual(context.response.get('Test'), ['1', `${now}`, 'TEST']);
      context.flushHeaders();
      assert.equal(context.response.get('Content-Type'), '');
      assert.equal(context.response.get('Date'), '');
      assert.equal(context.response.get('Abc'), '');
      assert.equal(context.response.get('Last-Date'), '');
      assert.equal(context.response.get('New-Test'), '');
      assert.equal(context.response.get('Test'), '');
    });
  });
  describe('.remove', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should remove specified response header', () => {
      const KEY = 'TEST_CONTEXT_043';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      context.set('Test', 'data');
      assert.equal(context.response.get('Test'), 'data');
      context.remove('Test');
      assert.equal(context.response.get('Test'), '');
    });
  });
  describe('.lastModified', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should set `Last-Modified` header', () => {
      const KEY = 'TEST_CONTEXT_044';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      const now = new Date();
      context.lastModified = now;
      assert.equal(res._headers['last-modified'], now.toUTCString());
      assert.deepEqual(context.response.lastModified, new Date(now.toUTCString()));
    });
  });
  describe('.etag', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should set `ETag` header', () => {
      const KEY = 'TEST_CONTEXT_045';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {}
        statusCode = 200;
        statusMessage = 'OK';

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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = TestContext.new(switchMediator, req, res);
      let etag = '123456789';
      context.etag = etag;
      assert.equal(res._headers['etag'], `\"${etag}\"`);
      assert.deepEqual(context.response.etag, `\"${etag}\"`);
      etag = 'W/"123456789"';
      context.etag = etag;
      assert.equal(res._headers['etag'], etag);
      assert.deepEqual(context.response.etag, etag);
    });
  });
  describe('.onerror', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should run error handler', async () => {
      const KEY = 'TEST_CONTEXT_046';
      facade = LeanES.NS.Facade.getInstance(KEY);
      const trigger = new EventEmitter();

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new();
      configs.setName(LeanES.NS.CONFIGURATION);
      configs.setData(Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @partOf(Test)
      class TestContext extends LeanES.NS.Context {
        @nameBy static __filename = 'TestContext';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);
      const mediator = TestSwitch.new();
      mediator.setName('TEST_SWITCH_MEDIATOR');
      facade.registerMediator(mediator);
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

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
          trigger.emit('end', data);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      Reflect.defineProperty(switchMediator, 'getViewComponent', {
        value: function () {
          return trigger;
        }
      });
      let context = TestContext.new(switchMediator, req, res);
      let errorPromise = new Promise((resolve) => {trigger.once('error', resolve)});
      let endPromise = new Promise((resolve) => {trigger.once('end', resolve)});
      context.onerror('TEST_ERROR');
      let err = await errorPromise;
      let data = await endPromise;
      assert.instanceOf(err, Error);
      assert.equal(err.message, 'non-error thrown: TEST_ERROR');
      assert.equal(err.status, 500);
      assert.include(data, '"Internal Server Error"');
      context = TestContext.new(switchMediator, req, res);
      errorPromise = new Promise(function (resolve) {
        trigger.once('error', resolve);
      });
      endPromise = new Promise(function (resolve) {
        trigger.once('end', resolve);
      });
      context.onerror(new Error('TEST_ERROR'));
      err = await errorPromise;
      data = await endPromise;
      assert.instanceOf(err, Error);
      assert.equal(err.message, 'TEST_ERROR');
      assert.equal(err.status, 500);
      assert.include(data, '"Internal Server Error"');
      context = TestContext.new(switchMediator, req, res);
      errorPromise = new Promise(function (resolve) {
        trigger.once('error', resolve);
      });
      endPromise = new Promise(function (resolve) {
        trigger.once('end', resolve);
      });
      context.onerror(httpErrors(400, 'TEST_ERROR'));
      err = await errorPromise;
      data = await endPromise;
      assert.instanceOf(err, httpErrors.BadRequest);
      assert.isTrue(err.expose);
      assert.equal(err.message, 'TEST_ERROR');
      assert.equal(err.status, 400);
      assert.include(data, '"TEST_ERROR"');
    });
  });
});
