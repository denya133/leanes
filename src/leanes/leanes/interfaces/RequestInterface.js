

export interface RequestInterface {
  +req: object; // native request object

  body: ?any;

  +header: object;

  +headers: object;

  +originalUrl: string;

  url: string;

  +origin: string;

  +href: string;

  method: string;

  path: string;

  query: object;

  querystring: string;

  search: string;

  +host: string;

  +hostname: string;

  +fresh: boolean;

  +stale: boolean;

  +idempotent: boolean;

  +socket: ?object;

  +charset: string;

  +length: number;

  +protocol: 'http' | 'https';

  +secure: boolean;

  ip: ?string;

  +ips: string[];

  +subdomains: string[];

  accepts(...args: [?(string | Array)]): string | Array | boolean;

  acceptsCharsets(...args: [?(string | Array)]): string | Array;

  acceptsEncodings(...args: [?(string | Array)]): string | Array;

  acceptsLanguages(...args: [?(string | Array)]): string | Array;

  is(...args: [string | Array]): ?(string | boolean);

  +type: string;

  'get'(field: string): string;
}
