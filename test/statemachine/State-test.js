const chai = require("chai");
const sinon = require("sinon");
ES = require('../../src/leanes/es/index');
const expect = chai.expect;
const assert = chai.assert
({ co } = ES.prototype.Utils);

describe('State', () => {
  describe('.new()', () => {
    it('should create new State instance', () => {
      expect(() => {
        const stateMachine = ES.prototype.StateMachine.new('default', {});
        const state = ES.prototype.State.new('newState', {}, stateMachine, {});
        assert.instanceOf(state, ES.prototype.State, 'Cannot instantiate class State');
        assert.equal(state.name, 'newState');
      }).to.not.throw(Error);
    });
  });
  describe('#defineTransition, #removeTransition', () => {
    it('should successfully define transition and remove it', () => {
      expect(() => {
        const stateMachine = ES.prototype.StateMachine.new('default', {});
        const state1 = ES.prototype.State.new('newState1', {}, stateMachine, {});
        const state2 = ES.prototype.State.new('newState2', {}, stateMachine, {});
        // transition = {}
        const transition = ES.prototype.Transition.new('newTransition', {}, {});
        state1.defineTransition('test', state2, transition);
        assert.isDefined(state1.getEvent('test'), 'No added transition');
        state1.removeTransition('test');
        assert.isUndefined(state1.getEvent('test'), 'Not removed transition');
      }).to.not.throw(Error);
    });
  });
  describe('#doBeforeEnter, #doEnter, #doAfterEnter, #doBeforeExit, #doExit, #doAfterExit', () => {
    it('should run hooks by order if present', () => {
      return co(function* () {
        const anchor = {
          testBeforeEnter: () => { },
          testEnter: () => { },
          testAfterEnter: () => { },
          testBeforeExit: () => { },
          testExit: () => { },
          testAfterExit: () => { }
        };
        const spyTestBeforeEnter = sinon.spy(anchor, 'testBeforeEnter');
        const spyTestEnter = sinon.spy(anchor, 'testEnter');
        const spyTestAfterEnter = sinon.spy(anchor, 'testAfterEnter');
        const spyTestBeforeExit = sinon.spy(anchor, 'testBeforeExit');
        const spyTestExit = sinon.spy(anchor, 'testExit');
        const spyTestAfterExit = sinon.spy(anchor, 'testAfterExit');
        const stateMachine = ES.prototype.StateMachine.new('default', {});
        const state = ES.prototype.State.new('newTransition', anchor, stateMachine, {
          beforeEnter: 'testBeforeEnter',
          afterEnter: 'testAfterEnter',
          exit: 'testExit'
        });
        yield state.doBeforeEnter();
        yield state.doEnter();
        yield state.doAfterEnter();
        yield state.doBeforeExit();
        yield state.doExit();
        yield state.doAfterExit();
        assert(spyTestBeforeEnter.called, '"beforeEnter" method not called');
        assert.isFalse(spyTestEnter.called, '"enter" method called');
        assert(spyTestAfterEnter.called, '"afterEnter" method not called');
        assert.isFalse(spyTestBeforeExit.called, '"beforeExit" method called');
        assert(spyTestExit.called, '"exit" method not called');
        assert.isFalse(spyTestAfterExit.called, '"afterExit" method called');
      });
    });
  });
});
