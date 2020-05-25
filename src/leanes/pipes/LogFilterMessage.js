import type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default (Module) => {
  const {
    FilterControlMessage,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @module(Module)
  class LogFilterMessage extends FilterControlMessage {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get BASE(): string {
      return `${FilterControlMessage.BASE}LoggerModule/`;
    }

    @property static get LOG_FILTER_NAME(): string {
      return `${this.BASE}logFilter/`;
    }

    @property static get SET_LOG_LEVEL(): string {
      return `${this.BASE}setLogLevel/`;
    }

    @property logLevel: number = 0;

    @method static filterLogByLevel(message: PipeMessageInterface, params: ?object) {
      const voParams = params || {};
      let { logLevel } = voParams;
      if (logLevel == null) {
        logLevel = 0;
      }
      if (message.getHeader().logLevel > voParams.logLevel) {
        throw new Error();
      }
    }

    constructor(action: string, logLevel: ?number = 0) {
      super(action, LogFilterMessage.LOG_FILTER_NAME, null, { logLevel });
      this.logLevel = logLevel;
    }
  }
}
