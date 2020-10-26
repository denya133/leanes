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

import PatternES from '../patternes';
const { initialize, meta, nameBy, freeze, resolver, constant } = PatternES.NS;

@initialize
@resolver(require, name => require(name))
class Pipes extends PatternES {
  @nameBy static  __filename = 'Pipes';
  @meta static object = {};

  @constant ROOT = __dirname;

}

// require('./Pipe').default(Pipes);
// require('./PipeMessage').default(Pipes);
// require('./PipeListener').default(Pipes);
// require('./FilterControlMessage').default(Pipes);
// require('./LogMessage').default(Pipes);
// require('./LogFilterMessage').default(Pipes);
// require('./Filter').default(Pipes);
// require('./Junction').default(Pipes);
// require('./JunctionMediator').default(Pipes);
// require('./PipeAwareModule').default(Pipes);
// require('./LineControlMessage').default(Pipes);
// require('./Line').default(Pipes);
// require('./TeeMerge').default(Pipes);
// require('./TeeSplit').default(Pipes);
import PipeTF from './Pipe';
import PipeMessageTF from './PipeMessage';
import PipeListenerTF from './PipeListener';
import FilterControlMessageTF from './FilterControlMessage';
import LogMessageTF from './LogMessage';
import LogFilterMessageTF from './LogFilterMessage';
import FilterTF from './Filter';
import JunctionTF from './Junction';
import JunctionMediatorTF from './JunctionMediator';
import PipeAwareModuleTF from './PipeAwareModule';
import LineControlMessageTF from './LineControlMessage';
import LineTF from './Line';
import TeeMergeTF from './TeeMerge';
import TeeSplitTF from './TeeSplit';

PipeTF(Pipes);
PipeMessageTF(Pipes);
PipeListenerTF(Pipes);
FilterControlMessageTF(Pipes);
LogMessageTF(Pipes);
LogFilterMessageTF(Pipes);
FilterTF(Pipes);
JunctionTF(Pipes);
JunctionMediatorTF(Pipes);
PipeAwareModuleTF(Pipes);
LineControlMessageTF(Pipes);
LineTF(Pipes);
TeeMergeTF(Pipes);
TeeSplitTF(Pipes);


export type { PipeAwareInterface } from './interfaces/PipeAwareInterface';
export type { PipeFittingInterface } from './interfaces/PipeFittingInterface';
export type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default freeze(Pipes);
