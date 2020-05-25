import type { NotificationInterface } from './NotificationInterface';


export interface ControllerInterface {

  executeCommand(aoNotification: NotificationInterface): void;

  registerCommand(asNotificationName: string, aCommand: Class<*>): void;

  addCommand(asNotificationName: string, aCommand: Class<*>): void;

  lazyRegisterCommand(asNotificationName: string, asClassName: ?string): void;

  hasCommand(asNotificationName: string): boolean;

  removeCommand(asNotificationName: string): void;
}
