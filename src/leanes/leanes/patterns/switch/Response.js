const hasProp = {}.hasOwnProperty;

import { is as typeis } from 'type-is';
import { contentType as getType } from 'mime-types';

import type { SwitchInterface } from '../../interfaces/SwitchInterface';
import type { ContextInterface } from '../../interfaces/ContextInterface';
import type { ResponseInterface } from '../../interfaces/ResponseInterface';

/*
Идеи взяты из https://github.com/koajs/koa/blob/master/lib/response.js
*/

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy,
    Utils: { _, statuses, assign }
  } = Module.NS;


  @initialize
  @module(Module)
  class Response extends CoreObject implements ResponseInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _res: object = null; // native response object

    @property get res(): object { // native response object
      return this._res;
    }

    @property get switch(): SwitchInterface {
      return this.ctx.switch;
    }

    @property ctx: ContextInterface = null;

    @property get socket(): ?object {
      return this.ctx.req.socket;
    }

    @property get header(): object {
      return this.headers;
    }

    @property get headers(): object {
      return this.res._headers || this.res.headers;
    }

    @property get status(): ?number {
      return this.res.statusCode;
    }

    @property set status(code: ?number): ?number {
      assert(_.isNumber(code), 'status code must be a number');
      assert(statuses[code], `invalid status code: ${code}`);
      assert(!this.res.headersSent, 'headers have already been sent');
      this._explicitStatus = true;
      this.res.statusCode = code;
      this.res.statusMessage = statuses[code];
      if (Boolean(this.body && statuses.empty[code])) {
        this.body = null;
      }
      return code;
    }

    @property get message(): string {
      return this.res.statusMessage || statuses[this.status];
    }

    @property set message(msg: string): string {
      this.res.statusMessage = msg;
      return msg;
    }

    @property get body(): any {
      return this._body;
    }

    @property set body(val: any): any {
      const original = this._body;
      this._body = val;
      if (val == null) {
        if (!statuses.empty[this.status]) {
          this.status = 204;
        }
        this.remove('Content-Type');
        this.remove('Content-Length');
        this.remove('Transfer-Encoding');
        return;
      }
      if (!this._explicitStatus) {
        this.status = 200;
      }
      const setType = !this.headers['content-type'];
      if (_.isString(val)) {
        if (setType) {
          this.type = /^\s*</.test(val) ? 'html' : 'text';
        }
        this.length = Buffer.byteLength(val);
        return;
      }
      if (_.isBuffer(val)) {
        if (setType) {
          this.type = 'bin';
        }
        this.length = val.length;
        return;
      }
      this.remove('Content-Length');
      this.type = 'json';
      return val;
    }

    @property get length(): number {
      const len = this.headers['content-length'];
      if (len == null) {
        if (!this.body) {
          return 0;
        }
        if (_.isString(this.body)) {
          return Buffer.byteLength(this.body);
        }
        if (_.isBuffer(this.body)) {
          return this.body.length;
        }
        if (_.isObjectLike(this.body)) {
          return Buffer.byteLength(JSON.stringify(this.body));
        }
        return 0;
      }
      return ~~Number(len);
    }

    @property set length(n: number): number {
      this.set('Content-Length', n);
      return n;
    }

    @property get headerSent(): ?boolean {
      return false;
    }

    @property get type(): ?string {
      const type = this.get('Content-Type');
      if (!type) {
        return '';
      }
      return type.split(';')[0];
    }

    @property set type(_type: ?string): ?string {
      const type = getType(_type);
      if (type) {
        this.set('Content-Type', type);
      } else {
        this.remove('Content-Type');
      }
      return _type;
    }

    @method is(...args: [string | Array]): ?(string | boolean) {
      let [ types ] = args;
      if (!types) {
        return this.type || false;
      }
      if (!_.isArray(types)) {
        types = args;
      }
      return typeis(this.type, types);
    }

    @method 'get'(field: string): string | string[] {
      return this.headers[field.toLowerCase()] || '';
    }

    @method 'set'(...args: [string | object]): ?any {
      const [ field, val ] = args;
      if (2 === args.length) {
        if (_.isArray(val)) {
          this.headers[field] = val.map(String);
        } else {
          this.headers[field] = String(val);
        }
      } else {
        for (const key in field) {
          if (!hasProp.call(field, key)) continue;
          this.set(key, field[key]);
        }
      }
    }

    @method append(field: string, val: string | string[]): void {
      const prev = this.get(field);
      if (prev) {
        if (_.isArray(prev)) {
          val = prev.concat(val);
        } else {
          val = [prev].concat(val);
        }
      }
      this.set(field, val);
    }

    @method remove(field: string): void {
      delete this.res[field]
    }

    @property get writable(): boolean {
      return true;
    }

    @method flushHeaders(): void {
      const headerNames = Object.keys(this.res._headers) || Object.keys(this.res.headers);
      for (const header of headerNames) {
        this.remove(header);
      }
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(context: ContextInterface, res: object) {
      super(... arguments);
      this.ctx = context;
      this._res = assign({headers: {}}, res);
    }
  }
}
