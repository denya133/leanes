import type { NotificationInterface } from './NotificationInterface';


export interface ObserverInterface {
  setNotifyMethod(amNotifyMethod: Function): void;

  setNotifyContext(aoNotifyContext: any): void;

  getNotifyMethod(): ?Function;

  getNotifyContext(): ?any;

  compareNotifyContext(object: any): boolean;

  notifyObserver(notification: NotificationInterface): void;
}
