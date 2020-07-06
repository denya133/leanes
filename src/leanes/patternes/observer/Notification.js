import type { NotificationInterface } from '../interfaces/NotificationInterface';
import { injectable, inject} from "inversify";

export default (Module) => {

  const {
    CoreObject,
    assert,
    initialize, module, meta, property, method, nameBy
  } = Module.NS;

  @injectable
  @initialize
  @module(Module)
  class Notification extends CoreObject implements NotificationInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipsName = PointerT(Notification.private({
    @property _name: string = null;

    // ipoBody = PointerT(Notification.private({
    @property _body: ?any = null;

    // ipsType = PointerT(Notification.private({
    @property _type: ?string = null;

    @method getName(): string {
      return this._name;
    }

    @method setBody(aoBody: ?any): ?any {
      this._body = aoBody;
      return aoBody;
    }

    @method getBody(): ?any {
      return this._body;
    }

    @method setType(asType: string): string {
      this._type = asType;
      return asType;
    }

    @method getType(): ?string {
      return this._type;
    }

    @method toString(): string {
      return `Notification Name: ${this.getName()}\nBody: ${(this.getBody() != null ? this.getBody().toString() : 'null')}\nType: ${(this.getType() != null ? this.getType() : 'null')}`;
    }

    @method static async restoreObject(acModule: Class<Module>, replica: object): NotificationInterface {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const { name, body, type } = replica.notification;
        const instance = this.new(name, body, type);
        return instance;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: NotificationInterface): object {
      const replica = await super.replicateObject(instance);
      replica.notification = {
        name: instance.getName(),
        body: instance.getBody(),
        type: instance.getType()
      };
      return replica;
    }


    constructor(asName: string, aoBody: ?any, asType: ?string) {
      super(... arguments);
      this._name = asName;
      this._body = aoBody;
      if (asType != null) {
        this._type = asType;
      }
    }
  }
}
