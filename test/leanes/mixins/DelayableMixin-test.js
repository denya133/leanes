const {expect, assert} = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, partOf, nameBy, meta, mixin, constant, method
} = LeanES.NS;

describe('DelayableMixin', () => {
  describe('._delayJob', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should put job into delayed queue', async () => {
      const KEY = 'TEST_DELAYABLE_MIXIN_001';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestClass';
        @meta static object = {};

        @method static test () {}
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static  __filename = 'TestResque';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.DelayableMixin)
      @partOf(Test)
      class TestTest extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestTest';
        @meta static object = {};
      }
      const rq = TestResque.new();
      rq.setName(LeanES.NS.RESQUE);
      facade.registerProxy(rq);
      const resque = facade.retrieveProxy(LeanES.NS.RESQUE);
      await resque.create(LeanES.NS.DELAYED_JOBS_QUEUE, 4);
      const delayJobSymbol = TestTest.classMethods._delayJob;
      assert.isTrue(delayJobSymbol != null);
      const DELAY_UNTIL = Date.now();
      const options = {
        queue: LeanES.NS.DELAYED_JOBS_QUEUE,
        delayUntil: DELAY_UNTIL
      };
      const DATA = {
        moduleName: 'Test',
        replica: await TestClass.constructor.replicateObject(TestClass),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3'],
        opts: options
      };
      await TestTest.classMethods._delayJob(facade, DATA, options);
      const rawQueue = resque._jobs['Test|>delayed_jobs'];
      const [scriptData] = rawQueue;
      assert.deepEqual(scriptData, {
        queueName: 'Test|>delayed_jobs',
        data: {
          scriptName: 'DelayedJobScript',
          data: DATA
        },
        delayUntil: DELAY_UNTIL,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
  describe('.delay', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get delayed function wrapper', async () => {
      const KEY = 'TEST_DELAYABLE_MIXIN_002';
      facade = LeanES.NS.Facade.getInstance(KEY);
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static  __filename = 'TestResque';
        @meta static object = {};
      }


      @initialize
      @mixin(LeanES.NS.DelayableMixin)
      @partOf(Test)
      class TestTest extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestTest';
        @meta static object = {};

        @method static test () {}
      }
      const rq = TestResque.new();
      rq.setName(LeanES.NS.RESQUE);
      facade.registerProxy(rq);
      const resque = facade.retrieveProxy(LeanES.NS.RESQUE);
      await resque.create(LeanES.NS.DELAYED_JOBS_QUEUE, 4);
      const DELAY_UNTIL = Date.now();
      await TestTest.delay(facade, {
        queue: LeanES.NS.DELAYED_JOBS_QUEUE,
        delayUntil: DELAY_UNTIL
      }).test('ARG_1', 'ARG_2', 'ARG_3');
      const rawQueue = resque._jobs['Test|>delayed_jobs'];
      const [scriptData] = rawQueue;
      assert.deepEqual(scriptData, {
        queueName: 'Test|>delayed_jobs',
        data: {
          scriptName: 'DelayedJobScript',
          data: {
            moduleName: 'Test',
            replica: {
              class: 'TestTest',
              type: 'class'
            },
            methodName: 'test',
            args: ['ARG_1', 'ARG_2', 'ARG_3'],
            opts: {
              queue: LeanES.NS.DELAYED_JOBS_QUEUE,
              delayUntil: DELAY_UNTIL
            }
          }
        },
        delayUntil: DELAY_UNTIL,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
  describe('.delay', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get delayed function wrapper', async () => {
      const KEY = 'TEST_DELAYABLE_MIXIN_003';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static  __filename = 'TestResque';
        @meta static object = {};
      }


      @initialize
      @mixin(LeanES.NS.DelayableMixin)
      @partOf(Test)
      class TestTest extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestTest';
        @meta static object = {};

        @method static test () {}
      }
      const rq = TestResque.new();
      rq.setName(LeanES.NS.RESQUE);
      facade.registerProxy(rq);
      const resque = facade.retrieveProxy(LeanES.NS.RESQUE);
      await resque.create(LeanES.NS.DELAYED_JOBS_QUEUE, 4);
      const DELAY_UNTIL = Date.now();
      await TestTest.delay(facade, {
        queue: LeanES.NS.DELAYED_JOBS_QUEUE,
        delayUntil: DELAY_UNTIL
      }).test('ARG_1', 'ARG_2', 'ARG_3');
      const rawQueue = resque._jobs['Test|>delayed_jobs'];
      const [scriptData] = rawQueue;
      assert.deepEqual(scriptData, {
        queueName: 'Test|>delayed_jobs',
        data: {
          scriptName: 'DelayedJobScript',
          data: {
            moduleName: 'Test',
            replica: {
              class: 'TestTest',
              type: 'class'
            },
            methodName: 'test',
            args: ['ARG_1', 'ARG_2', 'ARG_3'],
            opts: {
              queue: LeanES.NS.DELAYED_JOBS_QUEUE,
              delayUntil: DELAY_UNTIL
            }
          }
        },
        delayUntil: DELAY_UNTIL,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
});
