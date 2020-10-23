export interface NotifierInterface {
  sendNotification(asName: string, aoBody: ?any, asType: ?string): ?Promise<void>;

  initializeNotifier(asKey: string): void;
}
