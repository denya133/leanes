import type { PipeFittingInterface } from './interfaces/PipeFittingInterface';

export default (Module) => {
  const {
    Pipe,
    initialize, partOf, meta, method, nameBy
  } = Module.NS;


  @initialize
  @partOf(Module)
  class TeeMerge extends Pipe {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method connectInput(aoInput: PipeFittingInterface): boolean {
      return aoInput.connect(this);
    }

    constructor(input1: ?PipeFittingInterface = null, input2: ?PipeFittingInterface = null) {
      super(... arguments);
      if (input1 != null) {
        this.connectInput(input1);
      }
      if (input2 != null) {
        this.connectInput(input2);
      }
    }
  }
}
