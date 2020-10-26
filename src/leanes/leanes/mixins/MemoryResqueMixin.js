// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

export default (Module) => {
  const {
    DEFAULT_QUEUE,
    initializeMixin, meta, property, method,
    Utils: { _, inflect }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      // ipoJobs = PointerT(this.protected({
      @property _jobs: {[key: string]: ?Array<?{
        queueName: string,
        data: {|
          scriptName: string,
          data: any
        |},
        delayUntil: number,
        status: ('scheduled' | 'failed' | 'queued' | 'running' | 'completed'),
        lockLifetime: 5000,
        lockLimit: 2
      }>} = null;

      // ipoQueues = PointerT(this.protected({
      @property _queues: {[key: string]: ?{|
        name: string,
        concurrency: number
      |}} = null;

      @method onRegister() {
        super.onRegister(... arguments);
        this._queues = {};
        this._jobs = {};
        const fullName = this.fullQueueName(DEFAULT_QUEUE);
        this._queues[fullName] = {
          name: DEFAULT_QUEUE,
          concurrency: 1
        };
      }

      @method onRemove() {
        super.onRemove(... arguments);
        for (const qKey in this._queues) {
          delete this._queues[qKey];
        }
        this._queues = {};
        for (const jKey in this._jobs) {
          delete this._jobs[jKey];
        }
        this._jobs = {};
      }

      @method async ensureQueue(
        name: string,
        concurrency: ?number = 1
      ): Promise<{|name: string, concurrency: number|}> {
        const fullName = this.fullQueueName(name);
        const queue = this._queues[fullName];
        if (queue != null) {
          queue.concurrency = concurrency;
          this._queues[fullName] = queue;
        } else {
          this._queues[fullName] = { name, concurrency };
        }
        return { name, concurrency };
      }

      @method async getQueue(
        name: string
      ): Promise<?{|name: string, concurrency: number|}> {
        const fullName = this.fullQueueName(name);
        const queue = this._queues[fullName];
        if (queue != null) {
          const { concurrency } = queue;
          return { name, concurrency };
        } else {

        }
      }

      @method async removeQueue(queueName: string): Promise<void> {
        const fullName = this.fullQueueName(queueName);
        const queue = this._queues[fullName];
        if (queue != null) {
          delete this._queues[fullName];
        }
      }

      @method async allQueues(): Promise<Array<?{|
        name: string, concurrency: number
      |}>> {
        const queues = _.values(this._queues);
        const mapedQueues = queues.map(({ name, concurrency }) => {
          return { name, concurrency };
        });
        return mapedQueues;
      }

      @method async pushJob(
        queueName: string,
        scriptName: string,
        data: any,
        delayUntil: ?number
      ): Promise<string | number> {
        const fullName = this.fullQueueName(queueName);
        delayUntil = delayUntil || Date.now();
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        const length = this._jobs[fullName].push({
          queueName: fullName,
          data: {scriptName, data},
          delayUntil: delayUntil,
          status: 'scheduled',
          lockLifetime: 5000,
          lockLimit: 2
        });
        return length - 1;
      }

      @method async getJob(
        queueName: string,
        jobId: string | number
      ): Promise<?object> {
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        return this._jobs[fullName][jobId] || null;
      }

      @method async deleteJob(
        queueName: string,
        jobId: string | number
      ): Promise<boolean> {
        let isDeleted;
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        if (this._jobs[fullName][jobId] != null) {
          delete this._jobs[fullName][jobId];
          isDeleted = true;
        } else {
          isDeleted = false;
        }
        return isDeleted;
      }

      @method async abortJob(
        queueName: string,
        jobId: string | number
      ): Promise<void> {
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        const job = this._jobs[fullName][jobId];
        if (job != null) {
          if (job.status === 'scheduled') {
            job.status = 'failed';
            job.reason = new Error('Job has been aborted');
          }
        }
      }

      @method async allJobs(
        queueName: string,
        scriptName: ?string = null
      ): Promise<object[]> {
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        return this._jobs[fullName].filter((job) => {
          if (scriptName != null) {
            if (job.data.scriptName === scriptName) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }) || [];
      }

      @method async pendingJobs(
        queueName: string,
        scriptName: ?string = null
      ): Promise<object[]> {
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        return this._jobs[fullName].filter((job) => {
          var ref, ref1;
          if (scriptName != null) {
            if (job.data.scriptName === scriptName && _.includes(['scheduled', 'queued'], job.status)) {
              return true;
            } else {
              return false;
            }
          } else {
            if (_.includes(['scheduled', 'queued'], job.status)) {
              return true;
            } else {
              return false;
            }
          }
        }) || [];
      }

      @method async progressJobs(
        queueName: string,
        scriptName: ?string = null
      ): Promise<object[]> {
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        return this._jobs[fullName].filter((job) => {
          if (scriptName != null) {
            if (job.data.scriptName === scriptName && job.status === 'running') {
              return true;
            } else {
              return false;
            }
          } else {
            if (job.status === 'running') {
              return true;
            } else {
              return false;
            }
          }
        }) || [];
      }

      @method async completedJobs(
        queueName: string,
        scriptName: ?string = null
      ): Promise<object[]> {
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        return this._jobs[fullName].filter((job) => {
          if (scriptName != null) {
            if (job.data.scriptName === scriptName && job.status === 'completed') {
              return true;
            } else {
              return false;
            }
          } else {
            if (job.status === 'completed') {
              return true;
            } else {
              return false;
            }
          }
        }) || [];
      }

      @method async failedJobs(
        queueName: string,
        scriptName: ?string = null
      ): Promise<object[]> {
        const fullName = this.fullQueueName(queueName);
        if (this._jobs[fullName] == null) {
          this._jobs[fullName] = [];
        }
        return this._jobs[fullName].filter((job) => {
          if (scriptName != null) {
            if (job.data.scriptName === scriptName && job.status === 'failed') {
              return true;
            } else {
              return false;
            }
          } else {
            if (job.status === 'failed') {
              return true;
            } else {
              return false;
            }
          }
        }) || [];
      }
    }
    return Mixin;
  });
}
