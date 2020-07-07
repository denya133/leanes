const { expect, assert } = require('chai');
const sinon = require('sinon');
const LeanES = require('../../../src/leanes/leanes/index');
const { co } = LeanES.NS.Utils;

describe('LoggingJunctionMixin', () => {
  describe('listNotificationInterests', () => {
    it('should get list of mediator notification interesets', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.root(__dirname);

          return Test;

        }).call(this);
        Test.initialize();
        const TestJunctionMediator = (() => {
          class TestJunctionMediator extends LeanES.NS.JunctionMediator { };

          TestJunctionMediator.inheritProtected();

          TestJunctionMediator.include(LeanES.NS.LoggingJunctionMixin);

          TestJunctionMediator.module(Test);

          return TestJunctionMediator;

        }).call(this);
        TestJunctionMediator.initialize();
        const mediator = TestJunctionMediator.new('TEST_MEDIATOR', LeanES.NS.Junction.new());
        assert.deepEqual(mediator.listNotificationInterests(), [LeanES.NS.JunctionMediator.ACCEPT_INPUT_PIPE, LeanES.NS.JunctionMediator.ACCEPT_OUTPUT_PIPE, LeanES.NS.JunctionMediator.REMOVE_PIPE, LeanES.NS.LogMessage.SEND_TO_LOG, LeanES.NS.LogFilterMessage.SET_LOG_LEVEL]);
      });
    });
  });
  describe('handleNotification', () => {
    it('should handle send-to-log notification (debug)', () => {
      co(function* () {
        const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
        const TEST_BODY = 'TEST_BODY';
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.root(__dirname);

          return Test;

        }).call(this);
        Test.initialize();
        const TestJunctionMediator = (() => {
          class TestJunctionMediator extends LeanES.NS.JunctionMediator { };

          TestJunctionMediator.inheritProtected();

          TestJunctionMediator.include(LeanES.NS.LoggingJunctionMixin);

          TestJunctionMediator.module(Test);

          return TestJunctionMediator;

        }).call(this);
        TestJunctionMediator.initialize();
        const junction = LeanES.NS.Junction.new();
        sinon.spy(junction, 'sendMessage');
        const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
        mediator.initializeNotifier(KEY);
        const notification = LeanES.NS.Notification.new(LeanES.NS.LogMessage.SEND_TO_LOG, TEST_BODY, LeanES.NS.LogMessage.LEVELS[LeanES.NS.LogMessage.DEBUG]);
        mediator.handleNotification(notification);
        const voMessage = junction.sendMessage.args[0];
        assert.propertyVal(voMessage, 'logLevel', LeanES.NS.LogMessage.DEBUG);
        assert.propertyVal(voMessage, 'sender', KEY);
        assert.propertyVal(voMessage, 'message', 'TEST_BODY');
      });
    });
    it('should handle send-to-log notification (error)', () => {
      co(function* () {
        const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
        const TEST_BODY = 'TEST_BODY';
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.root(__dirname);

          return Test;

        }).call(this);
        Test.initialize();
        const TestJunctionMediator = (() => {
          class TestJunctionMediator extends LeanES.NS.JunctionMediator { };

          TestJunctionMediator.inheritProtected();

          TestJunctionMediator.include(LeanES.NS.LoggingJunctionMixin);

          TestJunctionMediator.module(Test);

          return TestJunctionMediator;

        }).call(this);
        TestJunctionMediator.initialize();
        const junction = LeanES.NS.Junction.new();
        sinon.spy(junction, 'sendMessage');
        const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
        mediator.initializeNotifier(KEY);
        const notification = LeanES.NS.Notification.new(LeanES.NS.LogMessage.SEND_TO_LOG, TEST_BODY, LeanES.NS.LogMessage.LEVELS[LeanES.NS.LogMessage.ERROR]);
        mediator.handleNotification(notification);
        const voMessage = junction.sendMessage.args[0];

        assert.propertyVal(voMessage, 'logLevel', LeanES.NS.LogMessage.ERROR);
        assert.propertyVal(voMessage, 'sender', KEY);
        assert.propertyVal(voMessage, 'message', 'TEST_BODY');
      });
    });
    it('should handle send-to-log notification (fatal)', () => {
      co(function* () {
        const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
        const TEST_BODY = 'TEST_BODY';
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.root(__dirname);

          return Test;

        }).call(this);
        Test.initialize();
        const TestJunctionMediator = (() => {
          class TestJunctionMediator extends LeanES.NS.JunctionMediator { };

          TestJunctionMediator.inheritProtected();

          TestJunctionMediator.include(LeanES.NS.LoggingJunctionMixin);

          TestJunctionMediator.module(Test);

          return TestJunctionMediator;

        }).call(this);
        TestJunctionMediator.initialize();
        const junction = LeanES.NS.Junction.new();
        sinon.spy(junction, 'sendMessage');
        const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
        mediator.initializeNotifier(KEY);
        const notification = LeanES.NS.Notification.new(LeanES.NS.LogMessage.SEND_TO_LOG, TEST_BODY, LeanES.NS.LogMessage.LEVELS[LeanES.NS.LogMessage.FATAL]);
        mediator.handleNotification(notification);
        const voMessage = junction.sendMessage.args[0];
        assert.propertyVal(voMessage, 'logLevel', LeanES.NS.LogMessage.FATAL);
        assert.propertyVal(voMessage, 'sender', KEY);
        assert.propertyVal(voMessage, 'message', 'TEST_BODY');
      });
    });
    it('should handle send-to-log notification (warn)', () => {
      co(function* () {
        const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
        const TEST_BODY = 'TEST_BODY';
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.root(__dirname);

          return Test;

        }).call(this);
        Test.initialize();
        const TestJunctionMediator = (() => {
          class TestJunctionMediator extends LeanES.NS.JunctionMediator { };

          TestJunctionMediator.inheritProtected();

          TestJunctionMediator.include(LeanES.NS.LoggingJunctionMixin);

          TestJunctionMediator.module(Test);

          return TestJunctionMediator;

        }).call(this);
        TestJunctionMediator.initialize();
        const junction = LeanES.NS.Junction.new();
        sinon.spy(junction, 'sendMessage');
        const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
        mediator.initializeNotifier(KEY);
        const notification = LeanES.NS.Notification.new(LeanES.NS.LogMessage.SEND_TO_LOG, TEST_BODY, LeanES.NS.LogMessage.LEVELS[LeanES.NS.LogMessage.WARN]);
        mediator.handleNotification(notification);
        const voMessage = junction.sendMessage.args[0];
        assert.propertyVal(voMessage, 'logLevel', LeanES.NS.LogMessage.WARN);
        assert.propertyVal(voMessage, 'sender', KEY);
        assert.propertyVal(voMessage, 'message', 'TEST_BODY');
      });
    });
    it('should handle set-to-log notification', () => {
      co(function* () {
        const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_002';
        const TEST_LEVEL = LeanES.NS.LogMessage.NONE;
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          Test.root(__dirname);

          return Test;

        }).call(this);
        Test.initialize();
        const TestJunctionMediator = (() => {
          class TestJunctionMediator extends LeanES.NS.JunctionMediator { };

          TestJunctionMediator.inheritProtected();

          TestJunctionMediator.include(LeanES.NS.LoggingJunctionMixin);

          TestJunctionMediator.module(Test);

          return TestJunctionMediator;

        }).call(this);
        TestJunctionMediator.initialize();
        const junction = LeanES.NS.Junction.new();
        sinon.spy(junction, 'sendMessage');
        const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
        mediator.initializeNotifier(KEY);
        const notification = LeanES.NS.Notification.new(LeanES.NS.LogFilterMessage.SET_LOG_LEVEL, TEST_LEVEL);
        mediator.handleNotification(notification);
        const voMessage = junction.sendMessage.args[0];
        assert.equal(voMessage.getType(), LeanES.NS.FilterControlMessage.SET_PARAMS);
        assert.equal(voMessage.logLevel, TEST_LEVEL);
        voMessage = junction.sendMessage.args[1];
        assert.equal(voMessage.logLevel, LeanES.NS.LogMessage.CHANGE);
        assert.equal(voMessage.sender, KEY);
        assert.isDefined(voMessage.time);
        assert.equal(voMessage.message, `Changed Log Level to: ${LeanES.NS.LogMessage.LEVELS[TEST_LEVEL]}`);
      });
    });
  });
});
