import type { ProxyInterface } from './ProxyInterface';
import type { MediatorInterface } from './MediatorInterface';
import type { NotificationInterface } from './NotificationInterface';

export interface FacadeInterface {
  remove(): Promise<void>;

  registerCommand(asNotificationName: string, aCommand: Class<*>): void;

  removeCommand(asNotificationName: string): Promise<void>;

  hasCommand(asNotificationName: string): boolean;

  registerProxy(aoProxy: ProxyInterface): void;

  retrieveProxy(asProxyName: string): ?ProxyInterface;

  removeProxy(asProxyName: string): Promise<?ProxyInterface>;

  hasProxy(asProxyName: string): boolean;

  registerMediator(aoMediator: MediatorInterface): void;

  retrieveMediator(asMediatorName: string): ?MediatorInterface;

  removeMediator(asMediatorName: string): Promise<?MediatorInterface>;

  hasMediator(asMediatorName: string): boolean;

  notifyObservers(aoNotification: NotificationInterface): Promise<void>;

  sendNotification(asName: string, aoBody: ?any, asType: ?string): Promise<void>;
}
