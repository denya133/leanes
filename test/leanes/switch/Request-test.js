const EventEmitter = require('events');
const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const { accepts } = require('accepts');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module: moduleD, nameBy, meta, constant, mixin, property, method, attribute, action
} = LeanES.NS;

describe('Request', () => {
  describe('.new', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create Request instance', () => {
      const KEY = 'TEST_REQUEST_001';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.instanceOf(request, TestRequest);
      assert.equal(request.ctx, context);
      assert.equal(request.ip, '192.168.0.1');
    });
  });
  describe('.req', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get request native value', () => {
      const KEY = 'TEST_REQUEST_002';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      const request = TestRequest.new(context, req);
      assert.equal(request.req, context.req);
    });
  });
  describe('.switch', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get switch internal value', () => {
      const KEY = 'TEST_REQUEST_003';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      const request = TestRequest.new(context, req);
      assert.equal(request.switch, context.switch);
    });
  });
  describe('.headers', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get headers value', () => {
      const KEY = 'TEST_REQUEST_004';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      const request = TestRequest.new(context, req);
      assert.equal(request.headers, context.req.headers);
    });
  });
  describe('.header', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get header value', () => {
      const KEY = 'TEST_REQUEST_005';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      const request = TestRequest.new(context, req);
      assert.equal(request.header, context.req.headers);
    });
  });
  describe('.originalUrl', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get original URL', () => {
      const KEY = 'TEST_REQUEST_006';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      const request = TestRequest.new(context, req);
      assert.equal(request.originalUrl, context.originalUrl);
    });
  });
  describe('.url', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should set and get native request URL', () => {
      const KEY = 'TEST_REQUEST_007';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      const request = TestRequest.new(context, req);
      assert.equal(request.url, 'http://localhost:8888');
      request.url = 'http://localhost:9999';
      assert.equal(request.url, 'http://localhost:9999');
      assert.equal(context.req.url, 'http://localhost:9999');
    });
  });
  describe('.socket', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get request socket', () => {
      const KEY = 'TEST_REQUEST_008';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
        },
        socket: {}
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.socket, context.req.socket);
    });
  });
  describe('.protocol', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get request protocol name', () => {
      const KEY = 'TEST_REQUEST_009';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      let res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      let request = TestRequest.new(context, req);
      assert.equal(request.protocol, 'http');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        socket: {
          encrypted: true
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.protocol, 'https');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: true
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.protocol, 'https');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.protocol, 'https');
    });
  });
  describe('.get', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get single header', () => {
      const KEY = 'TEST_REQUEST_010';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
          'referrer': 'localhost',
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https',
          'abc': 'def'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.get('Referrer'), 'localhost');
      assert.equal(request.get('X-Forwarded-For'), '192.168.0.1');
      assert.equal(request.get('X-Forwarded-Proto'), 'https');
      assert.equal(request.get('Abc'), 'def');
      assert.equal(request.get('123'), '');
    });
  });
  describe('.host', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get full host name with port', () => {
      const KEY = 'TEST_REQUEST_011';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      let res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:9999'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      let request = TestRequest.new(context, req);
      assert.equal(request.host, 'localhost:9999');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-host': 'localhost:8888, localhost:9999'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.host, 'localhost:8888');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.host, '');
    });
  });
  describe('.origin', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get request origin', () => {
      const KEY = 'TEST_REQUEST_012';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https',
          'x-forwarded-host': 'localhost:9999'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.origin, 'https://localhost:9999');
    });
  });
  describe('.href', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get request hyper reference', () => {
      const KEY = 'TEST_REQUEST_013';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      let res = new MyResponse();
      let req = {
        url: 'http://localhost:8888/test',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      let request = TestRequest.new(context, req);
      assert.equal(request.href, 'http://localhost:8888/test');
      req = {
        url: '/test',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https',
          'x-forwarded-host': 'localhost:9999'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.href, 'https://localhost:9999/test');
    });
  });
  describe('.method', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get and set request method', () => {
      const KEY = 'TEST_REQUEST_014';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
        url: '/test',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.method, 'POST');
      request.method = 'PUT';
      assert.equal(request.method, 'PUT');
      assert.equal(req.method, 'PUT');
    });
  });
  describe('.path', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get and set request path', () => {
      const KEY = 'TEST_REQUEST_015';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.path, '/test');
      request.path = '/test1';
      assert.equal(request.path, '/test1');
      assert.equal(req.url, 'https://localhost:8888/test1?t=ttt');
    });
  });
  describe('.querystring', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get and set query string', () => {
      const KEY = 'TEST_REQUEST_016';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.querystring, 't=ttt');
      request.querystring = 'a=aaa';
      assert.equal(request.querystring, 'a=aaa');
      assert.equal(req.url, 'https://localhost:8888/test?a=aaa');
    });
  });
  describe('.search', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get and set search string', () => {
      const KEY = 'TEST_REQUEST_017';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.search, '?t=ttt');
      request.search = 'a=aaa';
      assert.equal(request.search, '?a=aaa');
      assert.equal(req.url, 'https://localhost:8888/test?a=aaa');
    });
  });
  describe('.query', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get and set query params', () => {
      const KEY = 'TEST_REQUEST_018';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.deepEqual(request.query, {
        t: 'ttt'
      });
      request.query = {
        a: 'aaa'
      };
      assert.deepEqual(request.query, {
        a: 'aaa'
      });
      assert.equal(req.url, 'https://localhost:8888/test?a=aaa');
    });
  });
  describe('#hostname', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get host name without port', () => {
      const KEY = 'TEST_REQUEST_019';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:9999'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      let request = TestRequest.new(context, req);
      assert.equal(request.hostname, 'localhost');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-host': 'localhost1:8888, localhost2:9999'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.hostname, 'localhost1');
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.equal(request.hostname, '');
    });
  });
  describe('.fresh', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should test request freshness', () => {
      const KEY = 'TEST_REQUEST_020';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"bar"'
        }
      });
      let req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      let request = TestRequest.new(context, req);
      assert.isFalse(request.fresh);
      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"foo"'
        }
      });
      req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      request = TestRequest.new(context, req);
      assert.isTrue(request.fresh);
    });
  });
  describe('.stale', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should test inverted request freshness', () => {
      const KEY = 'TEST_REQUEST_021';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"bar"'
        }
      });
      let req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      let request = TestRequest.new(context, req);
      assert.isTrue(request.stale);
      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"foo"'
        }
      });
      req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      request = TestRequest.new(context, req);
      assert.isFalse(request.stale);
    });
  });
  describe('.idempotent', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should test if method is idempotent', () => {
      const KEY = 'TEST_REQUEST_022';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
      let req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = Test.NS.Context.new(switchMediator, req, res);
      let request = TestRequest.new(context, req);
      assert.isTrue(request.idempotent);
      req = {
        url: 'http://localhost:8888',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = Test.NS.Context.new(switchMediator, req, res);
      request = TestRequest.new(context, req);
      assert.isFalse(request.idempotent);
    });
  });
  describe('.charset', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should get charset of request', () => {
      const KEY = 'TEST_REQUEST_023';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }
      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRequest extends LeanES.NS.Request {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
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
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'content-type': 'image/svg+xml; charset=utf-8'
        }
      };
      const context = Test.NS.Context.new(switchMediator, req, res);
      const request = TestRequest.new(context, req);
      assert.equal(request.charset, 'utf-8');
    });
  });
});
