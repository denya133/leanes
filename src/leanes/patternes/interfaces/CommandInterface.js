import type { NotificationInterface } from './NotificationInterface';


export interface CommandInterface {
  execute(note: NotificationInterface): void;
}
