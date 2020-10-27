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

import type { TransitionInterface } from './TransitionInterface';
import type { StateInterface } from './StateInterface';

export interface EventInterface {
  transition: TransitionInterface;
  target: StateInterface;

  testGuard(): Promise<?any>;
  testIf(): Promise<?any>;
  testUnless(): Promise<?any>;
  doBefore(): Promise<?any>;
  doAfter(): Promise<?any>;
  doSuccess(): Promise<?any>;
  doError(): Promise<?any>;
}
