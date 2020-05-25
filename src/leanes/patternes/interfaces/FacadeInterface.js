import type { ProxyInterface } from './ProxyInterface';
import type { MediatorInterface } from './MediatorInterface';
import type { NotificationInterface } from './NotificationInterface';

export interface FacadeInterface {
  remove(): void;

  registerCommand(asNotificationName: string, aCommand: Class<*>): void;

  removeCommand(asNotificationName: string): void;

  hasCommand(asNotificationName: string): boolean;

  registerProxy(aoProxy: ProxyInterface): void;

  retrieveProxy(asProxyName: string): ?ProxyInterface;

  removeProxy(asProxyName: string): ?ProxyInterface;

  hasProxy(asProxyName: string): boolean;

  registerMediator(aoMediator: MediatorInterface): void;

  retrieveMediator(asMediatorName: string): ?MediatorInterface;

  removeMediator(asMediatorName: string): ?MediatorInterface;

  hasMediator(asMediatorName: string): boolean;

  notifyObservers(aoNotification: NotificationInterface): void;

  sendNotification(asName: string, aoBody: ?any, asType: ?string): void;
}
