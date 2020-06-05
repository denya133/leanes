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
