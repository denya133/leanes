const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const EventEmitter = require('events');
const { Readable } = require('stream');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, partOf, nameBy, meta, constant, mixin, property, method, attribute, action
} = LeanES.NS;

describe('Response', () => {
  describe('.new', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create Response instance', () => {
      const KEY = 'TEST_RESPONSE_001';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.instanceOf(response, TestResponse);
    });
  });
  describe('.ctx', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get context object', () => {
      const KEY = 'TEST_RESPONSE_002';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.ctx, context);
    });
  });
  describe('.res', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get native resource object', () => {
      const KEY = 'TEST_RESPONSE_003';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.res, res);
      assert.equal(response.ctx._res, res);
    });
  });
  describe('.switch', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get switch object', () => {
      const KEY = 'TEST_RESPONSE_004';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.switch, switchMediator);
      assert.equal(response.ctx.switch, switchMediator);
    });
  });
  describe('.socket', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get socket object', () => {
      const KEY = 'TEST_RESPONSE_005';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {};
        }
      };
      const socket = {};
      const res = new MyResponse();
      const req = {
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        socket: socket
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.socket, socket);
    });
  });
  describe('.headerSent', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get res.headersSent value', () => {
      const KEY = 'TEST_RESPONSE_006';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
        headersSent = true
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
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.headerSent, res.headersSent);
    });
  });
  describe('.headers', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get response headers', () => {
      const KEY = 'TEST_RESPONSE_007';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.deepEqual(response.headers, {
        'Foo': 'Bar'
      });
    });
  });
  describe('.header', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get response headers', () => {
      const KEY = 'TEST_RESPONSE_008';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.deepEqual(response.header, {
        'Foo': 'Bar'
      });
    });
  });
  describe('.status', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set response status', () => {
      const KEY = 'TEST_RESPONSE_009';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
        _headers = {};
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
        url: 'http:localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.status, 200);
      response.status = 400;
      assert.equal(response.status, 400);
      assert.equal(res.statusCode, 400);
      assert.throws(() => {
        response.status = 'TEST';
      });
      assert.throws(() => {
        response.status = 0;
      });
      assert.doesNotThrow(() => {
        response.status = 200;
      });
      res.headersSent = true;
      assert.throws(() => {
        response.status = 200;
      });
    });
  });
  describe('.message', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set response message', () => {
      const KEY = 'TEST_RESPONSE_010';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
        _headers = {};
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
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.message, 'OK');
      response.message = 'TEST';
      assert.equal(response.message, 'TEST');
      assert.equal(res.statusMessage, 'TEST');
    });
  });
  describe('.get', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get specified response header', () => {
      const KEY = 'TEST_RESPONSE_011';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.deepEqual(response.get('Foo'), 'Bar');
    });
  });
  describe('.set', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should set specified response header', () => {
      const KEY = 'TEST_RESPONSE_012';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      response.set('Content-Type', 'text/plain');
      assert.equal(res._headers['content-type'], 'text/plain');
      assert.equal(response.get('Content-Type'), 'text/plain');
      const now = new Date();
      response.set('Date', now);
      assert.equal(response.get('Date'), `${now}`);
      const array = [1, now, 'TEST'];
      response.set('Test', array);
      assert.deepEqual(response.get('Test'), ['1', `${now}`, 'TEST']);
      response.set({
        'Abc': 123,
        'Last-Date': now,
        'New-Test': 'Test'
      });
      assert.equal(response.get('Abc'), '123');
      assert.equal(response.get('Last-Date'), `${now}`);
      assert.equal(response.get('New-Test'), 'Test');
    });
  });
  describe('.append', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should add specified response header value', () => {
      const KEY = 'TEST_RESPONSE_013';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const rcontext = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      response.append('Test', 'data');
      assert.equal(response.get('Test'), 'data');
      response.append('Test', 'Test');
      assert.deepEqual(response.get('Test'), ['data', 'Test']);
      response.append('Test', 'Test');
      assert.deepEqual(response.get('Test'), ['data', 'Test', 'Test']);
    });
  });
  describe('.remove', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should remove specified response header', () => {
      const KEY = 'TEST_RESPONSE_014';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      response.set('Test', 'data');
      assert.equal(response.get('Test'), 'data');
      response.remove('Test');
      assert.equal(response.get('Test'), '');
    });
  });
  describe('.vary', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should set `Vary` header', () => {
      const KEY = 'TEST_RESPONSE_015';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      response.vary('Origin');
      assert.equal(response.get('Vary'), 'Origin');
    });
  });
  describe('.lastModified', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set `Last-Modified` header', () => {
      const KEY = 'TEST_RESPONSE_016';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      const now = new Date();
      response.lastModified = now;
      assert.equal(res._headers['last-modified'], now.toUTCString());
      assert.deepEqual(response.lastModified, new Date(now.toUTCString()));
    });
  });
  describe('.etag', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set `ETag` header', () => {
      const KEY = 'TEST_RESPONSE_017';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      let etag = '123456789';
      response.etag = etag;
      assert.equal(res._headers['etag'], `\"${etag}\"`);
      assert.deepEqual(response.etag, `\"${etag}\"`);
      etag = 'W/"123456789"';
      response.etag = etag;
      assert.equal(res._headers['etag'], etag);
      assert.deepEqual(response.etag, etag);
    });
  });
  describe('.type', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get, set and remove `Content-Type` header', () => {
      const KEY = 'TEST_RESPONSE_018';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.type, '');
      response.type = 'markdown';
      assert.equal(response.type, 'text/markdown');
      assert.equal(res._headers['content-type'], 'text/markdown; charset=utf-8');
      response.type = 'file.json';
      assert.equal(response.type, 'application/json');
      assert.equal(res._headers['content-type'], 'application/json; charset=utf-8');
      response.type = 'text/html';
      assert.equal(response.type, 'text/html');
      assert.equal(res._headers['content-type'], 'text/html; charset=utf-8');
      response.type = null;
      assert.equal(response.type, '');
      assert.isUndefined(res._headers['content-type']);
    });
  });
  describe('.attachment', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should setup attachment', () => {
      const KEY = 'TEST_RESPONSE_019';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      response.attachment(`${__dirname}/${__filename}`);
      assert.equal(response.type, 'application/javascript');
      assert.equal(response.get('Content-Disposition'), 'attachment; filename="Response-test.js"');
      response.attachment('attachment.js');
      assert.equal(response.get('Content-Disposition'), 'attachment; filename="attachment.js"');
    });
  });
  describe('.writable', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check if response is writable', () => {
      const KEY = 'TEST_RESPONSE_020';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      res.finished = true;
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      let response = TestResponse.new(context, res);
      assert.isFalse(response.writable);
      res.finished = false;
      context = Test.NS.Context.new(switchMediator, req, res);
      response = TestResponse.new(context, res);
      assert.isTrue(response.writable);
      const secondRes = new MyResponse();
      context = Test.NS.Context.new(switchMediator, req, secondRes);
      response = TestResponse.new(context, secondRes);
      assert.isTrue(response.writable);
      secondRes.socket = {
        writable: true
      };
      context = Test.NS.Context.new(switchMediator, req, secondRes);
      response = TestResponse.new(context, secondRes);
      assert.isTrue(response.writable);
      secondRes.socket = {
        writable: false
      };
      context = Test.NS.Context.new(switchMediator, req, secondRes);
      response = TestResponse.new(context, secondRes);
      assert.isFalse(response.writable);
    });
  });
  describe('d.is', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check `Content-Type` header', () => {
      const KEY = 'TEST_RESPONSE_021';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      response.type = 'data.json';
      assert.equal(response.is('html', 'application/*'), 'application/json');
      assert.isFalse(response.is('html'));
    });
  });
  describe('.body', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set response body', () => {
      const KEY = 'TEST_RESPONSE_022';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.isUndefined(response.body);
      response.body = 'TEST';
      assert.equal(response.status, 200);
      assert.equal(response.message, 'OK');
      assert.equal(response.get('Content-Type'), 'text/plain; charset=utf-8');
      assert.equal(response.get('Content-Length'), '4');
      response.body = null;
      assert.equal(response.status, 204);
      assert.equal(response.message, 'No Content');
      assert.equal(response.get('Content-Type'), '');
      assert.equal(response.get('Content-Length'), '');
      response._explicitStatus = false;
      response.body = Buffer.from('7468697320697320612074c3a97374', 'hex');
      assert.equal(response.status, 200);
      assert.equal(response.message, 'OK');
      assert.equal(response.get('Content-Type'), 'application/octet-stream');
      assert.equal(response.get('Content-Length'), '15');
      response.body = null;
      response._explicitStatus = false;
      response.body = '<html></html>';
      assert.equal(response.status, 200);
      assert.equal(response.message, 'OK');
      assert.equal(response.get('Content-Type'), 'text/html; charset=utf-8');
      assert.equal(response.get('Content-Length'), '13');
      const data = 'asdfsdzdfvhasdvsjvcsdvcivsiubcuibdsubs\nbszdbiszdbvibdivbsdibvsd';
      const MyStream = class MyStream extends Readable {
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
      response.body = null;
      response._explicitStatus = false;
      response.body = stream;
      stream.read();
      assert.equal(response.status, 200);
      assert.equal(response.message, 'OK');
      assert.equal(response.get('Content-Type'), 'application/octet-stream');
      assert.equal(response.get('Content-Length'), '');
      response.body = null;
      response._explicitStatus = false;
      response.body = {
        test: 'TEST'
      };
      assert.equal(response.status, 200);
      assert.equal(response.message, 'OK');
      assert.equal(response.get('Content-Type'), 'application/json; charset=utf-8');
      assert.equal(response.get('Content-Length'), '');
    });
  });
  describe('.length', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get response data length', () => {
      const KEY = 'TEST_RESPONSE_023';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      assert.equal(response.length, 0);
      response.length = 10;
      assert.equal(response.length, 10);
      response.remove('Content-Length');
      response.body = '<html></html>';
      assert.equal(response.length, 13);
      response.remove('Content-Length');
      response.body = Buffer.from('7468697320697320612074c3a97374', 'hex');
      assert.equal(response.length, 15);
      response.remove('Content-Length');
      response.body = {
        test: 'TEST123'
      };
      assert.equal(response.length, 18);
    });
  });
  describe('.redirect', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should send redirect', () => {
      const KEY = 'TEST_RESPONSE_024';
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
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
          this._headers = {
            'foo': 'Bar'
          };
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'accept': 'application/json, text/plain, image/png'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      const response = TestResponse.new(context, res);
      response.redirect('back', 'http://localhost:8888/test1');
      assert.equal(response.get('Location'), 'http://localhost:8888/test1');
      assert.equal(response.status, 302);
      assert.equal(response.message, 'Found');
      assert.equal(response.type, 'text/plain');
      assert.equal(response.body, 'Redirecting to http://localhost:8888/test1');
      req.headers.referrer = 'http://localhost:8888/test3';
      response.redirect('back');
      assert.equal(response.get('Location'), 'http://localhost:8888/test3');
      assert.equal(response.status, 302);
      assert.equal(response.message, 'Found');
      assert.equal(response.type, 'text/plain');
      assert.equal(response.body, 'Redirecting to http://localhost:8888/test3');
      response.redirect('http://localhost:8888/test2');
      assert.equal(response.get('Location'), 'http://localhost:8888/test2');
      assert.equal(response.status, 302);
      assert.equal(response.message, 'Found');
      assert.equal(response.type, 'text/plain');
      assert.equal(response.body, 'Redirecting to http://localhost:8888/test2');
    });
  });
  describe('.flushHeaders', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should clear all headers', () => {
      const KEY = 'TEST_RESPONSE_025';
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
      class TestResponse extends LeanES.NS.Response {
        @nameBy static __filename = 'TestResponse';
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
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const response = TestResponse.new(context, res);
      const now = new Date();
      const array = [1, now, 'TEST'];
      response.set({
        'Content-Type': 'text/plain',
        'Date': now,
        'Abc': 123,
        'Last-Date': now,
        'New-Test': 'Test',
        'Test': array
      });
      assert.equal(response.get('Content-Type'), 'text/plain');
      assert.equal(response.get('Date'), `${now}`);
      assert.equal(response.get('Abc'), '123');
      assert.equal(response.get('Last-Date'), `${now}`);
      assert.equal(response.get('New-Test'), 'Test');
      assert.deepEqual(response.get('Test'), ['1', `${now}`, 'TEST']);
      response.flushHeaders();
      assert.equal(response.get('Content-Type'), '');
      assert.equal(response.get('Date'), '');
      assert.equal(response.get('Abc'), '');
      assert.equal(response.get('Last-Date'), '');
      assert.equal(response.get('New-Test'), '');
      assert.equal(response.get('Test'), '');
    });
  });
});
