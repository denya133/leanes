

export interface ProxyInterface {
  getProxyName(): string;

  setData(ahData: ?any): void;

  getData(): ?any;

  onRegister(): void;

  onRemove(): Promise<void>;
}
