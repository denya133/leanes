import type { NotificationInterface } from '../patternes';
import type { PipeMessageInterface } from './interfaces/PipeMessageInterface';


export default (Module) => {
  const {
    Mediator, Junction,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;
  const { INPUT, OUTPUT } = Junction;


  @initialize
  @module(Module)
  class JunctionMediator extends Mediator {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static ACCEPT_INPUT_PIPE: string = 'acceptInputPipe';
    @property static ACCEPT_OUTPUT_PIPE: string = 'acceptOutputPipe';
    @property static REMOVE_PIPE: string = 'removePipe';

    // ipoJunction = PointerT(JunctionMediator.protected({
    @property get _junction(): Junction {
      return this.getViewComponent();
    }

    @method listNotificationInterests(): string[] {
      return [
        JunctionMediator.ACCEPT_INPUT_PIPE,
        JunctionMediator.ACCEPT_OUTPUT_PIPE,
        JunctionMediator.REMOVE_PIPE
      ];
    }

    @method handleNotification(aoNotification: NotificationInterface): void {
      const pipeName = aoNotification.getType();
      switch (aoNotification.getName()) {
        case JunctionMediator.ACCEPT_INPUT_PIPE:
          const inputPipe = aoNotification.getBody();
          if (this._junction.registerPipe(pipeName, INPUT, inputPipe)) {
            this._junction.addPipeListener(pipeName, this, this.handlePipeMessage);
          }
          break;
        case JunctionMediator.ACCEPT_OUTPUT_PIPE:
          const outputPipe = aoNotification.getBody();
          this._junction.registerPipe(pipeName, OUTPUT, outputPipe);
          break;
        case JunctionMediator.REMOVE_PIPE:
          this._junction.removePipe(pipeName);
      }
    }

    @method handlePipeMessage(aoMessage: PipeMessageInterface): void {
      return this.send(aoMessage.getType(), aoMessage);
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
