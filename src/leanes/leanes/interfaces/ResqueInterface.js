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

import type { QueueInterface } from './QueueInterface';

export interface ResqueInterface {
  tmpJobs: Array<{|
    queueName: string,
    scriptName: string,
    data: any,
    delay: ?number,
    id: string
  |}>;

  fullQueueName(
    queueName: string
  ): string;

  create(
    queueName: string,
    concurrency: ?number
  ): Promise<QueueInterface>;

  all(): Promise<QueueInterface[]>;

  get(
    queueName: string
  ): Promise<?QueueInterface>;

  remove(
    queueName: string
  ): Promise<void>;

  update(
    queueName: string,
    concurrency: number
  ): Promise<QueueInterface>;

  delay(
    queueName: string,
    scriptName: string,
    data: any,
    delay: ?number
  ): Promise<string | number>;

  getDelayed(): Promise<Array<{|
    queueName: string,
    scriptName: string,
    data: any,
    delay: ?number,
    id: string
  |}>>;

  ensureQueue(
    name: string,
    concurrency: ?number
  ): Promise<{|name: string, concurrency: number|}>;

  getQueue(
    name: string
  ): Promise<?{|name: string, concurrency: number|}>;

  removeQueue(name: string): Promise<void>;

  allQueues(): Promise<Array<?{|
    name: string, concurrency: number
  |}>>;

  pushJob(
    queueName: string,
    scriptName: string,
    data: any,
    delayUntil: ?number
  ): Promise<string | number>;

  getJob(
    queueName: string,
    jobId: string | number
  ): Promise<?object>;

  deleteJob(
    queueName: string,
    jobId: string | number
  ): Promise<boolean>;

  abortJob(
    queueName: string,
    jobId: string | number
  ): Promise<void>;

  allJobs(
    queueName: string,
    scriptName: ?string
  ): Promise<object[]>;

  pendingJobs(
    queueName: string,
    scriptName: ?string
  ): Promise<object[]>;

  progressJobs(
    queueName: string,
    scriptName: ?string
  ): Promise<object[]>;

  completedJobs(
    queueName: string,
    scriptName: ?string
  ): Promise<object[]>;

  failedJobs(
    queueName: string,
    scriptName: ?string
  ): Promise<object[]>;
}
