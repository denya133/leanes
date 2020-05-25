

export interface ResponseInterface {
  +res: object; // native response object

  +socket: ?object;

  +header: objec;

  +headers: object;

  status: ?number;

  message: string;

  body: any;

  length: number;

  +headerSent: ?boolean;

  type: ?string;

  is(...args: [string | Array]): ?(string | boolean);

  'get'(field: string): string | string[];

  'set'(...args: [string | object]): ?any;

  append(field: string, val: string | string[]): void;

  remove(field: string): void;

  +writable: boolean;

  flushHeaders(): void;
}
