

export default (Module) => {
  const {
    PipeMessage,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @partOf(Module)
  class LineControlMessage extends PipeMessage {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get BASE(): string {
      return `${PipeMessage.BASE}queue/`;
    }

    @property static get FLUSH(): string {
      return `${this.BASE}flush`;
    }

    @property static get SORT(): string {
      return `${this.BASE}sort`;
    }

    @property static get FIFO(): string {
      return `${this.BASE}fifo`;
    }

    constructor(asType: string) {
      super(asType);
    }
  }
}
