import type { RouterInterface } from '../../interfaces/RouterInterface';
import type { RouteOptionsT } from '../../types/RouteOptionsT';
import type { RouterRouteT } from '../../types/RouterRouteT';

const slice = [].slice;
const hasProp = {}.hasOwnProperty;


export default (Module) => {
  const {
    Proxy, Proto,
    ConfigurableMixin,
    assert,
    initialize, module, meta, property, method, nameBy, mixin,
    Utils: { _, inflect }
  } = Module.NS;


  @initialize
  @module(Module)
  @mixin(ConfigurableMixin)
  class Router extends Proxy implements RouterInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipsPath = PointerT(Router.protected({
    @property _path: ?string = '/';

    // ipsName = PointerT(Router.protected({
    @property _name: ?string = '';

    // ipsModule = PointerT(Router.protected({
    @property _module: ?string = null;

    // iplOnly = PointerT(Router.protected({
    @property _only: ?(string | string[]) = null;

    // iplVia = PointerT(Router.protected({
    @property _via: ?(string | string[]) = null;

    // iplExcept = PointerT(Router.protected({
    @property _except: ?(string | string[]) = null;

    // ipoAbove = PointerT(Router.protected({
    @property _above: ?object = null;

    // ipsAt = PointerT(Router.protected({
    @property _at: ?('collection' | 'member') = null;

    // ipsResource = PointerT(Router.protected({
    @property _resource: ?string = null;

    // ipsTag = PointerT(Router.protected({
    @property _tag: ?string = null;

    // ipsTemplates = PointerT(Router.protected({
    @property _templates: ?string = null;

    // ipsParam = PointerT(Router.protected({
    @property _param: ?string = null;

    // iplRouters = PointerT(Router.protected({
    @property _routers: ?Array<Router> = null;

    // iplPathes = PointerT(Router.protected({
    @property _pathes: ?Array<RouterRouteT> = null;

    // iplResources = PointerT(Router.protected({
    @property _resources: ?Array<Router> = null;

    // iplRoutes = PointerT(Router.protected({
    @property _routes: ?Array<RouterRouteT> = null;

    @property get path(): ?string {
      return this._path;
    }

    @property get name(): ?string {
      return this._resource || this._name;
    }

    @property get above(): ?object {
      return this._above;
    }

    @property get tag(): ?string {
      return this._tag;
    }

    @property get templates(): ?string {
      return this._templates;
    }

    @property get param(): ?string {
      return this._param;
    }

    @method defaultEntityName(): string {
      const tmpName = this._name.replace(/\/$/, '').split('/');
      const [ vsEntityName ] = slice.call(tmpName, -1);
      return inflect.singularize(vsEntityName);
    }

    @method map() { return; }

    @method root(opts: {to: ?string, at: ?('collection' | 'member'), resource: ?string, action: ?string}) { return; }

    @method defineMethod(
      container: Array<RouterRouteT>,
      method: string,
      path: string,
      opts: ?RouteOptionsT = {}
    ) {
      let {
        to,
        at,
        resource,
        action,
        tag: asTag,
        template,
        keyName,
        entityName,
        recordName
      } = opts;
      assert(path != null, 'path is required');
      path = path.replace(/^[\/]/, '');
      if (to != null) {
        assert(/[#]/.test(to), '`to` must be in format `<resource>#<action>`');
        [resource, action] = to.split('#');
      }
      const vsResource = this._resource;
      if ((resource == null) && vsResource !== '') {
        resource = vsResource;
      }
      const vsName = this._name;
      if ((resource == null) && vsName !== '') {
        resource = vsName;
      }
      assert(resource != null, 'options `to` or `resource` must be defined');
      if (action == null) {
        action = path;
      }
      if (!/[\/]$/.test(resource)) {
        resource += '/';
      }
      if (keyName == null) {
        keyName = this._param != null ? this._param.replace(/^\:/, '') : undefined;
      }
      if (entityName == null) {
        entityName = this.defaultEntityName();
      }
      if (!(_.isString(recordName) || _.isNull(recordName))) {
        recordName = this.defaultEntityName();
      }
      const vsParentTag = (this._tag != null) && this._tag !== '' ? this._tag : '';
      const vsTag = (asTag != null) && asTag !== '' ? `/${asTag}` : '';
      const tag = `${vsParentTag}${vsTag}`;
      path = (() => {
        switch (at || this._at) {
          case 'member':
            return `${this._path}:${inflect.singularize(inflect.underscore(resource.replace(/[\/]/g, '_').replace(/[_]$/g, '')))}/${path}`;
          case 'collection':
            return `${this._path}${path}`;
          default:
            return `${this._path}${path}`;
        }
      })();
      if (template == null) {
        template = resource + action;
      }
      container.push({method, path, resource, action, tag, template, keyName, entityName, recordName});
    }

    @method 'get'(asPath: string, aoOpts: ?RouteOptionsT) {
      // @._pathes ?= []
      this.defineMethod(this._pathes, 'get', asPath, aoOpts);
    }

    @method post(asPath: string, aoOpts: ?RouteOptionsT) {
      // @._pathes ?= []
      this.defineMethod(this._pathes, 'post', asPath, aoOpts);
    }

    @method put(asPath: string, aoOpts: ?RouteOptionsT) {
      // @._pathes ?= []
      this.defineMethod(this._pathes, 'put', asPath, aoOpts);
    }

    @method 'delete'(asPath: string, aoOpts: ?RouteOptionsT) {
      // @._pathes ?= []
      this.defineMethod(this._pathes, 'delete', asPath, aoOpts);
    }

    @method head(asPath: string, aoOpts: ?RouteOptionsT) {
      // @._pathes ?= []
      this.defineMethod(this._pathes, 'head', asPath, aoOpts);
    }

    @method options(asPath: string, aoOpts: ?RouteOptionsT) {
      // @._pathes ?= []
      this.defineMethod(this._pathes, 'options', asPath, aoOpts);
    }

    @method patch(asPath: string, aoOpts: ?RouteOptionsT) {
      // @._pathes ?= []
      this.defineMethod(this._pathes, 'patch', asPath, aoOpts);
    }

    @method resource(
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
      } | Function) = null,
      lambda: ?Function = null
    ) {
      const vcModule = this.Module;
      if (_.isFunction(aoOpts)) {
        lambda = aoOpts;
        aoOpts = {};
      }
      if (aoOpts == null) {
        aoOpts = {};
      }
      let {
        path,
        module: vsModule,
        only,
        via,
        except,
        tag: asTag,
        templates: alTemplates,
        param: asParam,
        at,
        resource: asResource,
        above
      } = aoOpts;
      path = path != null ? path.replace(/^[\/]/, '') : undefined;
      const vsPath = (path != null) && path !== '' ? `${path}/` : (path != null) && path === '' ? '' : `${asName}/`;
      const vsFullPath = (() => {
        switch (at || this._at) {
          case 'member':
            const splittedPath = this._path.split('/');
            const [ previously, empty ] = slice.call(splittedPath, -2);
            return `${this._path}:${inflect.singularize(inflect.underscore(previously))}/${vsPath}`;
          case 'collection':
            return `${this._path}${vsPath}`;
          default:
            return `${this._path}${vsPath}`;
        }
      })();
      const vsParentName = this._name;
      const vsParentTemplates = (this._templates != null) && this._templates !== '' ? `${this._templates}/` : '';
      const vsParentTag = (this._tag != null) && this._tag !== '' ? this._tag : '';
      const vsName = (vsModule != null) && vsModule !== '' ? `${vsModule}/` : (vsModule != null) && vsModule === '' ? '' : `${asName}/`;
      const vsTemplates = (alTemplates != null) && alTemplates !== '' ? alTemplates : (alTemplates != null) && alTemplates === '' ? '' : (vsModule != null) && vsModule !== '' ? vsModule : (vsModule != null) && vsModule === '' ? '' : asName;
      const vsTag = (asTag != null) && asTag !== '' ? `/${asTag}` : '';
      const vsParam = (asParam != null) && asParam !== '' ? asParam : ':' + inflect.singularize(inflect.underscore((asResource != null ? asResource : `${vsParentName}${vsName}`).replace(/[\/]/g, '_').replace(/[_]$/g, '')));

        // @._routers ?= []
      @module(vcModule)
      class ResourceRouter extends Router {
        @nameBy static  __filename = 'ResourceRouter';
        @meta static object = {};

        _path: string = vsFullPath;

        _name: String = `${vsParentName}${vsName}`;

        _module: string = vsModule;

        _only: ?(string | string[]) = only;

        _via: ?(string | string[]) = via;

        _except: ?(string | string[]) = except;

        _above: ?object = above;

        _tag: string = `${vsParentTag}${vsTag}`;

        _templates: string = `${vsParentTemplates}${vsTemplates}`.replace(/[\/][\/]/g, '/');

        _param: string = vsParam;

        _resource: ?string = asResource;

        map() {
          return lambda.call(this);
        }
      }
      ResourceRouter.constructor = Proto;
      ResourceRouter.onInitialize();
      this._routers.push(ResourceRouter);
    }

    @method namespace(
      asName: ?string,
      aoOpts: ({
        module: ?string,
        prefix: ?string,
        tag: ?string,
        templates: ?string,
        at: ?('collection' | 'member'),
        above: ?object
      } | Function) = null,
      lambda: ?Function = null
    ) {
      const vcModule = this.Module;
      if (_.isFunction(aoOpts)) {
        lambda = aoOpts;
        aoOpts = {};
      }
      if (aoOpts == null) {
        aoOpts = {};
      }
      const {
        module: vsModule,
        prefix,
        tag: asTag,
        templates: alTemplates,
        at,
        above
      } = aoOpts;
      const vsParentPath = this._path;
      const vsPath = (prefix != null) && prefix !== '' ? `${prefix}/` : (prefix != null) && prefix === '' ? '' : `${asName}/`;
      const vsParentName = this._name;
      const vsParentTemplates = (this._templates != null) && this._templates !== '' ? `${this._templates}/` : '';
      const vsParentTag = (this._tag != null) && this._tag !== '' ? this._tag : '';
      const vsName = (vsModule != null) && vsModule !== '' ? `${vsModule}/` : (vsModule != null) && vsModule === '' ? '' : `${asName}/`;
      const vsTemplates = (alTemplates != null) && alTemplates !== '' ? alTemplates : (alTemplates != null) && alTemplates === '' ? '' : (vsModule != null) && vsModule !== '' ? vsModule : (vsModule != null) && vsModule === '' ? '' : asName;
      const vsTag = (asTag != null) && asTag !== '' ? `/${asTag}` : '';

        // @._routers ?= []
      @module(vcModule)
      class NamespaceRouter extends Router {
        @nameBy static  __filename = 'NamespaceRouter';
        @meta static object = {};

        _path: string = `${vsParentPath}${vsPath}`;

        _name: string = `${vsParentName}${vsName}`;

        _except: ?(string | string[]) = ['all'];

        _tag: string = `${vsParentTag}${vsTag}`;

        _templates: string = `${vsParentTemplates}${vsTemplates}`.replace(/[\/][\/]/g, '/');

        _at: ?('collection' | 'member') = at;

        _above: ?object = above;

        map() {
          return lambda.call(this);
        }
      }
      NamespaceRouter.constructor = Proto;
      NamespaceRouter.onInitialize();
      this._routers.push(NamespaceRouter);
    }

    @method member(lambda: Function) {
      this.namespace(null, {
        module: '',
        prefix: '',
        templates: '',
        at: 'member'
      }, lambda);
    }

    @method collection(lambda: Function) {
      this.namespace(null, {
        module: '',
        prefix: '',
        templates: '',
        at: 'collection'
      }, lambda);
    }

    @property get resources(): Array<Router> {
      return this._resources;
    }

    @property get routes(): Array<{
      method: string,
      path: string,
      resource: string,
      action: string,
      tag: string,
      template: string,
      keyName: ?string,
      entityName: string,
      recordName: ?string
    }> {
      if ((this._routes != null) && this._routes.length > 0) {
        return this._routes;
      } else {
        const vlRoutes = [];
        (this._pathes || []).forEach((item) => {
          vlRoutes.push(item);
        });
        const vlResources = [];
        if (this._routers != null) {
          this._routers.forEach((InheritedRouter) => {
            const inheritedRouter = InheritedRouter.new();
            vlResources.push(inheritedRouter);
            (inheritedRouter.routes || []).forEach((item) => {
              vlRoutes.push(item);
            });
            (inheritedRouter.resources || []).forEach((item) => {
              vlResources.push(item);
            });
          });
        }
        this._routes = vlRoutes;
        this._resources = vlResources;
      }
      return this._routes;
    }

    // @method init(...args) {
    //   super.init(...args);
    //   this._routers = [];
    //   this._pathes = [];
    // }

    constructor() {
      super(... arguments);
      this._routers = [];
      this._pathes = [];
      // this.init(...args);
      this.map();
      if (_.isString(this._only)) {
        this._only = [this._only];
      }
      if (_.isString(this._via)) {
        this._via = [this._via];
      }
      if (_.isString(this._except)) {
        this._except = [this._except];
      }
      const voMethods = {
        list: 'get',
        detail: 'get',
        create: 'post',
        update: 'put',
        delete: 'delete'
      };
      const voPaths = {
        list: '',
        detail: null,
        create: '',
        update: null,
        delete: null
      };
      // @._pathes ?= []
      if ((this._name != null) && this._name !== '') {
        const vsKeyName = this._param && this._param.replace(/^\:/, '') || undefined;
        const vsEntityName = this._above && this._above.entityName || this.defaultEntityName();
        const vsAboveName = this._above && this._above.recordName || undefined;
        if (_.isNil(vsAboveName) && !_.isNull(vsAboveName)) {
          const vsDefaultName = this.defaultEntityName();
        }
        const vsRecordName = vsAboveName || vsDefaultName;
        if (this._only != null) {
          this._only.forEach((asAction) => {
            const vsPath = voPaths[asAction] || this._param;
            this.defineMethod(this._pathes, voMethods[asAction], vsPath, {
              action: asAction,
              resource: this._resource || this._name,
              template: this._templates + '/' + asAction,
              keyName: vsKeyName,
              entityName: vsEntityName,
              recordName: vsRecordName
            });
          });
        } else if (this._except != null) {
          for (const asAction in voMethods) {
            if (!hasProp.call(voMethods, asAction)) continue;
            const vsMethod = voMethods[asAction];
            if (!this._except.includes('all') && !this._except.includes(asAction)) {
              const vsPath = voPaths[asAction] || this._param;
              this.defineMethod(this._pathes, vsMethod, vsPath, {
                action: asAction,
                resource: this._resource || this._name,
                template: this._templates + '/' + asAction,
                keyName: vsKeyName,
                entityName: vsEntityName,
                recordName: vsRecordName
              });
            }
          }
        } else if (this._via != null) {
          this._via.forEach((asCustomAction) => {
            const vsPath = voPaths[asCustomAction] || this._param;
            if (asCustomAction === 'all') {
              for (const asAction in voMethods) {
                if (!hasProp.call(voMethods, asAction)) continue;
                const vsMethod = voMethods[asAction];
                this.defineMethod(this._pathes, vsMethod, vsPath, {
                  action: asAction,
                  resource: this._resource || this._name,
                  template: this._templates + '/' + asAction,
                  keyName: vsKeyName,
                  entityName: vsEntityName,
                  recordName: vsRecordName
                });
              }
            } else {
              this.defineMethod(this._pathes, voMethods[asCustomAction], vsPath, {
                action: asCustomAction,
                resource: this._resource || this._name,
                template: this._templates + '/' + asAction,
                keyName: vsKeyName,
                entityName: vsEntityName,
                recordName: vsRecordName
              });
            }
          });
        } else {
          for (const asAction in voMethods) {
            if (!hasProp.call(voMethods, asAction)) continue;
            const vsMethod = voMethods[asAction];
            const vsPath = voPaths[asAction] || this._param;
            this.defineMethod(this._pathes, vsMethod, vsPath, {
              action: asAction,
              resource: this._resource || this._name,
              template: this._templates + '/' + asAction,
              keyName: vsKeyName,
              entityName: vsEntityName,
              recordName: vsRecordName
            });
          }
        }
      }
    }
  }
}
