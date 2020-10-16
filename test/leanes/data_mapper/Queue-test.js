const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module: moduleD, nameBy, meta, constant, method, attribute, mixin
} = LeanES.NS;

describe('Queue', () => {
  describe('.new', () => {
    it('should create delayed queue instance', () => {
      const RESQUE = 'RESQUE';

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }

      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      assert.property(queue, 'name', 'TEST_QUEUE', 'No correct `id` property');
      assert.property(queue, 'concurrency', 4, 'No correct `rev` property');
      assert.instanceOf(queue.resque, TestResque, '`resque` is not a Resque instance');
    });
  });
  describe('.push', () => {
    it('should push job into queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return 42;
      })

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method pushJob() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }

      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const job = await queue.push('TEST_SCRIPT', { data: 'data' }, UNTIL_DATE);
      assert.equal(job, 42);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
      assert.deepEqual(spyMethod.args[0][2], { data: 'data' });
      assert.equal(spyMethod.args[0][3], UNTIL_DATE);
    });
  });
  describe('.get', () => {
    it('should get job from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return JOB;
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method getJob() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const job = await queue.get('42');
      assert.equal(job, JOB);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], '42');
    });
  });
  describe('.delete', () => {
    it('should remove job from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return true;
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method deleteJob() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const job = await queue.delete('42');
      assert.equal(job, true);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], '42');
    });
  });
  describe('.abort', () => {
    it('should stop job from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return;
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method abortJob() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const job = await queue.abort('42');
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], '42');
    });
  });
  describe('.all', () => {
    it('should get all jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method allJobs() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const jobs = await queue.all('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.pending', () => {
    it('should get pending jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method pendingJobs() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const jobs = await queue.pending('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.progress', () => {
    it('should get progress jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method progressJobs() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const jobs = await queue.progress('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.completed', () => {
    it('should get completed jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method completedJobs() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, TestResque.new(RESQUE));
      const UNTIL_DATE = new Date();
      const jobs = await queue.completed('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
});
describe('.failed', () => {
  it('should get failed jobs from queue', async () => {
    const RESQUE = 'RESQUE';
    const JOB = {
      id: '42',
      job: 'job'
    };
    const spyMethod = sinon.spy(() => {
      return [JOB];
    });

    @initialize
    class Test extends LeanES {
      @nameBy static __filename = 'Test';
      @meta static object = {};
    }

    @initialize
    @mixin(LeanES.NS.MemoryResqueMixin)
    @moduleD(Test)
    class TestResque extends LeanES.NS.Resque {
      @nameBy static __filename = 'TestResque';
      @meta static object = {};
      @method failedJobs() {
        return spyMethod();
      }
    }

    @initialize
    @moduleD(Test)
    class MyQueue extends LeanES.NS.Queue {
      @nameBy static __filename = 'MyQueue';
      @meta static object = {};
    }
    const queue = MyQueue.new({
      name: 'TEST_QUEUE',
      concurrency: 4
    }, TestResque.new(RESQUE));
    const UNTIL_DATE = new Date();
    const jobs = await queue.failed('TEST_SCRIPT');
    assert.deepEqual(jobs, [JOB]);
    assert.isTrue(spyMethod.called);
    assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
    assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
  });
  describe('.replicatedObject', () => {
    let facade = null;
    const KEY = 'TEST_DELAYED_QUEUE_001';
    after(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should create replica for delayed queue', async () => {
      const RESQUE = 'RESQUE';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method failedJobs() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      facade.registerProxy(TestResque.new(RESQUE));
      const resque = facade.retrieveProxy(RESQUE);
      const NAME = 'TEST_QUEUE';
      const queue = await resque.create(NAME, 4);
      const replica = await MyQueue.replicateObject(queue);
      assert.deepEqual(replica, {
        type: 'instance',
        class: 'Queue',
        multitonKey: KEY,
        resqueName: RESQUE,
        name: NAME
      });
    });
  });
  describe('.restoreObject', () => {
    let facade = null;
    const KEY = 'TEST_DELAYED_QUEUE_002';
    after(() => {
      facade != null ? typeof facade.remove === "function" ? facade.remove() : void 0 : void 0;
    });
    it('should restore delayed queue from replica', async () => {
      const RESQUE = 'RESQUE';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @moduleD(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method failedJobs() {
          return spyMethod();
        }
      }

      @initialize
      @moduleD(Test)
      class MyQueue extends LeanES.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      facade.registerProxy(TestResque.new(RESQUE));
      const resque = facade.retrieveProxy(RESQUE);
      const NAME = 'TEST_QUEUE';
      const queue = await resque.create(NAME, 4);
      const restoredQueue = await MyQueue.restoreObject(Test, {
        type: 'instance',
        class: 'Queue',
        multitonKey: KEY,
        resqueName: RESQUE,
        name: NAME
      });
      assert.deepEqual(queue, restoredQueue)
    })
  })
});