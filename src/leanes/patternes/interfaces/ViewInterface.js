import type { ObserverInterface } from './ObserverInterface';
import type { ControllerInterface } from './ControllerInterface';
import type { MediatorInterface } from './MediatorInterface';
import type { NotificationInterface } from './NotificationInterface';


export interface ViewInterface {
  registerObserver(asNotificationName: string, aoObserver: ObserverInterface): void;

  removeObserver(asNotificationName: string, aoNotifyContext: ControllerInterface | MediatorInterface): void;

  notifyObservers(aoNotification: NotificationInterface): ?Promise<void>;

  registerMediator(aoMediator: MediatorInterface): void;

  retrieveMediator(asMediatorName: string): ?MediatorInterface;

  removeMediator(asMediatorName: string): Promise<?MediatorInterface>;

  hasMediator(asMediatorName: string): boolean;
}
