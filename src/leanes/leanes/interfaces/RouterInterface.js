import type { RouterRouteT } from '../types/RouterRouteT';
import type { RouteOptionsT } from '../types/RouteOptionsT';


export interface RouterInterface {
  map(): void;

  root(opts: {to: ?string, at: ?('collection' | 'member'), resource: ?string, action: ?string}): void;

  defineMethod(
    container: Array<RouterRouteT>,
    method: string,
    path: string,
    opts: ?RouteOptionsT
  ): void;

  'get'(asPath: string, aoOpts: ?RouteOptionsT): void;

  post(asPath: string, aoOpts: ?RouteOptionsT): void;

  put(asPath: string, aoOpts: ?RouteOptionsT): void;

  'delete'(asPath: string, aoOpts: ?RouteOptionsT): void;

  head(asPath: string, aoOpts: ?RouteOptionsT): void;

  options(asPath: string, aoOpts: ?RouteOptionsT): void;

  patch(asPath: string, aoOpts: ?RouteOptionsT): void;

  resource(
    asName: string,
    aoOpts: ?({
      path: ?string,
      module: ?string,
      only: ?(string | string[]),
      via: ?(string | string[]),
      except: ?(string | string[]),
      tag: ?string,
      templates: ?string,
      param: ?string,
      at: ?('collection' | 'member'),
      resource: ?string,
      above: ?object
    } | Function),
    lambda: ?Function
  ): void;

  namespace(
    asName: ?string,
    aoOpts: ({
      module: ?string,
      prefix: ?string,
      tag: ?string,
      templates: ?string,
      at: ?('collection' | 'member'),
      above: ?object
    } | Function),
    lambda: ?Function
  ): void;

  member(lambda: Function): void;

  collection(lambda: Function): void;

  +resources: Array<RouterInterface>;

  +routes: Array<{
    method: string,
    path: string,
    resource: string,
    action: string,
    tag: string,
    template: string,
    keyName: ?string,
    entityName: string,
    recordName: ?string
  }>;
}
