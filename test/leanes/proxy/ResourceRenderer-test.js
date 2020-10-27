const { expect, assert } = require('chai');
const _ = require('lodash');
const sinon = require('sinon');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, partOf, nameBy, meta, constant, mixin, property, method, map
} = LeanES.NS;

describe('ResourceRenderer', () => {
  describe('.new', () => {
    it('should create renderer instance', () => {
      expect(() => {
        const renderer = LeanES.NS.ResourceRenderer.new();
        renderer.setName('TEST_RENDERER');
      }).to.not.throw(Error);
    });
  });
  describe('.render(template)', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should render the data with template', async () => {
      const KEY = 'TEST_RENDERER_005';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      @mixin(LeanES.NS.TemplatableModuleMixin)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
        static get templates() {
          return {
            sample: (async function (resourceName, action, aoData) {
              return {
                [`${this.listEntityName}`]: await map(aoData, function (i) {
                  return _.omit(i, '_key', '_type', '_owner');
                })
              };
            })
          }
        }
      }

      @initialize
      @partOf(Test)
      class MyConfiguration extends LeanES.NS.Configuration {
        @nameBy static __filename = 'MyConfiguration';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.QueryableResourceMixin)
      @partOf(Test)
      class TestResource extends LeanES.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestRecord'
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class FakeApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'FakeApplication';
        @meta static object = {};
      }
      const configuration = MyConfiguration.new();
      configuration.setName(LeanES.NS.CONFIGURATION);
      configuration.setData(Test.NS.ROOT);
      facade.registerProxy(configuration);
      const mediator = ApplicationMediator.new();
      mediator.setName(LeanES.NS.APPLICATION_MEDIATOR);
      mediator.setViewComponent(FakeApplication.new());
      facade.registerMediator(mediator);

      @initialize
      @partOf(Test)
      class TestRenderer extends LeanES.NS.ResourceRenderer {
        @nameBy static __filename = 'TestRenderer';
        @meta static object = {};
      }
      const data = [
        {
          id: 1,
          test: 'test1',
          data: 'data1'
        }
      ];
      const renderer = TestRenderer.new();
      renderer.setName('TEST_RENDERER');
      facade.registerProxy(renderer);
      const resource = TestResource.new();
      resource.initializeNotifier(KEY);
      const renderResult = await renderer.render.call(renderer, {}, data, resource, {
        path: 'test',
        resource: 'TestRecord/',
        action: 'find',
        template: 'sample'
      });
      assert.deepEqual(renderResult, {
        test_records: data
      });
    });
  })
  describe('.render', () => {
    it('should render the data', async () => {
      const KEY = 'TEST_RENDERER_004';
      const facade = LeanES.NS.Facade.getInstance(KEY);
      const data = {
        test: 'test1',
        data: 'data1'
      };
      const renderer = LeanES.NS.ResourceRenderer.new('TEST_RENDERER');
      facade.registerProxy(renderer);
      const renderResult = await renderer.render.call(renderer, {}, data, {}, {});
      assert.equal(renderResult, data, 'Data not rendered');
      facade.remove();
    });

    it('should render the data in customized renderer', async () => {
      const data = {
        firstName: 'John',
        lastName: 'Doe'
      };
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestRenderer extends LeanES.NS.ResourceRenderer {
        @nameBy static __filename = 'TestRenderer';
        @meta static object = {};
        @method render(ctx, aoData, resource, aoOptions) {
          const vhData = LeanES.NS.assign({}, aoData, {
            greeting: 'Hello'
          });
          if ((aoOptions != null ? aoOptions.greeting : void 0) != null) {
            vhData.greeting = aoOptions.greeting;
          }
          return `${vhData.greeting}, ${vhData.firstName} ${vhData.lastName}!`;
        }
      }
      const renderer = TestRenderer.new('TEST_RENDERER');
      let result = await renderer.render.call(renderer, {}, data, {});
      assert.equal(result, 'Hello, John Doe!', 'Data without options not rendered');
      result = await renderer.render.call(renderer, {}, data, {}, {
        greeting: 'Hola'
      });
      assert.equal(result, 'Hola, John Doe!', 'Data with options not rendered');
    });
  });
});
