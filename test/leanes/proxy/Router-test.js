const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Router,
  initialize, module: moduleD, nameBy, meta, method, property, mixin, attribute, constant
} = LeanES.NS;

describe('Router', () => {
  describe('.new, .map, map, resource, namespace, routes', () => {
    it('should create new router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', () => {
            this.resource('test2');
          });
          this.namespace('sub2', () => {
            this.resource('subtest2');
          });
        }
      }
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.lengthOf(router.routes, 15, 'Routes did not initialized');
    });
  });
  describe('defineMethod', () => {
    it('should define methods for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
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
        }
      }

      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.equal(spyDefineMethod.callCount, 3, 'Methods did not defined');
    });
    it('should define `get` method for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', () => { });
          this.get('test3', {
            resource: 'test2'
          });
        }
      }

      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
    });
  });
  describe('post', () => {
    it('should define `post` method for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', () => { });
          this.get('test3', {
            resource: 'test2'
          });
        }
      }
      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
    });
  });
  describe('put', () => {
    it('should define `put` method for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', () => { });
          this.get('test3', {
            resource: 'test2'
          });
        }
      }
      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
    });
  });
  describe('patch', () => {
    it('should define `patch` method for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', () => { });
          this.get('test3', {
            resource: 'test2'
          });
        }
      }
      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
    });
  });
  describe('delete', () => {
    it('should define `delete` method for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', () => { });
          this.get('test3', {
            resource: 'test2'
          });
        }
      }
      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.equal(spyDefineMethod.callCount, 1, 'Methods did not defined');
    });
  });
  describe('member', () => {
    it('should define `member` method for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', {
            except: 'patch'
          }, () => {
            this.member(() => {
              this.post('test4');
              this.get('test5');
            });
          });
        }
      }
      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.lengthOf(router.routes, 7, 'Methods did not defined');
    });
  });
  describe('collection', () => {
    it('should define `collection` method for router', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        // @constant ROOT = `${__dirname}/config/`;
      }

      @initialize
      @moduleD(Test)
      class TestRouter extends LeanES.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
        @method map() {
          this.resource('test2', {
            except: 'patch'
          }, () => {
            this.member(() => {
              this.post('test4');
              this.get('test5');
            });
          });
        }
      }
      const spyDefineMethod = sinon.spy(Test.NS.TestRouter, 'defineMethod');
      const router = Test.NS.TestRouter.new('TEST_ROUTER');
      assert.lengthOf(router.routes, 7, 'Methods did not defined');
    });
  });
});
