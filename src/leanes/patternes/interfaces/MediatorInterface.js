import type { NotificationInterface } from './NotificationInterface';


export interface MediatorInterface {
  getMediatorName(): string;

  getViewComponent(): ?any;

  setViewComponent(aoViewComponent: ?any): void;

  listNotificationInterests(): Array;

  handleNotification(aoNotification: NotificationInterface): ?Promise<void>;

  onRegister(): void;

  onRemove(): Promise<void>;
}
