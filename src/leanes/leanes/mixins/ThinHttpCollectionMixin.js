// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

import type { CollectionInterface } from '../interfaces/CollectionInterface';
import type { RecordInterface } from '../interfaces/RecordInterface';
import type { CursorInterface } from '../interfaces/CursorInterface';
import type { HttpRequestParamsT } from '../types/HttpRequestParamsT';
import type { HttpRequestHashT } from '../types/HttpRequestHashT';
import type {
  RequestArgumentsT, LegacyResponseInterface, AxiosResponse
} from '../types/RequestT';

export default (Module) => {
  const {
    Cursor,
    assert,
    initializeMixin, meta, property, method,
    Utils: {_, inflect, request}
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin<
      D = RecordInterface
    > extends BaseClass {
      @meta static object = {};

      // ipsRecordMultipleName = PointerT(_Class.private({
      @property _recordMultipleName: ?string = null;

      // ipsRecordSingleName = PointerT(_Class.private({
      @property _recordSingleName: ?string = null;

      @property headers: ?{[key: string]: string} = null;

      @property host: string = 'http://localhost';

      @property namespace: string = '';

      @property queryEndpoint: string = 'query';

      @method recordMultipleName(): string {
        if (this._recordMultipleName == null) {
          this._recordMultipleName = inflect.pluralize(
            this.recordSingleName()
          );
        }
        return this._recordMultipleName;
      }

      @method recordSingleName(): string {
        if (this._recordSingleName == null) {
          this._recordSingleName = inflect.underscore(
            this.delegate.name.replace(/Record$/, '')
          );
        }
        return this._recordSingleName;
      }

      @method async push(aoRecord: D): Promise<D> {
        const params = {};
        params.requestType = 'push';
        params.recordName = this.delegate.name;
        params.snapshot = await this.serialize(aoRecord);
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        let voRecord;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          voRecord = await this.normalize(body[this.recordSingleName()]);
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
        return voRecord;
      }

      @method async remove(id: string | number): Promise<void> {
        const params = {};
        params.requestType = 'remove';
        params.recordName = this.delegate.name;
        params.id = id;
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
      }

      @method async take(id: string | number): Promise<?D> {
        const params = {};
        params.requestType = 'take';
        params.recordName = this.delegate.name;
        params.id = id;
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        let voRecord;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          voRecord = await this.normalize(body[this.recordSingleName()]);
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
        return voRecord;
      }

      @method async takeMany(ids: Array<string | number>): Promise<CursorInterface<CollectionInterface<D>, D>> {
        const records = await Promise.all(ids.map((id) => this.take(id)));
        return Cursor.new(null, records);
      }

      @method async takeAll(): Promise<CursorInterface<CollectionInterface<D>, D>> {
        const params = {};
        params.requestType = 'takeAll';
        params.recordName = this.delegate.name;
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        let voCursor;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          const vhRecordsData = body[this.recordMultipleName()];
          voCursor = Cursor.new(this, vhRecordsData);
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
        return voCursor;
      }

      @method async override(id: string | number, aoRecord: D): Promise<D> {
        const params = {};
        params.requestType = 'override';
        params.recordName = this.delegate.name;
        params.snapshot = await this.serialize(aoRecord);
        params.id = id;
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        let voRecord;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          voRecord = await this.normalize(body[this.recordSingleName()]);
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
        return voRecord;
      }

      @method async includes(id: string | number): Promise<boolean> {
        const record = await this.take(id);
        return record != null;
      }

      @method async length(): Promise<number> {
        const cursor = await this.takeAll();
        return await cursor.count();
      }

      @method headersForRequest(params: ?HttpRequestParamsT = {}): {[key: string]: string} {
        const headers = this.headers || {};
        headers['Accept'] = 'application/json';
        return headers;
      }

      @method methodForRequest(params: HttpRequestParamsT): string {
        const { requestType } = params;
        switch (requestType) {
          case 'takeAll':
            return 'GET';
          case 'take':
            return 'GET';
          case 'push':
            return 'POST';
          case 'override':
            return 'PUT';
          case 'remove':
            return 'DELETE';
          default:
            return 'GET';
        }
      }

      @method dataForRequest(params: HttpRequestParamsT): ?object {
        const { recordName, snapshot, requestType, query } = params;
        if ((snapshot != null) && (requestType === 'push' || requestType === 'override')) {
          return snapshot;
        } else {

        }
      }

      @method urlForRequest(params: HttpRequestParamsT): string {
        const { recordName, snapshot, id, requestType, query } = params;
        return this.buildURL(recordName, snapshot, id, requestType, query);
      }

      @method pathForType(recordName: string): string {
        return inflect.pluralize(
          inflect.underscore(recordName.replace(/Record$/, ''))
        );
      }

      @method urlPrefix(path: ?string, parentURL: ?string): string {
        if (!this.host || this.host === '/') {
          this.host = '';
        }
        if (path) {
          // Protocol relative url
          if (/^\/\//.test(path) || /http(s)?:\/\//.test(path)) {
            // Do nothing, the full @host is already included.
            return path;
          // Absolute path
          } else if (path.charAt(0) === '/') {
            return `${this.host}${path}`;
          } else {
            // Relative path
            return `${parentURL}/${path}`;
          }
        }
        // No path provided
        const url = [];
        if (this.host) {
          url.push(this.host);
        }
        if (this.namespace) {
          url.push(this.namespace);
        }
        return url.join('/');
      }

      @method makeURL(recordName: string, query: ?object, id: ?(number | string), isQueryable: ?boolean): string {
        const url = [];
        const prefix = this.urlPrefix();
        if (recordName) {
          const path = this.pathForType(recordName);
          if (path) {
            url.push(path);
          }
        }
        if (isQueryable && (this.queryEndpoint != null)) {
          url.push(encodeURIComponent(this.queryEndpoint));
        }
        if (prefix) {
          url.unshift(prefix);
        }
        if (id != null) {
          url.push(id);
        }
        let vsUrl = url.join('/');
        if (!this.host && vsUrl && vsUrl.charAt(0) !== '/') {
          vsUrl = '/' + vsUrl;
        }
        if (query != null) {
          query = encodeURIComponent(JSON.stringify(query != null ? query : ''));
          vsUrl += `?query=${query}`;
        }
        return vsUrl;
      }

      @method urlForTakeAll(recordName: string, query: ?object): string {
        return this.makeURL(recordName, query, null, false);
      }

      @method urlForTake(recordName: string, id: number | string): string {
        return this.makeURL(recordName, null, id, false);
      }

      @method urlForPush(recordName: string, snapshot: object): string {
        return this.makeURL(recordName, null, null, false);
      }

      @method urlForRemove(recordName: string, id: number | string): string {
        return this.makeURL(recordName, null, id, false);
      }

      @method urlForOverride(recordName: string, snapshot: object, id: number | string): string {
        return this.makeURL(recordName, null, id, false);
      }

      @method buildURL(
        recordName: string,
        snapshot: ?object,
        id: ?string,
        requestType: string,
        query: ?object
      ): string {
        switch (requestType) {
          case 'takeAll':
            return this.urlForTakeAll(recordName, query);
          case 'take':
            return this.urlForTake(recordName, id);
          case 'push':
            return this.urlForPush(recordName, snapshot);
          case 'remove':
            return this.urlForRemove(recordName, id);
          case 'override':
            return this.urlForOverride(recordName, snapshot, id);
          default:
            const vsMethod = `urlFor${inflect.camelize(requestType)}`;
            return typeof this[vsMethod] === "function" ? this[vsMethod](recordName, query, snapshot, id) : undefined;
        }
      }

      @method requestFor(params: HttpRequestParamsT): HttpRequestHashT {
        const method = this.methodForRequest(params);
        const url = this.urlForRequest(params);
        const headers = this.headersForRequest(params);
        const data = this.dataForRequest(params);
        return { method, url, headers, data };
      }

      @method async sendRequest<
        T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
      >(...args: RequestArgumentsT<T, R>): Promise<L> {
        const [ method, url, options ] = args;
        return await request(method, url, options);
      }

      @method requestHashToArguments<T = any, R = T>(
        hash: HttpRequestHashT
      ): RequestArgumentsT<T, R> {
        const { method, url, headers, data } = hash;
        const options = {
          responseType: 'json',
          headers
        };
        if (data != null) {
          options.body = data;
        }
        return [ method, url, options ];
      }

      @method async makeRequest<
        T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
      >(requestObj: HttpRequestHashT): Promise<L> { // result of requestFor
        const {
          LogMessage: { SEND_TO_LOG, LEVELS, DEBUG }
        } = Module.NS.Pipes.NS;
        const hash = this.requestHashToArguments(requestObj);
        this.sendNotification(SEND_TO_LOG, `HttpCollectionMixin::makeRequest hash ${JSON.stringify(hash)}`, LEVELS[DEBUG]);
        return await this.sendRequest(...hash);
      }
    }
    return Mixin;
  });
}
