import type { NotificationInterface } from './NotificationInterface';


export interface MediatorInterface {
  getMediatorName(): string;

  getViewComponent(): ?any;

  setViewComponent(aoViewComponent: ?any): void;

  listNotificationInterests(): Array;

  handleNotification(aoNotification: NotificationInterface): void;

  onRegister(): void;

  onRemove(): void;
}
