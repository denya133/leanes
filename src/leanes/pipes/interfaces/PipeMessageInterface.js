

export interface PipeMessageInterface {
  getType(): string;
  setType(asType: string): void;
  getPriority(): number;
  setPriority(anPriority: number): void;
  getHeader(): object;
  setHeader(aoHeader: object): void;
  getBody(): ?any;
  setBody(aoBody: ?any): void;
}
