const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, partOf, nameBy, meta, constant, mixin, property, method, attribute, action
} = LeanES.NS;


describe('MemoryResqueMixin', () => {
  describe('.new', () => {
    it('should create resque instance', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }

      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      assert.instanceOf(resque, TestResque, 'The `resque` is not an instance of Resque');
    });
  });
  describe('.onRegister', () => {
    it('should register resque instance', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }

      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      assert.deepEqual(resque._jobs, {});
      assert.deepEqual(resque._queues, {
        'Test|>default': {
          concurrency: 1,
          name: 'default'
        }
      });
    });
  });
  describe('.onRemove', () => {
    it('should unregister resque instance', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      assert.deepEqual(resque._jobs, {});
      assert.deepEqual(resque._queues, {
        'Test|>default': {
          concurrency: 1,
          name: 'default'
        }
      });
      resque.onRemove();
      assert.deepEqual(resque.tmpJobs, []);
      assert.deepEqual(resque._queues, {});
    });
  });
  describe('.ensureQueue', () => {
    it('should create queue config', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE', 5);
      const queue = resque._queues['Test|>TEST_QUEUE'];
      assert.propertyVal(queue, 'name', 'TEST_QUEUE');
      assert.propertyVal(queue, 'concurrency', 5);
    });
  });
  describe('.getQueue', () => {
    it('should get queue', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE', 5);
      const queue = await resque.getQueue('TEST_QUEUE');
      assert.propertyVal(queue, 'name', 'TEST_QUEUE');
      assert.propertyVal(queue, 'concurrency', 5);
    });
  });
  describe('.removeQueue', () => {
    it('should remove queue', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE', 5);
      let queue = await resque.getQueue('TEST_QUEUE');
      assert.isDefined(queue);
      await resque.removeQueue('TEST_QUEUE');
      queue = await resque.getQueue('TEST_QUEUE');
      assert.isUndefined(queue);
    });
  });
  describe('.allQueues', () => {
    it('should get all queues', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      resque.ensureQueue('TEST_QUEUE_2', 2);
      resque.ensureQueue('TEST_QUEUE_3', 3);
      resque.ensureQueue('TEST_QUEUE_4', 4);
      resque.ensureQueue('TEST_QUEUE_5', 5);
      resque.ensureQueue('TEST_QUEUE_6', 6);
      const queues = await resque.allQueues();
      assert.lengthOf(queues, 7);
      assert.includeDeepMembers(queues, [
        {
          name: 'default',
          concurrency: 1
        },
        {
          name: 'TEST_QUEUE_1',
          concurrency: 1
        },
        {
          name: 'TEST_QUEUE_2',
          concurrency: 2
        },
        {
          name: 'TEST_QUEUE_3',
          concurrency: 3
        },
        {
          name: 'TEST_QUEUE_4',
          concurrency: 4
        },
        {
          name: 'TEST_QUEUE_5',
          concurrency: 5
        },
        {
          name: 'TEST_QUEUE_6',
          concurrency: 6
        }
      ]);
    });
  });
  describe('.pushJob', () => {
    it('should save new job', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT', DATA, DATE);
      const job = resque._jobs['Test|>TEST_QUEUE_1'][jobId];
      assert.deepEqual(job, {
        queueName: 'Test|>TEST_QUEUE_1',
        data: {
          scriptName: 'TEST_SCRIPT',
          data: DATA
        },
        delayUntil: DATE,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
  describe('.getJob', () => {
    it('should get saved job', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT', DATA, DATE);
      const job = await resque.getJob('TEST_QUEUE_1', jobId);
      assert.deepEqual(job, {
        queueName: 'Test|>TEST_QUEUE_1',
        data: {
          scriptName: 'TEST_SCRIPT',
          data: DATA
        },
        delayUntil: DATE,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
  describe('.deleteJob', () => {
    it('should removed saved job', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT', DATA, DATE);
      const job = await resque.getJob('TEST_QUEUE_1', jobId);
      assert.deepEqual(job, {
        queueName: 'Test|>TEST_QUEUE_1',
        data: {
          scriptName: 'TEST_SCRIPT',
          data: DATA
        },
        delayUntil: DATE,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
      assert.isTrue(await resque.deleteJob('TEST_QUEUE_1', jobId));
      assert.isNull(await resque.getJob('TEST_QUEUE_1', jobId));
    });
  });
  describe('.allJobs', () => {
    it('should list all jobs', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      resque.ensureQueue('TEST_QUEUE_2', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_2', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_2', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_2', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_2', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_2', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.deleteJob('TEST_QUEUE_1', jobId);
      let jobs = await resque.allJobs('TEST_QUEUE_1');
      assert.lengthOf(jobs, 3);
      jobs = await resque.allJobs('TEST_QUEUE_1', 'TEST_SCRIPT_2');
      assert.lengthOf(jobs, 2);
    });
  });
  describe('.pendingJobs', () => {
    it('should list pending jobs', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      resque.ensureQueue('TEST_QUEUE_2', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_2', 'TEST_SCRIPT_1', DATA, DATE);
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_2', DATA, DATE);
      const  job = await resque.getJob('TEST_QUEUE_1', jobId);
      job.status = 'running';
      let jobs = await resque.pendingJobs('TEST_QUEUE_1')
      assert.lengthOf(jobs, 2);
      jobs = await resque.pendingJobs('TEST_QUEUE_1', 'TEST_SCRIPT_2');
      assert.lengthOf(jobs, 1);
    });
  });
  describe('.progressJobs', () => {
    it('should list runnning jobs', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      resque.ensureQueue('TEST_QUEUE_2', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_2', 'TEST_SCRIPT_1', DATA, DATE);
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_2', DATA, DATE);
      const  job = await resque.getJob('TEST_QUEUE_1', jobId);
      job.status = 'running';
      let jobs = await resque.progressJobs('TEST_QUEUE_1')
      assert.lengthOf(jobs, 1);
      jobs = await resque.progressJobs('TEST_QUEUE_1', 'TEST_SCRIPT_2');
      assert.lengthOf(jobs, 0);
    });
  });
  describe('.completedJobs', () => {
    it('should list complete jobs', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      resque.ensureQueue('TEST_QUEUE_2', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_2', 'TEST_SCRIPT_1', DATA, DATE);
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_2', DATA, DATE);
      const  job = await resque.getJob('TEST_QUEUE_1', jobId);
      job.status = 'completed';
      let jobs = await resque.completedJobs('TEST_QUEUE_1')
      assert.lengthOf(jobs, 1);
      jobs = await resque.completedJobs('TEST_QUEUE_1', 'TEST_SCRIPT_2');
      assert.lengthOf(jobs, 0);
    });
  });
  describe('.failedJobs', () => {
    it('should list failed jobs', async () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../config`;
      }

      @initialize
      @mixin(LeanES.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResponse';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.onRegister();
      resque.ensureQueue('TEST_QUEUE_1', 1);
      resque.ensureQueue('TEST_QUEUE_2', 1);
      const DATA = {
        data: 'data'
      };
      const DATE = Date.now();
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_2', 'TEST_SCRIPT_1', DATA, DATE);
      const jobId = await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_1', DATA, DATE);
      await resque.pushJob('TEST_QUEUE_1', 'TEST_SCRIPT_2', DATA, DATE);
      const  job = await resque.getJob('TEST_QUEUE_1', jobId);
      job.status = 'failed';
      let jobs = await resque.failedJobs('TEST_QUEUE_1')
      assert.lengthOf(jobs, 1);
      jobs = await resque.failedJobs('TEST_QUEUE_1', 'TEST_SCRIPT_2');
      assert.lengthOf(jobs, 0);
    });
  });
});
