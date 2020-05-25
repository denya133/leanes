

export interface NotificationInterface {
  getName(): string;

  setBody(aoBody: ?any): ?any;

  getBody(): ?any;

  setType(asType: string): string;

  getType(): ?string;
}
