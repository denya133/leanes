import type { PipeMessageInterface } from './PipeMessageInterface'


export interface PipeFittingInterface {
  connect(aoOutput: PipeFittingInterface): boolean;
  disconnect(): ?PipeFittingInterface;
  write(aoMessage: PipeMessageInterface): boolean;
}
