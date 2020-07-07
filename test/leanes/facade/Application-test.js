const { assert } = require('chai');
const LeanES = require('../../../src/leanes/leanes/index');
const {
  FacadeInterface,
  Utils: { co }
} = LeanES.NS;

describe('Application', () => {
  describe('start', () => {
    it('should create new Application instance', () => {
      co(function* () {
        Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          Test.root(__dirname);
          Test.initialize();
          return Test;
        }).call(this);
        ApplicationFacade = (() => {
          ;
          class ApplicationFacade extends LeanES.NS.Facade { };
          ApplicationFacade.inheritProtected();
          ApplicationFacade.module(Test);
          const vpbIsInitialized = ApplicationFacade.private({
            isInitialized: Boolean
          }, {
            default: false
          });
          const cphInstanceMap = Symbol.for('~instanceMap');
          ApplicationFacade.public({
            startup: Function
          }, {
            default: function (...args) {
              this.super(...args);
              if (!this[vpbIsInitialized]) {
                this[vpbIsInitialized] = true;
              }
            }
          });
          ApplicationFacade.public({
            finish: Function
          }, {
            default: function (...args) {
              this.super(...args);
            }
          });
          ApplicationFacade.initialize();
          return ApplicationFacade;
        }).call(this);
        Application = (() => {
          class Application extends LeanES.NS.Application { };
          Application.inheritProtected();
          Application.module(Test);
          Application.public(Application.static({
            NAME: String
          }, {
            default: 'TestApplication1'
          }));
          return Application;
        }).call(this);
        Application.initialize();
        application = Application.new();
        assert.instanceOf(application, Application);
        assert.instanceOf(application.facade, ApplicationFacade);
      });
    });
  });
  describe('finish', () => {
    it('should deactivate application', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };
          Test.inheritProtected();
          Test.root(__dirname);
          return Test;
        }).call(this);
        Test.initialize();
        const ApplicationFacade = (() => {
          class ApplicationFacade extends LeanES.NS.Facade { };
          ApplicationFacade.inheritProtected();
          ApplicationFacade.module(Test);
          const vpbIsInitialized = ApplicationFacade.private({
            isInitialized: Boolean
          }, {
            default: false
          });
          const cphInstanceMap = Symbol.for('~instanceMap');
          ApplicationFacade.public({
            startup: Function
          }, {
            default: function (...args) {
              this.super(...args);
              if (!this[vpbIsInitialized]) {
                this[vpbIsInitialized] = true;
              }
            }
          });
          ApplicationFacade.public({
            finish: Function
          }, {
            default: function (...args) {
              this.super(...args);
            }
          });
          return ApplicationFacade;
        }).call(this);
        ApplicationFacade.initialize();
        const Application = (() => {
          class Application extends LeanES.NS.Application { };
          Application.inheritProtected();
          Application.module(Test);
          Application.public(Application.static({
            NAME: String
          }, {
            default: 'TestApplication2'
          }));

          return Application;

        }).call(this);
        Application.initialize();
        const application = Application.new();
        assert.instanceOf(application, Application);
        assert.instanceOf(application.facade, ApplicationFacade);
        assert.isDefined(LeanES.NS.Facade[Symbol.for('~instanceMap')][Application.NAME]);
        application.finish();
        assert.isUndefined(LeanES.NS.Facade[Symbol.for('~instanceMap')][Application.NAME]);
      });
    });
  });
});
