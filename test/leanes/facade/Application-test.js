const { assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  FacadeInterface,
  initialize, module:moduleD, nameBy, meta, method, property
} = LeanES.NS;

describe('Application', () => {
  describe('start', () => {
    it('should create new Application instance', () => {
      @initialize
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
        @property isInitialized: boolean = false;
        @method startup(...args) {
          this.super(...args);
          if (!this.isInitialized) {
            this.isInitialized = true;
          }
        }
        @method finish(...args) {
          this.super(...args);
        }
      }

      @initialize
      @moduleD(Test)
      class Application extends LeanES.NS.Application {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
        @property static get NAME(): String {
          return 'TestApplication1';
        }
        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(Application.NAME, ApplicationFacade);
        }
      }

      const application = Application.new();
      assert.instanceOf(application, Application);
      assert.instanceOf(application.facade, ApplicationFacade);
    });
  });
  describe('finish', () => {
    it('should deactivate application', () => {
      @initialize
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
        @property isInitialized: boolean = false;
        @method startup(...args) {
          this.super(...args);
          if (!this.isInitialized) {
            this.isInitialized = true;
          }
        }
        @method finish(...args) {
          this.super(...args);
        }
      }

      @initialize
      @moduleD(Test)
      class Application extends LeanES.NS.Application {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
        @property static get NAME(): String {
          return 'TestApplication2';
        }
        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(Application.NAME, ApplicationFacade);
        }
      }
      const application = Application.new();
      assert.instanceOf(application, Application);
      assert.instanceOf(application.facade, ApplicationFacade);
      assert.isDefined(LeanES.NS.Facade._instanceMap[Application.NAME]);
      application.finish();
      assert.isUndefined(LeanES.NS.Facade._instanceMap[Application.NAME]);
    });
  });
});
