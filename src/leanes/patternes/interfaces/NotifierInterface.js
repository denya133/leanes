export interface NotifierInterface {
  sendNotification(asName: string, aoBody: ?any, asType: ?string): void;

  initializeNotifier(asKey: string): void;
}
