import PatternES from '../patternes';
const { initialize, meta, nameBy, freeze, resolver, constant } = PatternES.NS;


@initialize
@resolver(require, name => require(name))
class Pipes extends PatternES {
  @nameBy static  __filename = 'Pipes';
  @meta static object = {};

  @constant ROOT = __dirname;

}

require('./Pipe').default(Pipes);
require('./PipeMessage').default(Pipes);
require('./PipeListener').default(Pipes);
require('./FilterControlMessage').default(Pipes);
require('./LogMessage').default(Pipes);
require('./LogFilterMessage').default(Pipes);
require('./Filter').default(Pipes);
require('./Junction').default(Pipes);
require('./JunctionMediator').default(Pipes);
require('./PipeAwareModule').default(Pipes);
require('./LineControlMessage').default(Pipes);
require('./Line').default(Pipes);
require('./TeeMerge').default(Pipes);
require('./TeeSplit').default(Pipes);

export type { PipeAwareInterface } from './interfaces/PipeAwareInterface';
export type { PipeFittingInterface } from './interfaces/PipeFittingInterface';
export type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default freeze(Pipes);
