import type { PipeFittingInterface } from './interfaces/PipeFittingInterface';

export default (Module) => {
  const {
    CoreObject, PipeListener,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;
  const splice = [].splice;


  @initialize
  @module(Module)
  class Junction extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static INPUT: string = 'input';
    @property static OUTPUT: string = 'output';

    // iplInputPipes = PointerT(Junction.protected({
    @property _inputPipes: string[] = null;

    // iplOutputPipes = PointerT(Junction.protected({
    @property _outputPipes:  string[] = null;

    // iplPipesMap = PointerT(Junction.protected({
    @property _pipesMap: {[key: string]: ?PipeFittingInterface} = null;

    // iplPipeTypesMap = PointerT(Junction.protected({
    @property _pipeTypesMap: {[key: string]: Junction.INPUT | Junction.OUTPUT} = null;

    @method registerPipe(name: string, type: string, pipe: PipeFittingInterface): boolean {
      let vbSuccess = true;
      if (this._pipesMap[name] == null) {
        this._pipesMap[name] = pipe;
        this._pipeTypesMap[name] = type;
        switch (type) {
          case Junction.INPUT:
            this._inputPipes.push(name);
            break;
          case Junction.OUTPUT:
            this._outputPipes.push(name);
            break;
          default:
            vbSuccess = false;
        }
      } else {
        vbSuccess = false;
      }
      return vbSuccess;
    }

    @method hasPipe(name: string): boolean {
      return this._pipesMap[name] != null;
    }

    @method hasInputPipe(name: string): boolean {
      return this.hasPipe(name) && this._pipeTypesMap[name] === Junction.INPUT;
    }

    @method hasOutputPipe(name: string): boolean {
      return this.hasPipe(name) && this._pipeTypesMap[name] === Junction.OUTPUT;
    }

    @method removePipe(name: string): void {
      let ref;
      if (this.hasPipe(name)) {
        const type = this._pipeTypesMap[name];
        const pipesList = (function() {
          switch (type) {
            case Junction.INPUT:
              return this._inputPipes;
            case Junction.OUTPUT:
              return this._outputPipes;
            default:
              return [];
          }
        }).call(this);
        let j;
        for (let i = j = 0, len = pipesList.length; j < len; i = ++j) {
          const pipe = pipesList[i];
          if (pipe === name) {
            splice.apply(pipesList, [i, i - i + 1].concat(ref = [])), ref;
            break;
          }
        }
        delete this._pipesMap[name];
        delete this._pipeTypesMap[name];
      }
    }

    @method retrievePipe(name: string): PipeFittingInterface {
      return this._pipesMap[name];
    }

    @method addPipeListener(inputPipeName: string, context: object, listener: Function): boolean {
      let vbSuccess = false;
      if (this.hasInputPipe(inputPipeName)) {
        const pipe = this._pipesMap[inputPipeName];
        vbSuccess = pipe.connect(new PipeListener(context, listener));
      }
      return vbSuccess;
    }

    @method sendMessage(outputPipeName: string, message: PipeMessageInterface): boolean {
      let vbSuccess = false;
      if (this.hasOutputPipe(outputPipeName)) {
        const pipe = this._pipesMap[outputPipeName];
        vbSuccess = pipe.write(message);
      }
      return vbSuccess;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor() {
      super(... arguments);
      this._inputPipes = [];
      this._outputPipes = [];
      this._pipesMap = {};
      this._pipeTypesMap = {};
    }
  }
}
