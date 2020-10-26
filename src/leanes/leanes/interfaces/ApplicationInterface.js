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

import type { ResourceInterface } from './ResourceInterface';
import type { ContextInterface } from './ContextInterface';

export interface ApplicationInterface {
  isLightweight: boolean;

  start(): void;
  finish(): void;

  migrate(opts: ?{until: ?string}): Promise<void>;

  rollback(opts: ?{steps: ?number, until: ?string}): Promise<void>;

  run<
    T = any, R = any
  >(scriptName: string, data: T): Promise<R>;

  execute<
    T = any, R = Promise<{|result: T, resource: ResourceInterface|}>
  >(resourceName: string, {
    context: ContextInterface,
    reverse: string
  }, action: string): Promise<R>;
}
