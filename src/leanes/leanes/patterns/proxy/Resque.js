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

import type { ResqueInterface } from '../../interfaces/ResqueInterface';
import type { QueueInterface } from '../../interfaces/QueueInterface';

export default (Module) => {
  const {
    DELAYED_JOBS_QUEUE,
    Proxy,
    ConfigurableMixin,
    assert,
    initialize, partOf, meta, property, method, nameBy, mixin,
    Utils: { uuid }
  } = Module.NS;


  @initialize
  @partOf(Module)
  @mixin(ConfigurableMixin)
  class Resque extends Proxy implements ResqueInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property tmpJobs: Array<{|
      queueName: string,
      scriptName: string,
      data: any,
      delay: ?number,
      id: string
    |}> = null;

    @method fullQueueName(queueName: string): string {
      if (!/\|\>/.test(queueName)) {
        const [moduleName] = this.moduleName().split('|>');
        queueName = `${moduleName}|>${queueName}`;
      }
      return queueName;
    }

    @method onRegister(...args) {
      super.onRegister(...args);
    }

    @method onRemove(...args) {
      super.onRemove(...args);
      this.tmpJobs = [];
    }

    @method async create(queueName: string, concurrency: ?number): Promise<QueueInterface> {
      const vhNewQueue = await this.ensureQueue(queueName, concurrency);
      return Module.NS.Queue.new(vhNewQueue, this);
    }

    @method async all(): Promise<QueueInterface[]> {
      const results = [];
      const vlQueues = await this.allQueues();
      for (const vhQueue of vlQueues) {
        results.push(Module.NS.Queue.new(vhQueue, this));
      }
      return results;
    }

    @method async 'get'(queueName: string): Promise<?QueueInterface> {
      const vhQueue = await this.getQueue(queueName);
      if (vhQueue != null) {
        return Module.NS.Queue.new(vhQueue, this);
      } else {

      }
    }

    @method async remove(queueName: string): Promise<void> {
      await this.removeQueue(queueName);
    }

    @method async update(queueName: string, concurrency: number): Promise<QueueInterface> {
      const vhNewQueue = await this.ensureQueue(queueName, concurrency);
      return Module.NS.Queue.new(vhNewQueue, this);
    }

    @method async delay(queueName: string, scriptName: string, data: any, delay: ?number): Promise<string | number> {
      let id;
      if (/\|\>/.test(this.facade._multitonKey)) {
        id = uuid.v4();
        this.tmpJobs.push({queueName, scriptName, data, delay, id});
      } else {
        const queue = await this.get(queueName || DELAYED_JOBS_QUEUE);
        id = await queue.push(scriptName, data, delay);
      }
      return id;
    }

    @method async getDelayed(): Promise<Array<{|
      queueName: string,
      scriptName: string,
      data: any,
      delay: ?number,
      id: string
    |}>> {
      return this.tmpJobs;
    }

    @method async ensureQueue(
      name: string,
      concurrency: ?number
    ): Promise<{|name: string, concurrency: number|}> {
      return assert.fail('Not implemented specific method');
    }

    @method async getQueue(
      name: string
    ): Promise<?{|name: string, concurrency: number|}> {
      return assert.fail('Not implemented specific method');
    }

    @method async removeQueue(name: string): Promise<void> {
      return assert.fail('Not implemented specific method');
    }

    @method async allQueues(): Promise<Array<?{|
      name: string, concurrency: number
    |}>> {
      return assert.fail('Not implemented specific method');
    }

    @method async pushJob(
      queueName: string,
      scriptName: string,
      data: any,
      delayUntil: ?number
    ): Promise<string | number> {
      return assert.fail('Not implemented specific method');
    }

    @method async getJob(
      queueName: string,
      jobId: string | number
    ): Promise<?object> {
      return assert.fail('Not implemented specific method');
    }

    @method async deleteJob(
      queueName: string,
      jobId: string | number
    ): Promise<boolean> {
      return assert.fail('Not implemented specific method');
    }

    @method async abortJob(
      queueName: string,
      jobId: string | number
    ): Promise<void> {
      return assert.fail('Not implemented specific method');
    }

    @method async allJobs(
      queueName: string,
      scriptName: ?string
    ): Promise<object[]> {
      return assert.fail('Not implemented specific method');
    }

    @method async pendingJobs(
      queueName: string,
      scriptName: ?string
    ): Promise<object[]> {
      return assert.fail('Not implemented specific method');
    }

    @method async progressJobs(
      queueName: string,
      scriptName: ?string
    ): Promise<object[]> {
      return assert.fail('Not implemented specific method');
    }

    @method async completedJobs(
      queueName: string,
      scriptName: ?string
    ): Promise<object[]> {
      return assert.fail('Not implemented specific method');
    }

    @method async failedJobs(
      queueName: string,
      scriptName: ?string
    ): Promise<object[]> {
      return assert.fail('Not implemented specific method');
    }

    constructor() {
      super(... arguments);
      this.tmpJobs = [];
    }
  }
}
