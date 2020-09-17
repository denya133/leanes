const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  APPLICATION_MEDIATOR,
  NotificationInterface, Controller, SimpleCommand, Notification,
  initialize, module:moduleD, nameBy, meta, method, property
} = LeanES.NS;

describe('Controller', () => {
  describe('.getInstance', () => {
    it('should get new or exiciting instance of Controller', () => {
      expect(() => {
        const controller = Controller.getInstance('TEST1');
        if(!(controller instanceof Controller)) {
          throw new Error('The `controller` is not an instance of Controller');
        }
      }).to.not.throw(Error);
    });
  });
  describe('.removeController', () => {
    it('should get new instance of Controller, remove it and get new one', () => {
      expect(() => {
        const controller = Controller.getInstance('TEST2');
        Controller.removeController('TEST2');
        const newController = Controller.getInstance('TEST2');
        if(controller === newController) {
          throw new Error('Controller instance didn`t renewed')
        }
      }).to.not.throw(Error);
    });
  });
  describe('.registerCommand', () => {
    it('should register new command', () => {
      expect(() => {
        const controller = Controller.getInstance('TEST3');
        @initialize
        class TestCommand extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
          @method execute() {}
        }
        controller.registerCommand('TEST_COMMAND', TestCommand);
        assert(controller.hasCommand('TEST_COMMAND'));
      }).to.not.throw(Error);
    });
  });
  describe('.lazyRegisterCommand', () => {
    const INSTANCE_NAME = 'TEST999';
    before(() => {
      LeanES.NS.Facade.getInstance(INSTANCE_NAME);
    })
    after(() => {
      LeanES.NS.Facade.getInstance(INSTANCE_NAME).remove();
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
      class TestCommand extends SimpleCommand {
        @nameBy static  __filename = 'TestCommand';
        @meta static object = {};

        @method execute() {
            spy();
        }
      }
      @initialize
      @moduleD(Test)
      class Application extends Test.NS.CoreObject {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
      }
      const facade = Test.NS.Facade.getInstance(INSTANCE_NAME);
      const controller = Controller.getInstance(INSTANCE_NAME);
      facade.registerMediator(Test.NS.Mediator.new(APPLICATION_MEDIATOR, Application.new()));
      let notification = new Notification('TEST_COMMAND2');
      controller.lazyRegisterCommand(notification.getName(), 'TestCommand');
      assert(controller.hasCommand(notification.getName()));
      controller.executeCommand(notification);
      assert(spy.called);
      spy.resetHistory();
      notification = new Notification('TestCommand');
      controller.lazyRegisterCommand(notification.getName());
      assert(controller.hasCommand(notification.getName()));
      controller.executeCommand(notification);
      assert(spy.called);
    });
  });
  describe('.executeCommand', () => {
    it('should register new command and call it', () => {
      expect(() => {
        const controller = Controller.getInstance('TEST4');
        const spy = sinon.spy();
        spy.resetHistory();
        @initialize
        class TestCommand extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
          @method execute() {
            spy();
          }
        }
        let notification = new Notification('TEST_COMMAND1');
        controller.registerCommand(notification.getName(), TestCommand);
        controller.executeCommand(notification);
        assert(spy.called);
      }).to.not.throw(Error);
    });
  });
  describe('.removeCommand', () => {
    it('should remove command if present', () => {
      expect(() => {
        const controller = Controller.getInstance('TEST5');
        @initialize
        class TestCommand extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
          @method execute() {}
        }
        controller.removeCommand('TEST_COMMAND');
        controller.removeCommand('TEST_COMMAND1');
        assert(!controller.hasCommand('TEST_COMMAND'))
        assert(!controller.hasCommand('TEST_COMMAND1'))
      }).to.not.throw(Error);
    });
  });
  describe('.hasCommand', () => {
    it('should has command', () => {
      expect(() => {
        const controller = Controller.getInstance('TEST6');
        @initialize
        class TestCommand extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
        }
        controller.registerCommand('TEST_COMMAND', TestCommand);
        assert(controller.hasCommand('TEST_COMMAND'))
        assert(!controller.hasCommand('TEST_COMMAND_ABSENT'))
      }).to.not.throw(Error);
    });
  });
});
