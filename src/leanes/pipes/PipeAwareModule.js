// @flow
// import type { FacadeInterface } from 'patternes';
import type { FacadeInterface } from '../patternes';
// import type { FacadeInterface } from '../patternes/interfaces/FacadeInterface';
import type { PipeAwareInterface } from './interfaces/PipeAwareInterface';

// (2 + 2: number);
// console.log('><><><V>V<>V<V>V< 555');
// (3 + 3: string);
// console.log('><><><V>V<>V<V>V< 666');
// const test = (): void => {
//   return 8;
// }
// console.log('><><><V>V<>V<V>V< 777');

export default (Module) => {
  const {
    CoreObject, JunctionMediator,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;
  const { ACCEPT_INPUT_PIPE, ACCEPT_OUTPUT_PIPE } = JunctionMediator;


  @initialize
  @partOf(Module)
  class PipeAwareModule extends CoreObject implements PipeAwareInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static STDOUT: string = 'standardOutput';
    @property static STDIN: string = 'standardInput';
    @property static STDLOG: string = 'standardLog';
    @property static STDSHELL: string = 'standardShell';

    @property facade: FacadeInterface = null;

    @method acceptInputPipe(asName, aoPipe) {
      this.facade.send(ACCEPT_INPUT_PIPE, aoPipe, asName);
    }

    @method acceptOutputPipe(asName, aoPipe) {
      this.facade.send(ACCEPT_OUTPUT_PIPE, aoPipe, asName);
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    // @method init(aoFacade: ?FacadeInterface) {
    //   console.log('><><><V>V<>V<V>V< 000', aoFacade);
    //   super.init(... arguments);
    //   // console.log('><><><V>V<>V<V>V< 111');
    //   // (aoFacade: FacadeInterface);
    //   // console.log('><><><V>V<>V<V>V< 222');
    //   // (aoFacade: PipeAwareInterface);
    //   // console.log('><><><V>V<>V<V>V< 333');
    //   // (aoFacade: string);
    //   console.log('><><><V>V<>V<V>V< 111', aoFacade);
    //   if (aoFacade != null) {
    //     this.facade = aoFacade;
    //   }
    //   console.log('><><><V>V<>V<V>V< 222', this.facade);
    // }

    constructor(aoFacade: ?FacadeInterface) {
      // console.log('><><><V>V<>V<V>V< 000', aoFacade);
      super(... arguments);
      // console.log('><><><V>V<>V<V>V< 111', aoFacade);
      if (aoFacade != null) {
        this.facade = aoFacade;
      }
      // console.log('><><><V>V<>V<V>V< 222', this.facade);
    }
  }
}
