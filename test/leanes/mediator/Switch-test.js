const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const EventEmitter = require('events');
const { Feed } = require('feed');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Switch, Facade,
  initialize, module: moduleD, nameBy, meta, constant, mixin, property, method, attribute, action
} = LeanES.NS;

describe('Switch', () => {
  describe('.new', () => {
    it('should create new switch mediator', () => {
      expect(() => {
        const mediatorName = 'TEST_MEDIATOR';
        const switchMediator = Switch.new(mediatorName);
        assert.isArray(switchMediator.middlewares);
      }).to.not.throw(Error);
    });
  });
  describe('.responseFormats', () => {
    it('should check allowed response formats', () => {
      expect(() => {
        const mediatorName = 'TEST_MEDIATOR';
        const switchMediator = Switch.new(mediatorName);
        assert.deepEqual(switchMediator.responseFormats, ['json', 'html', 'xml', 'atom', 'text'], 'Property `responseFormats` returns incorrect values');
      }).to.not.throw(Error);
    });
  });
  describe('.listNotificationInterests', () => {
    it('should check handled notifications list', () => {
      expect(() => {
        const mediatorName = 'TEST_MEDIATOR';
        const switchMediator = Switch.new(mediatorName);
        assert.deepEqual(switchMediator.listNotificationInterests(), [LeanES.NS.HANDLER_RESULT], 'Function `listNotificationInterests` returns incorrect values');
      }).to.not.throw(Error);
    });
  });
  describe('.handleNotification', () => {
    it('should try handle sent notification', async () => {
      const mediatorName = 'TEST_MEDIATOR';
      const notitficationName = LeanES.NS.HANDLER_RESULT;
      const notificationBody = {
        test: 'test'
      };
      const notitficationType = 'TEST_TYPE';
      const notification = LeanES.NS.Notification.new(notitficationName, notificationBody, notitficationType);
      const viewComponent = new EventEmitter();
      const switchMediator = Switch.new(mediatorName, viewComponent);
      const promise = new Promise(function (resolve, reject) {
        viewComponent.once(notitficationType, function (body) {
          resolve(body);
        });
      });
      switchMediator.handleNotification(notification);
      const body = await promise;
      assert.deepEqual(body, notificationBody);
    });
  });
  describe('.defineRoutes', () => {
    let facade;
    facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should define routes from route proxies', () => {
      const KEY = 'TEST_SWITCH_001';
      facade = Facade.getInstance(KEY);
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }
      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test1', () => {
            this.resource('test1');
          });
          this.namespace('sub', () => {
            this.resource('subtest');
          });
        }
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));
      const spyCreateNativeRoute = sinon.spy(() => { });
      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
        @method createNativeRoute() {
          spyCreateNativeRoute();
        }
      }
      const switchMediator = TestSwitch.new('TEST_SWITCH_MEDIATOR');
      switchMediator.initializeNotifier(KEY);
      switchMediator.defineRoutes();
      assert.equal(spyCreateNativeRoute.callCount, 15, 'Some routes are missing');
    });
  });
  describe('.onRegister', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run register procedure', () => {
      expect(() => {
        const KEY = 'TEST_SWITCH_002';
        facade = Facade.getInstance(KEY);
        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant ROOT = `${__dirname}/config/`;
        }
        const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
        facade.registerProxy(configs);
        @initialize
        @moduleD(Test)
        class TestRouter extends LeanES.NS.Router {
          @nameBy static __filename = 'TestRouter';
          @meta static object = {};
        }
        facade.registerProxy(TestRouter.new(LeanES.NS.APPLICATION_ROUTER));
        @initialize
        @moduleD(Test)
        class TestSwitch extends LeanES.NS.Switch {
          @nameBy static __filename = 'TestSwitch';
          @meta static object = {};
          @property routerName = LeanES.NS.APPLICATION_ROUTER;
        }
        facade.registerProxy(TestRouter.new(LeanES.NS.APPLICATION_ROUTER));
        const switchMediator = TestSwitch.new('TEST_SWITCH_MEDIATOR');
        switchMediator.initializeNotifier(KEY);
        switchMediator.onRegister();
        assert.instanceOf(switchMediator.getViewComponent(), EventEmitter, 'Event emitter did not created');
        switchMediator.onRemove();
      }).to.not.throw(Error);
    });
  });
  describe('.onRemove', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run remove procedure', () => {
      expect(() => {
        const KEY = 'TEST_SWITCH_003';
        facade = Facade.getInstance(KEY);
        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant ROOT = `${__dirname}/config/`;
        }
        const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
        facade.registerProxy(configs);
        @initialize
        @moduleD(Test)
        class TestRouter extends LeanES.NS.Router {
          @nameBy static __filename = 'TestRouter';
          @meta static object = {};
        }
        facade.registerProxy(TestRouter.new(LeanES.NS.APPLICATION_ROUTER));
        @initialize
        @moduleD(Test)
        class TestSwitch extends LeanES.NS.Switch {
          @nameBy static __filename = 'TestSwitch';
          @meta static object = {};
          @property routerName = LeanES.NS.APPLICATION_ROUTER;
        }
        const switchMediator = TestSwitch.new('TEST_SWITCH_MEDIATOR');
        switchMediator.initializeNotifier(KEY);
        switchMediator.onRegister();
        switchMediator.onRemove();
        assert.equal(switchMediator.getViewComponent().eventNames().length, 0, 'Event listeners not cleared');
      }).to.not.throw(Error);
    });
  });
  describe('.rendererFor', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should define renderers and get them one by one', async () => {
      const KEY = 'TEST_SWITCH_004';
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @moduleD(Test)
      class TestRenderer extends LeanES.NS.ResourceRenderer {
        @nameBy static __filename = 'TestRenderer';
        @meta static object = {};
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);
      require.main.require(__dirname + '/integration/renderers')(Test);
      facade.registerProxy(Test.NS.AtomRenderer.new('TEST_ATOM_RENDERER'));
      facade.registerProxy(Test.NS.JsonRenderer.new('TEST_JSON_RENDERER'));
      facade.registerProxy(Test.NS.HtmlRenderer.new('TEST_HTML_RENDERER'));
      facade.registerProxy(Test.NS.XmlRenderer.new('TEST_XML_RENDERER'));

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property jsonRendererName = 'TEST_JSON_RENDERER';
        @property htmlRendererName = 'TEST_HTML_RENDERER';
        @property xmlRendererName = 'TEST_XML_RENDERER';
        @property atomRendererName = 'TEST_ATOM_RENDERER';
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      class MyResponse extends EventEmitter {
        getHeaders() {
          LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          this._headers[field.toLowerCase()];
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
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: false
      };
      const vhData = {
        id: '123',
        title: 'Long story',
        author: {
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        description: 'True long story',
        updated: new Date()
      };
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const ctx = LeanES.NS.Context.new(req, res, switchMediator);
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const { collectionName } = resource;

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
        @method init() {
          this.super(...arguments);
          this.type = 'Test::TestEntityRecord';
        }
      }

      const boundCollection = TestsCollection.new(collectionName, {
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      const jsonRendred = await switchMediator.rendererFor('json').render(ctx, vhData, resource);
      assert.equal(jsonRendred, JSON.stringify(vhData), 'JSON did not rendered');
      const htmlRendered = await switchMediator.rendererFor('html').render(ctx, vhData, resource);
      const htmlRenderedGauge = '<html> <head> <title>Long story</title> </head> <body> <h1>Long story</h1> <p>True long story</p> </body> </html>';
      assert.equal(htmlRendered, htmlRenderedGauge, 'HTML did not rendered');
      const xmlRendered = await switchMediator.rendererFor('xml').render(ctx, vhData, resource);
      const xmlRenderedGauge = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <id>123</id>
  <title>Long story</title>
  <author>
    <name>John Doe</name>
    <email>johndoe@example.com</email>
  </author>
  <description>True long story</description>
  <updated/>
</root>`;
      assert.equal(xmlRendered, xmlRenderedGauge, 'XML did not rendered');
      const atomRendered = await switchMediator.rendererFor('atom').render(ctx, vhData, resource);
      const atomRenderedGauge = (new Feed(vhData)).atom1();
      assert.equal(atomRendered, atomRenderedGauge, 'ATOM did not rendered');
    });
  });
  describe('.sendHttpResponse', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should send http response', async () => {
      const KEY = 'TEST_SWITCH_005';
      const facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);
      const spyRendererRender = sinon.spy(() => { });

      @initialize
      @moduleD(Test)
      class TestRenderer extends LeanES.NS.ResourceRenderer {
        @nameBy static __filename = 'TestRenderer';
        @meta static object = {};
        @method render(ctx, aoData, aoResource, aoOptions) {
          spyRendererRender(ctx, aoData, aoResource, aoOptions);
          const vhData = RC.NS.Utils.assign({}, aoData);
          return JSON.stringify(vhData != null ? vhData : null);
        }
      }

      facade.registerProxy(TestRenderer.new('TEST_JSON_RENDERER'));
      facade.registerProxy(TestRenderer.new('TEST_HTML_RENDERER'));
      facade.registerProxy(TestRenderer.new('TEST_XML_RENDERER'));
      facade.registerProxy(TestRenderer.new('TEST_ATOM_RENDERER'));

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      const spyResponseSet = sinon.spy(() => { });
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property jsonRendererName = 'TEST_JSON_RENDERER';
        @property htmlRendererName = 'TEST_HTML_RENDERER';
        @property xmlRendererName = 'TEST_XML_RENDERER';
        @property atomRendererName = 'TEST_ATOM_RENDERER';
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));

      class MyResponse extends EventEmitter {
        getHeaders() {
          LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          this._headers[field.toLowerCase()];
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
          ({ finished: this.finished, _headers: this._headers } = {
            finished: false,
            _headers: {}
          });
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888/test1',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept': 'application/json, text/plain, image/png'
        },
        secure: false
      };
      const vhData = {
        id: '123',
        title: 'Long story',
        author: {
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        description: 'True long story',
        updated: new Date()
      };
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const ctx = LeanES.NS.Context.new(req, res, switchMediator);
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const { collectionName } = resource;

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
        @method init() {
          this.super(...arguments);
          this.type = 'Test::TestEntityRecord';
        }
      }
      const boundCollection = TestsCollection.new(collectionName, {
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      const renderedGauge = JSON.stringify(vhData);
      const vhOptions = {
        method: 'GET',
        path: '/test',
        resource: 'test',
        action: 'list',
        tag: '',
        template: 'test/list',
        keyName: null,
        entityName: 'test',
        recordName: 'test'
      };
      await switchMediator.sendHttpResponse(ctx, vhData, resource, vhOptions);
      console.log('.,.,.,........', ctx, vhData, resource, vhOptions);

      assert.isTrue(spyRendererRender.calledWith(ctx, vhData, resource, vhOptions), 'Render not called');
      assert.deepEqual(ctx.body, renderedGauge);
    });
  });
  describe('.sender', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should send notification', () => {
      expect(() => {
        const KEY = 'TEST_SWITCH_006';
        facade = Facade.getInstance(KEY);

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant ROOT = `${__dirname}/config/`;
        }

        const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
        facade.registerProxy(configs);

        @initialize
        @moduleD(Test)
        class TestRouter extends LeanES.NS.Router {
          @nameBy static __filename = 'TestRouter';
          @meta static object = {};
        }
        facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

        @initialize
        @moduleD(Test)
        class TestSwitch extends LeanES.NS.Switch {
          @nameBy static __filename = 'TestSwitch';
          @meta static object = {};
          @property routerName = 'TEST_SWITCH_ROUTER';
        }
        facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));

        class MyResponse extends EventEmitter {
          getHeaders() {
            LeanES.NS.Utils.copy(this._headers);
          }

          getHeader(field) {
            this._headers[field.toLowerCase()];
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
          url: 'http://localhost:8888/test1',
          headers: {
            'x-forwarded-for': '192.168.0.1'
          },
          secure: false
        };
        const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
        const ctx = LeanES.NS.Context.new(req, res, switchMediator);
        const spySwitchSendNotification = sinon.spy(switchMediator, 'sendNotification');
        const vhParams = {
          context: ctx,
          reverse: 'TEST_REVERSE'
        };
        const vhOptions = {
          method: 'GET',
          path: '/test',
          resource: 'test',
          action: 'list',
          tag: '',
          template: 'test/list',
          keyName: null,
          entityName: 'test',
          recordName: 'test'
        };
        switchMediator.sender('test', vhParams, vhOptions);
        assert.isTrue(spySwitchSendNotification.called, 'Notification not sent');
        assert.deepEqual(spySwitchSendNotification.args[0], [
          'test',
          {
            context: ctx,
            reverse: 'TEST_REVERSE'
          },
          'list'
        ]);
      }).to.not.throw(Error);
    });
  });
  describe('.compose', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should dispatch middlewares', async () => {
      const KEY = 'TEST_SWITCH_008';
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        getHeaders() {
          LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          this._headers[field.toLowerCase()];
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
      const voContext = Test.NS.Context.new(req, res, switchMediator);
      const middlewares = [];
      const handlers = [[]];
      const COUNT = 4;
      for (let i = 0; (0 <= COUNT ? i <= COUNT : i >= COUNT); 0 <= COUNT ? ++i : --i) {
        handlers[0].push(sinon.spy(async function (ctx) { }));
      }
      const fn = TestSwitch.compose(middlewares, handlers);
      await fn(voContext);
      for (let i = 0; (0 <= COUNT ? i <= COUNT : i >= COUNT); 0 <= COUNT ? ++i : --i) {
        assert.isTrue(handlers[0][i].calledWith(voContext));
      }
    });
  });
  describe('.respond', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run responding request handler', async () => {
      const KEY = 'TEST_SWITCH_009';
      const trigger = new EventEmitter();
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        getHeaders() {
          LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          trigger.emit('end', data);
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      let req = {
        method: 'POST',
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let voContext = Test.NS.Context.new(req, res, switchMediator);
      let endPromise = new Promise(function (resolve, reject) {
        trigger.once('end', resolve);
      });
      voContext.status = 201;
      switchMediator.respond(voContext);
      let data = await endPromise;
      assert.equal(data, 'Created');
      assert.equal(voContext.status, 201);
      assert.equal(voContext.message, 'Created');
      assert.equal(voContext.length, 7);
      assert.equal(voContext.type, 'text/plain');
      req = {
        method: 'GET',
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      voContext = Test.NS.Context.new(req, res, switchMediator);
      endPromise = new Promise(function (resolve, reject) {
        trigger.once('end', resolve);
      });
      voContext.body = {
        data: 'data'
      };
      switchMediator.respond(voContext);
      data = await endPromise;
      assert.equal(data, '{"data":"data"}');
      assert.equal(voContext.status, 200);
      assert.equal(voContext.message, 'OK');
      assert.equal(voContext.length, 15);
      assert.equal(voContext.type, 'application/json');
    });
  });
  describe('.callback', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should run request handler', async () => {
      const KEY = 'TEST_SWITCH_010';
      const facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        getHeaders() {
          LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          this._headers[field.toLowerCase()];
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
      const req = {
        method: 'GET',
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let res = new MyResponse();
      switchMediator.middlewares = [];
      switchMediator.middlewares.push(function (ctx) {
        ctx.body = Buffer.from(JSON.stringify({
          data: 'data'
        }));
      });
      let endPromise = new Promise(function (resolve) {
        res.once('finish', resolve);;
      });
      await switchMediator.callback()(req, res);
      let data = await endPromise;
      assert.equal(data, '{"data":"data"}');
      res = new MyResponse();
      switchMediator.middlewares.push(function (ctx) {
        ctx.throw(404);
      });
      endPromise = new Promise(function (resolve) {
        res.once('finish', resolve);;
      });
      await switchMediator.callback()(req, res);
      data = await endPromise;
      parsedData = (ref = ((() => {
        try {
          JSON.parse(data != null ? data : null);
        } catch (error) { }
      })())) != null ? ref : {};
      assert.propertyVal(parsedData, 'code', 'Not Found');
      res = new MyResponse();
      switchMediator.middlewares = [];
      switchMediator.middlewares.push(function (ctx) {
        ctx.res.emit('error', new Error('TEST'));
      });
      endPromise = new Promise(function (resolve) {
        res.once('finish', resolve);
      });
      await switchMediator.callback()(req, res);
      data = await endPromise;
    });
  });
  describe('.use', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should append middlewares', async () => {
      const KEY = 'TEST_SWITCH_011';
      const trigger = new EventEmitter();
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestLogCommand extends LeanES.NS.SimpleCommand {
        @nameBy static __filename = 'TestLogCommand';
        @meta static object = {};
        @method execute(aoNotification) {
          trigger.emit('log', aoNotification);
        }
      }
      const compareMiddlewares = function (original, used) {
        if (used.__generatorFunction__ != null) {
          assert.equal(used.__generatorFunction__, original);
        } else {
          assert.equal(used, original);
        }
      };
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      facade.registerCommand(Test.NS.Pipes.NS.LogMessage.SEND_TO_LOG, TestLogCommand);
      let promise = new Promise(function (resolve) {
        trigger.once('log', resolve);;
      });
      const testMiddlewareFirst = function* (ctx) { };
      let middlewaresCount = switchMediator.middlewares.length;
      switchMediator.use(testMiddlewareFirst);
      let notification = await promise;
      assert.lengthOf(switchMediator.middlewares, middlewaresCount + 1);
      assert.equal(notification.getBody(), 'use testMiddlewareFirst');
      let usedMiddleware = switchMediator.middlewares[middlewaresCount];
      compareMiddlewares(testMiddlewareFirst, usedMiddleware);
      promise = new Promise(function (resolve) {
        trigger.once('log', resolve);
      });
      const testMiddlewareSecond = function (ctx) { };
      middlewaresCount = switchMediator.middlewares.length;
      switchMediator.use(testMiddlewareSecond);
      notification = await promise;
      assert.lengthOf(switchMediator.middlewares, middlewaresCount + 1);
      assert.equal(notification.getBody(), 'use testMiddlewareSecond');
      usedMiddleware = switchMediator.middlewares[middlewaresCount];
      compareMiddlewares(testMiddlewareSecond, usedMiddleware);
    });
  });
  describe('.onerror', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should handle error', async () => {
      const KEY = 'TEST_SWITCH_012';
      const trigger = new EventEmitter();
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @moduleD(Test)
      class TestLogCommand extends LeanES.NS.SimpleCommand {
        @nameBy static __filename = 'TestLogCommand';
        @meta static object = {};
        @method execute(aoNotification) {
          trigger.emit('log', aoNotification);
        }
      }
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      facade.registerCommand(Test.NS.Pipes.NS.LogMessage.SEND_TO_LOG, TestLogCommand);
      const promise = new Promise(function (resolve) {
        trigger.once('log', resolve);
      });
      switchMediator.onerror(new Error('TEST_ERROR'));
      const message = await promise;
      assert.equal(message.getName(), Test.NS.Pipes.NS.LogMessage.SEND_TO_LOG);
      assert.include(message.getBody(), 'TEST_ERROR');
      assert.equal(message.getType(), Test.NS.Pipes.NS.LogMessage.LEVELS[Test.NS.Pipes.NS.LogMessage.ERROR]);
    });
  });
  describe('.del', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should alias to .delete', async () => {
      const KEY = 'TEST_SWITCH_013';
      const spyDelete = sinon.spy(() => { });
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
        @method delete() {
          spyDelete();
        }
      }
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      switchMediator.del('TEST', (() => { }));
      assert.isTrue(spyDelete.called);
      assert.isTrue(spyDelete.calledWith('TEST'));
    });
  });
  describe('.createMethod', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create method handler', async () => {
      const KEY = 'TEST_SWITCH_014';
      const trigger = new EventEmitter();
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      TestSwitch.createMethod('get');
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');

      assert.isFunction(switchMediator.get.body);
      const keyCount = 1;
      const handlerIndex = 0;
      const spyMethod = sinon.spy(() => { });
      switchMediator.get('/test/:id', function (ctx) {
        spyMethod(JSON.stringify(ctx.pathParams));
      });
      assert.isDefined(switchMediator.handlers[keyCount][handlerIndex]);

      class MyResponse extends EventEmitter {
        getHeaders() {
          LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          this._headers[field.toLowerCase()];
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

      let req = {
        method: 'GET',
        url: 'http://localhost:8888/test2',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let res = new MyResponse();
      let voContext = Test.NS.Context.new(req, res, switchMediator);
      let promise = LeanES.NS.Promise.new(function (resolve) {
        res.once('finish', resolve);
      });
      await switchMediator.handlers[keyCount][handlerIndex](voContext);
      res.end();
      await promise;
      assert.isFalse(spyMethod.called);
      spyMethod.reset();
      req = {
        method: 'GET',
        url: 'http://localhost:8888/test/123',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      res = new MyResponse();
      voContext = Test.NS.Context.new(req, res, switchMediator);
      promise = LeanES.NS.Promise.new(function (resolve) {
        res.once('finish', resolve);
      });
      await switchMediator.handlers[keyCount][handlerIndex](voContext);
      res.end();
      await promise;
      assert.isTrue(spyMethod.calledWith('{"id":"123"}'));
    });
  });
  describe('.createNativeRoute', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create method handler', async () => {
      const KEY = 'TEST_SWITCH_015';
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {};
        @method getDelayed() {
          return [];
        }
        @method init(...args) {
          this.super(...args);
          this.jobs = {};
        }
      }

      const resque = TestResque.new(LeanES.NS.RESQUE, {
        data: []
      });

      facade.registerProxy(resque);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      const spyTestAction = sinon.spy(function () {
        true;
      });

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
        @action test() {
          spyTestAction();
        }
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      TestSwitch.createMethod('get');
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      let switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      facade.registerCommand('TestResource', TestResource);
      const collectionName = "TestEntitiesCollection";

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
        @method init() {
          this.super(...arguments);
          this.type = 'Test::TestEntityRecord';
        }
      }

      const boundCollection = TestsCollection.new(collectionName, {
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const voRouter = facade.retrieveProxy(switchMediator.routerName);
      voRouter.get('/test/:id', {
        resource: 'test',
        action: 'test'
      });
      const keyCount = 1;
      const handlerIndex = 0;
      switchMediator.createNativeRoute(voRouter.routes[0]);


      class MyResponse extends EventEmitter {
        getHeaders() {
          LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          this._headers[field.toLowerCase()];
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
      const req = {
        method: 'GET',
        url: 'http://localhost:8888/test/123',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const voContext = Test.NS.Context.new(req, res, switchMediator);
      facade.registerMediator(LeanES.NS.Mediator.new(LeanES.NS.APPLICATION_MEDIATOR, {
        context: voContext
      }));
      const promise = LeanES.NS.Promise.new(function (resolve) {
        res.once('finish', resolve);
      });
      await switchMediator.handlers[keyCount][handlerIndex](voContext);
      res.end();
      await promise;
      assert.isTrue(spyTestAction.calledWith(voContext));
    });
  });
  describe('.serverListen', () => {
    let facade = null;
    afterEach(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create HTTP server', async () => {
      const KEY = 'TEST_SWITCH_016';
      const trigger = new EventEmitter();
      facade = Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
      }

      const configs = LeanES.NS.Configuration.new(LeanES.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {};
        @method getDelayed() {
          return [];
        }
        @method init(...args) {
          this.super(...args);
          this.jobs = {};
        }
      }

      const resque = TestResque.new(LeanES.NS.RESQUE, {
        data: []
      });

      facade.registerProxy(resque);

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
        @action test() {
          return {
            test: 'TEST'
          };
        }
      }
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @moduleD(Test)
      class TestSwitch extends LeanES.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
        @property jsonRendererName = Test.NS.APPLICATION_RENDERER;
      }

      @initialize
      @moduleD(Test)
      class TestLogCommand extends LeanES.NS.SimpleCommand {
        @nameBy static __filename = 'TestLogCommand';
        @meta static object = {};
        @method execute(aoNotification) {
          trigger.emit('log', aoNotification);
        }
      }

      @initialize
      @moduleD(Test)
      class TestRenderer extends LeanES.NS.ResourceRenderer {
        @nameBy static __filename = 'TestRenderer';
        @meta static object = {};
        @method render(ctx, aoData, aoResource, aoOptions) {
          const vhData = LeanES.NS.Utils.assign({}, aoData);
          JSON.stringify(vhData != null ? vhData : null);
        }
      }
      const collectionName = "TestEntitiesCollection";

      @initialize
      @mixin(LeanES.NS.MemoryCollectionMixin)
      @moduleD(Test)
      class TestsCollection extends LeanES.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class TestEntityRecord extends LeanES.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
        @method init() {
          this.super(...arguments);
          this.type = 'Test::TestEntityRecord';
        }
      }
      const boundCollection = TestsCollection.new(collectionName, {
        delegate: 'TestEntityRecord'
      });
      facade.registerProxy(boundCollection);
      facade.registerProxy(TestRenderer.new(Test.NS.APPLICATION_RENDERER));
      facade.registerCommand(Test.NS.Pipes.NS.LogMessage.SEND_TO_LOG, TestLogCommand);
      facade.registerCommand('TestResource', TestResource);
      let result = await LeanES.NS.Utils.request.get('http://localhost:8888/test/123');
      console.log('.,.,.,.', result);
      assert.equal(result.status, 500);
      assert.equal(result.message, 'connect ECONNREFUSED 127.0.0.1:8888');
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const voRouter = facade.retrieveProxy(switchMediator.routerName);
      voRouter.get('/test/:id', {
        resource: 'test',
        action: 'test'
      });
      switchMediator.createNativeRoute(voRouter.routes[0]);
      facade.registerMediator(LeanES.NS.Mediator.new(LeanES.NS.APPLICATION_MEDIATOR, {
        context: {}
      }));
      result = await LeanES.NS.Utils.request.get('http://localhost:8888/test/123');
      assert.equal(result.status, 200);
      assert.equal(result.message, 'OK');
      assert.equal(result.body, '{"test":"TEST"}');
      facade.remove();
      result = await LeanES.NS.Utils.request.get('http://localhost:8888/test/123');
      assert.equal(result.status, 500);
      assert.equal(result.message, 'connect ECONNREFUSED 127.0.0.1:8888');
    });
  });
});
