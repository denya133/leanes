const chai = require("chai");
const sinon = require("sinon");
ES = require('../../src/leanes/es/index');
const expect = chai.expect;
const assert = chai.assert
  ({ co } = RC.prototype.Utils);

describe('Transition', () => {
  describe('.new()', () => {
    it('should create new Transition instance', () => {
      expect(() => {
        const transition = RC.prototype.Transition.new('newTransition', {}, {});
        assert.instanceOf(transition, RC.prototype.Transition, 'Cannot instantiate class Transition');
        assert.equal(transition.name, 'newTransition');
      }).to.not.throw(Error);
    });
  });
  describe('#testGuard', () => {
    it('should get "guard" without rejects', () => {
      expect(() => {
        const anchor = {
          testGuard: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testGuard');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          guard: 'testGuard'
        });
        return transition.testGuard().then(() => {
          assert.isTrue(spyTestGuard.called, '"guard" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "guard" with rejects', () => {
      expect(() => {
        const anchor = {
          testGuard1: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testGuard1');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          guard: 'testGuard'
        });
        return transition.testGuard().then(() => {
          throw new Error('Found unexpected "guard"');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "guard" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestGuard.called, '"guard" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('#testIf', () => {
    it('should get "if" without rejects', () => {
      expect(() => {
        const anchor = {
          testIf: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testIf');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          if: 'testIf'
        });
        return transition.testIf().then(() => {
          assert(spyTestGuard.called, '"if" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "if" with rejects', () => {
      expect(() => {
        const anchor = {
          testIf1: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testIf1');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          if: 'testIf'
        });
        return transition.testIf().then(() => {
          throw new Error('Found unexpected "if"');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "if" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestGuard.called, '"if" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('#testUnless', () => {
    it('should get "unless" without rejects', () => {
      expect(() => {
        const anchor = {
          testUnless: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testUnless');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          unless: 'testUnless'
        });
        return transition.testUnless().then(() => {
          assert(spyTestGuard.called, '"unless" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "unless" with rejects', () => {
      expect(() => {
        const anchor = {
          testUnless1: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testUnless1');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          unless: 'testUnless'
        });
        return transition.testUnless().then(() => {
          throw new Error('Found unexpected "unless"');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "unless" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestGuard.called, '"unless" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('#doAfter', () => {
    it('should get after without rejects', () => {
      expect(() => {
        const anchor = {
          testAfter: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          after: 'testAfter'
        });
        return transition.doAfter().then(() => {
          assert(spyTestAfter.called, '"after" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get after with rejects', () => {
      expect(() => {
        const anchor = {
          testAfter1: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter1');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          after: 'testAfter'
        });
        return transition.doAfter().then(() => {
          throw new Error('Found unexpected after');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "after" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestAfter.called, '"after" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('#doSuccess', () => {
    it('should get success without rejects', () => {
      expect(() => {
        const anchor = {
          testSuccess: () => { }
        };
        const spyTestSuccess = sinon.spy(anchor, 'testSuccess');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          success: 'testSuccess'
        });
        return transition.doSuccess().then(() => {
          assert.isTrue(spyTestSuccess.called, '"success" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get success with rejects', () => {
      expect(() => {
        const anchor = {
          testSuccess1: () => { }
        };
        const spyTestSuccess = sinon.spy(anchor, 'testSuccess1');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          success: 'testSuccess'
        });
        return transition.doSuccess().then(() => {
          throw new Error('Found unexpected success');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "success" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestSuccess.called, '"success" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('#doAfter, #doSuccess', () => {
    it('should run "after" before "success"', () => {
      expect(() => {
        const anchor = {
          testAfter: () => { },
          testSuccess: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const spyTestSuccess = sinon.spy(anchor, 'testSuccess');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          after: 'testAfter',
          success: 'testSuccess'
        });
        return co(function* () {
          yield transition.doAfter();
          return (yield transition.doSuccess());
        }).then(() => {
          assert.isTrue(spyTestAfter.called, '"after" method not called');
          assert.isTrue(spyTestSuccess.calledAfter(spyTestAfter), '"success" not called after "after"');
        });
      }).to.not.throw(Error);
    });
  });
  describe('#testGuard, #doAfter', () => {
    it('should run "after" only if "guard" resolved as true', () => {
      expect(() => {
        const anchor = {
          test: 'test',
          testGuard: () => {
            return this.test === 'test';
          },
          testAfter: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          guard: 'testGuard',
          after: 'testAfter'
        });
        return co(function* () {
          if ((yield transition.testGuard())) {
            return (yield transition.doAfter());
          }
        }).then(() => {
          assert.isTrue(spyTestAfter.called, '"after" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should run "after" only if "unless" resolved as false', () => {
      expect(() => {
        const anchor = {
          test: 'test',
          testUnless: () => {
            return this.test !== 'test';
          },
          testAfter: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const transition = RC.prototype.Transition.new('newTransition', anchor, {
          unless: 'testUnless',
          after: 'testAfter'
        });
        return co(function* () {
          if (!(yield transition.testUnless())) {
            return (yield transition.doAfter());
          }
        }).then(() => {
          assert.isTrue(spyTestAfter.called, '"after" method not called');
        });
      }).to.not.throw(Error);
    });
  });
});