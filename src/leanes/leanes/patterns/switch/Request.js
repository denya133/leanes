import { is as typeis } from 'type-is';
import contentType from 'content-type';
import qs from 'querystring';
import { format as stringify } from 'url';
import parse from 'parseurl';

import type { SwitchInterface } from '../../interfaces/SwitchInterface';
import type { ContextInterface } from '../../interfaces/ContextInterface';
import type { RequestInterface } from '../../interfaces/RequestInterface';

/*
Идеи взяты из https://github.com/koajs/koa/blob/master/lib/request.js
*/

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @module(Module)
  class Request extends CoreObject implements RequestInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _req: object = null; // native request object

    @property get req(): object { // native request object
      return this._req;
    }

    @property get switch(): SwitchInterface {
      return this.ctx.switch;
    }

    @property ctx: ContextInterface = null;

    @property body: ?any = null;

    @property get header(): object {
      return this.headers;
    }

    @property get headers(): object {
      return this.req.headers;
    }

    @property get originalUrl(): string {
      return this.ctx.originalUrl;
    }

    @property get url(): string {
      return this.req.url;
    }

    @property set url(url: string): string {
      return this.req.url = url;
    }

    @property get origin(): string {
      return `${this.protocol}://${this.host}`;
    }

    @property get href(): string {
      if (/^https?:\/\//i.test(this.originalUrl)) {
        return this.originalUrl;
      }
      return this.origin + this.originalUrl;
    }

    @property get method(): string {
      return this.req.method;
    }

    @property set method(method: string): string {
      return this.req.method = method;
    }

    @property get path(): string {
      return parse(this.req).pathname;
    }

    @property set path(path: string): string {
      const url = parse(this.req);
      if (url.pathname === path) {
        return path;
      }
      url.pathname = path;
      url.path = null;
      return this.url = stringify(url);
    }

    @property get query(): object {
      return qs.parse(this.querystring);
    }

    @property set query(obj: object): object {
      this.querystring = qs.stringify(obj);
      return obj;
    }

    @property get querystring(): string {
      if (this.req == null) {
        return '';
      }
      // return parse(this.req).query || '';
      return parse(this.req) !=null ? parse(this.req).query : '';
    }

    @property set querystring(str: string): string {
      const url = parse(this.req);
      if (url.search === `?${str}`) {
        return str;
      }
      url.search = str;
      url.path = null;
      return this.url = stringify(url);
    }

    @property get search(): string {
      if (!this.querystring) {
        return '';
      }
      return `?${this.querystring}`;
    }

    @property set search(str: string): string {
      return this.querystring = str;
    }

    @property get host(): string {
      const { trustProxy } = this.ctx.switch.configs;
      const host = trustProxy && this.get('X-Forwarded-Host') || this.get('Host');
      if (!host) {
        return '';
      }
      return host.split(/\s*,\s*/)[0];
    }

    @property get hostname(): string {
      if (!this.host) {
        return '';
      }
      return this.host.split(':')[0];
    }

    @property get fresh(): boolean {
      return false;
    }

    @property get stale(): boolean {
      return !this.fresh;
    }

    @property get idempotent(): boolean {
      const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
      return _.includes(methods, this.method);
    }

    @property get socket(): ?object {
      return this.req.socket;
    }

    @property get charset(): string {
      let type = this.get('Content-Type');
      if (type == null) {
        return '';
      }
      try {
        type = contentType.parse(type);
      } catch (error) {
        return '';
      }
      return type.parameters.charset || '';
    }

    @property get length(): number {
      const contentLength = this.get('Content-Length');
      if (contentLength != null) {
        if (contentLength === '') {
          return 0;
        }
        return ~~Number(contentLength);
      } else {
        return 0;
      }
    }

    @property get protocol(): 'http' | 'https' {
      const { trustProxy } = this.ctx.switch.configs;
      if (this.socket != null ? this.socket.encrypted : undefined) {
        return 'https';
      }
      if (this.req.secure) {
        return 'https';
      }
      if (!trustProxy) {
        return 'http';
      }
      const proto = this.get('X-Forwarded-Proto') || 'http';
      return proto.split(/\s*,\s*/)[0];
    }

    @property get secure(): boolean {
      return this.protocol === 'https';
    }

    @property ip: ?string = null;

    @property get ips(): string[] {
      return [];
    }

    @property get subdomains(): string[] {
      return [];
    }

    @method accepts(...args: [?(string | Array)]): string | Array | boolean {
      return this.ctx.accept.types(...args);
    }

    @method acceptsCharsets(...args: [?(string | Array)]): string | Array {
      return this.ctx.accept.charsets(...args);
    }

    @method acceptsEncodings(...args: [?(string | Array)]): string | Array {
      return this.ctx.accept.encodings(...args);
    }

    @method acceptsLanguages(...args: [?(string | Array)]): string | Array {
      return this.ctx.accept.languages(...args);
    }

    @method is(...args: [string | Array]): ?(string | boolean) {
      let [ types ] = args;
      if (!types) {
        return typeis(this.req);
      }
      if (!_.isArray(types)) {
        types = args;
      }
      return typeis(this.req, types);
    }

    @property get type(): string {
      const type = this.get('Content-Type');
      if (type == null) {
        return '';
      }
      return type.split(';')[0];
    }

    @method 'get'(field: string): string {
      const req = this.req;
      switch (field = field.toLowerCase()) {
        case 'referer':
        case 'referrer':
          return req.headers.referrer || req.headers.referer || '';
        default:
          return req.headers[field] || '';
      }
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(context: ContextInterface, req: object) {
      super();
      this.ctx = context;
      this._req = req;
      const socRemoteAddress = this.req.socket && this.req.socket.remoteAddress;
      const reqRemoteAddress = this.req.remoteAddress;
      this.ip = this.ips[0] || socRemoteAddress || reqRemoteAddress || '';
    }
  }
}
