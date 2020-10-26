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

const hasProp = {}.hasOwnProperty;

export default (Module) => {
  const {
    CoreObject,
    initialize, partOf, meta, property, method, nameBy,
  } = Module.NS;


  @initialize
  @partOf(Module)
  class Queue extends CoreObject implements QueueInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property resque: ResqueInterface = null;
    @property name: string = null;
    @property concurrency: number = null;

    @method async delay(scriptName: string, data: any, delayUntil: ?number): string | number {
      return await this.resque.delay(this.name, scriptName, data, delayUntil);
    }

    @method async push(scriptName: string, data: any, delayUntil: ?number): string | number {
      return await this.resque.pushJob(this.name, scriptName, data, delayUntil);
    }

    @method async get(jobId: string | number): ?object {
      return await this.resque.getJob(this.name, jobId);
    }

    @method async delete(jobId: string | number): boolean {
      return await this.resque.deleteJob(this.name, jobId);
    }

    @method async abort(jobId: string | number): void {
      await this.resque.abortJob(this.name, jobId);
    }

    @method async all(scriptName: ?string): Array<object> {
      return await this.resque.allJobs(this.name, scriptName);
    }

    @method async pending(scriptName: ?string): Array<object> {
      return await this.resque.pendingJobs(this.name, scriptName);
    }

    @method async progress(scriptName: ?string): Array<object> {
      return await this.resque.progressJobs(this.name, scriptName);
    }

    @method async completed(scriptName: ?string): Array<object> {
      return await this.resque.completedJobs(this.name, scriptName);
    }

    @method async failed(scriptName: ?string): Array<object> {
      return await this.resque.failedJobs(this.name, scriptName);
    }

    @method static async restoreObject(acModule: Class<Module>, replica: object): QueueInterface {
      if ((replica != null ? replica.class : undefined) === this.name && (replica != null ? replica.type : undefined) === 'instance') {
        const Facade = acModule.NS.ApplicationFacade || acModule.NS.Facade;
        const facade = Facade.getInstance(replica.multitonKey);
        const resque = facade.getProxy(replica.resqueName);
        return await resque.get(replica.name);
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: QueueInterface): object {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance.resque._multitonKey;
      replica.resqueName = instance.resque.getProxyName();
      replica.name = instance.name;
      return replica;
    }

    constructor(aoProperties: object, aoResque: ResqueInterface) {
      super(... arguments);
      this.resque = aoResque;
      for (const vsAttrName in aoProperties) {
        if (!hasProp.call(aoProperties, vsAttrName)) continue;
        const voAttrValue = aoProperties[vsAttrName];
        this[vsAttrName] = voAttrValue;
      }
    }
  }
}
