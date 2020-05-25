import type { ProxyInterface } from './ProxyInterface';


export interface ModelInterface {
  registerProxy(aoProxy: ProxyInterface): void;

  removeProxy(asProxyName: string): ?ProxyInterface;

  retrieveProxy(asProxyName: string): ?ProxyInterface;

  hasProxy(asProxyName: string): boolean;
}
