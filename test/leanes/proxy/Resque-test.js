const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, partOf, nameBy, meta, constant, mixin, property, method
} = LeanES.NS;

describe('Resque', () => {
  describe('.new', () => {
    it('should create resque instance', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
      }
      // const resque = TestResque.new('TEST_RESQUE');
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      assert.instanceOf(resque, TestResque);
    });
  });
  describe('.fullQueueName', () => {
    it('should get full queue name', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
      }
      // const resque = TestResque.new('TEST_RESQUE');
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      const queueName = resque.fullQueueName('TEST');
      assert.equal(queueName, 'Test|>TEST');
    });
  });
  describe('.create', () => {
    it('should create new queue', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      const queue = await resque.create('TEST_QUEUE', 4);
      assert.propertyVal(queue, 'name', 'TEST_QUEUE');
      assert.propertyVal(queue, 'concurrency', 4);
      assert.propertyVal(queue, 'resque', resque);
    });
  });
  describe('.all', () => {
    it('should get all queues', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
        @method allQueues() {
          return this.getData().data;
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      await resque.create('TEST_QUEUE_1', 4);
      await resque.create('TEST_QUEUE_2', 1);
      await resque.create('TEST_QUEUE_3', 2);
      await resque.create('TEST_QUEUE_4', 3);
      const queues = await resque.all();
      assert.propertyVal(queues[0], 'name', 'TEST_QUEUE_1');
      assert.propertyVal(queues[0], 'concurrency', 4);
      assert.propertyVal(queues[1], 'name', 'TEST_QUEUE_2');
      assert.propertyVal(queues[1], 'concurrency', 1);
      assert.propertyVal(queues[2], 'name', 'TEST_QUEUE_3');
      assert.propertyVal(queues[2], 'concurrency', 2);
      assert.propertyVal(queues[3], 'name', 'TEST_QUEUE_4');
      assert.propertyVal(queues[3], 'concurrency', 3);
    });
  });
  describe('.get', () => {
    it('should get single queue', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
        @method getQueue(asQueueName) {
          return _.find(this.getData().data, {
            name: asQueueName
          });
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      await resque.create('TEST_QUEUE_1', 4);
      const queue = await resque.get('TEST_QUEUE_1');
      assert.propertyVal(queue, 'name', 'TEST_QUEUE_1');
      assert.propertyVal(queue, 'concurrency', 4);
    });
  });
  describe('.remove', () => {
    it('should remove single queue', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
        @method getQueue(asQueueName) {
          return _.find(this.getData().data, {
            name: asQueueName
          });
        }
        @method removeQueue(asQueueName) {
          return _.remove(this.getData().data, {
            name: asQueueName
          });
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      await resque.create('TEST_QUEUE_1', 4);
      let queue = await resque.get('TEST_QUEUE_1');
      assert.isDefined(queue);
      await resque.remove('TEST_QUEUE_1');
      queue = await resque.get('TEST_QUEUE_1');
      assert.isUndefined(queue);
    });
  });
  describe('.update', () => {
    it('should update single queue', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
        @method getQueue(asQueueName) {
          return _.find(this.getData().data, {
            name: asQueueName
          });
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      await resque.create('TEST_QUEUE_1', 4);
      let queue = await resque.get('TEST_QUEUE_1');
      assert.propertyVal(queue, 'concurrency', 4);
      await resque.update('TEST_QUEUE_1', 3);
      queue = await resque.get('TEST_QUEUE_1');
      assert.propertyVal(queue, 'concurrency', 3);
    });
  });
  describe('.delay', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should put delayed procedure into queue', async () => {
      const MULTITON_KEY = 'TEST_RESQUE_001';
      facade = LeanES.NS.Facade.getInstance(MULTITON_KEY);
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {}
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
        @method getQueue(asQueueName) {
          return _.find(this.getData().data, {
            name: asQueueName
          });
        }
        @method pushJob(name, scriptName, data, delayUntil) {
          const id = LeanES.NS.Utils.uuid.v4();
          this.jobs[id] = { name, scriptName, data, delayUntil };
          return id;
        }
        constructor(...args) {
          super(...args);
          this.jobs = {};
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      facade.registerProxy(resque);
      await resque.create('TEST_QUEUE_1', 4);
      const id = await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data'
      }, 100);
      assert.deepEqual(resque.jobs[id], {
        name: 'TEST_QUEUE_1',
        scriptName: 'TestScript',
        data: {
          data: 'data'
        },
        delayUntil: 100
      });
    });
    it('should put delayed procedure into cache', async () => {
      const MULTITON_KEY = 'TEST_RESQUE_001|>123456-5432-234-5432';
      facade = LeanES.NS.Facade.getInstance(MULTITON_KEY);
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {}
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      facade.registerProxy(resque);
      await resque.create('TEST_QUEUE_1', 4);
      const id = await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data'
      }, 100);
      const job = _.find(resque.tmpJobs, { id });
      assert.deepEqual(job, {
        id: id,
        queueName: 'TEST_QUEUE_1',
        scriptName: 'TestScript',
        data: {
          data: 'data'
        },
        delay: 100
      });
    });
  });
  describe('.getDelayed', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get delayed jobs from cache', async () => {
      const MULTITON_KEY = 'TEST_RESQUE_001|>123456-5432-234-5432';
      facade = LeanES.NS.Facade.getInstance(MULTITON_KEY);
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }
      @initialize
      @partOf(Test)
      class TestResque extends LeanES.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @property jobs = {}
        @method ensureQueue(asQueueName, anConcurrency) {
          let queue = _.find(this.getData().data, {
            name: asQueueName
          });
          if (queue != null) {
            queue.concurrency = anConcurrency;
          } else {
            queue = {
              name: asQueueName,
              concurrency: anConcurrency
            };
            this.getData().data.push(queue);
          }
          return queue;
        }
        @method getQueue(asQueueName) {
          return _.find(this.getData().data, {
            name: asQueueName
          });
        }
      }
      // const resque = TestResque.new('TEST_RESQUE', {
      //   data: []
      // });
      const resque = TestResque.new();
      resque.setName('TEST_RESQUE');
      resque.setData({
        data: []
      });
      facade.registerProxy(resque);
      await resque.create('TEST_QUEUE_1', 4);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data1'
      }, 100);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data2'
      }, 100);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data3'
      }, 100);
      await resque.delay('TEST_QUEUE_1', 'TestScript', {
        data: 'data4'
      }, 100);
      const delayeds = await resque.getDelayed();
      assert.lengthOf(delayeds, 4);
      for (let i = 0; i < delayeds.length; i++) {
        const delayed = delayeds[i];
        assert.isDefined(delayed);
        assert.isNotNull(delayed);
        assert.include(delayed, {
          queueName: 'TEST_QUEUE_1',
          scriptName: 'TestScript',
          delay: 100
        });
        assert.deepEqual(delayed.data, {
          data: `data${i + 1}`
        });
      }
    });
  });
});
