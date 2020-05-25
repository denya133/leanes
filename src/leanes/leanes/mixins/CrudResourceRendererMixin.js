import type { ContextInterface } from '../interfaces/ContextInterface';
import type { ResourceInterface } from '../interfaces/ResourceInterface';
import type { RouterRouteT } from '../types/RouterRouteT';
import type { ResourceListResultT } from '../types/ResourceListResultT';
import type { ResourceRendererListResultT } from '../types/ResourceRendererListResultT';
import type { ResourceRendererItemResultT } from '../types/ResourceRendererItemResultT';

export default (Module) => {
  const {
    initializeMixin, meta, method,
    Utils: { _ }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async create<
        T = object, R = ResourceRendererItemResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        };
      }

      @method async 'delete'<T = ?object, R = void>(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> { return; }

      @method async destroy<T = ?object, R = void>(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> { return; }

      @method async detail<
        T = object, R = ResourceRendererItemResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        };
      }

      @method async itemDecorator(aoData: ?object): Promise<?object> {
        if (aoData != null) {
          result = JSON.parse(JSON.stringify(aoData));
          let { createdAt, updatedAt, deletedAt } = aoData;
          createdAt = createdAt && createdAt.toISOString() || null;
          updatedAt = updatedAt && updatedAt.toISOString() || null;
          deletedAt = deletedAt && deletedAt.toISOString() || null;
          result.createdAt = createdAt;
          result.updatedAt = updatedAt;
          result.deletedAt = deletedAt;
        } else {
          result = null;
        }
        return result;
      }

      @method async list<
        T = ResourceListResultT, R = ResourceRendererListResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          meta: aoData.meta,
          [this.listEntityName]: await Promise.all(
            aoData.items.map(itemDecorator.bind(this))
          )
        };
      }

      @method async query<T = any, R = any>(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        return aoData;
      }

      @method async update<
        T = object, R = ResourceRendererItemResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        };
      }

      @method async render<
        T = any, R = ?(ResourceRendererListResultT| ResourceRendererItemResultT | any)
      >(
        ctx: ContextInterface,
        aoData: T,
        resource: ResourceInterface,
        opts: ?RouterRouteT = {}
      ): Promise<R> {
        const args = arguments;
        const {
          path,
          resource: resourceName,
          action,
          template: templatePath
        } = opts;
        if ((path != null) && (resourceName != null) && (action != null)) {
          const { Templates } = this.Module.NS;
          return await Promise.resolve().then(() => {
            const template = Templates[templatePath];
            if (_.isFunction(template)){
              return template.call(resource, resourceName, action, aoData);
            } else if (_.includes([
              'create', 'delete', 'destroy', 'detail', 'list', 'update'
            ], action)) {
              return this[action].call(
                resource, resourceName, action, aoData, templatePath
              );
            } else {
              return super.render(...args);
            }
          });
        } else {
          return aoData;
        }
      }
    }
    return Mixin;
  });
}
