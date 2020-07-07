const { assert } = require('chai'));
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require('../../../src/leanes/leanes/index');
const {
  Router,
  Utils: { co }
} = LeanES.NS;

describe('Router', () => {
  describe('.new, .map, map, resource, namespace, routes', () => {
    it('should create new router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', () => {
              this.resource('test2');
            });
            this.namespace('sub2', () => {
              this.resource('subtest2');
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.lengthOf(router.routes, 15, 'Routes did not initialized');
      });
    });
  });
  describe('defineMethod', () => {
    it('should define methods for router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2');
            this.defineMethod([], 'get', '/get', {
              resource: 'test2'
            });
            this.defineMethod([], 'post', '/post', {
              resource: 'test2'
            });
            this.defineMethod([], 'put', '/put', {
              resource: 'test2'
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.equal(spyDefineMethod.callCount, 3, 'Methods did not defined');
      });
    });
    it('should define `get` method for router', () => {
      co(function* () {

        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', () => { });
            this.get('test3', {
              resource: 'test2'
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
      });
    });
  });
  describe('post', () => {
    it('should define `post` method for router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', () => { });
            this.post('test3', {
              resource: 'test2'
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
      });
    });
  });
  describe('put', () => {
    it('should define `put` method for router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', () => { });
            this.put('test3', {
              resource: 'test2'
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
      });
    });
  });
  describe('patch', () => {
    it('should define `patch` method for router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', () => { });
            this.patch('test3', {
              resource: 'test2'
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
      });
    });
  });
  describe('delete', () => {
    it('should define `delete` method for router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', () => { });
            this.delete('test3', {
              resource: 'test2'
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
      });
    });
  });
  describe('member', () => {
    it('should define `member` method for router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', {
              except: 'patch'
            }, () => {
              this.member(() => {
                this.post('test4');
                this.get('test5');
              });
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.lengthOf(router.routes, 7, 'Methods did not defined');
      });
    });
  });
  describe('collection', () => {
    it('should define `collection` method for router', () => {
      co(function* () {
        const Test = (() => {
          class Test extends LeanES { };

          Test.inheritProtected();

          return Test;

        }).call(this);
        Test.initialize();
        Test.prototype.TestRouter = (() => {
          class TestRouter extends LeanES.NS.Router { };

          TestRouter.inheritProtected();

          TestRouter.module(Test);

          TestRouter.map(() => {
            this.resource('test2', {
              except: 'patch'
            }, () => {
              this.collection(() => {
                this.post('test4');
                this.get('test5');
              });
            });
          });

          return TestRouter;

        }).call(this);
        Test.prototype.TestRouter.initialize();
        const spyDefineMethod = sinon.spy(Test.prototype.TestRouter.prototype, 'defineMethod');
        const router = Test.prototype.TestRouter.new('TEST_ROUTER');
        assert.lengthOf(router.routes, 7, 'Methods did not defined');
      });
    });
  });
});
