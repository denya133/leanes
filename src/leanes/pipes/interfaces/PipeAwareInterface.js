import type { PipeFittingInterface } from './PipeFittingInterface'


export interface PipeAwareInterface {
  acceptInputPipe(asName: string, aoPipe: PipeFittingInterface): void;
  acceptOutputPipe(asName: string, aoPipe: PipeFittingInterface): void;
}
