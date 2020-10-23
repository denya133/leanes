import type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;


  @initialize
  @partOf(Module)
  class PipeMessage extends CoreObject implements PipeMessageInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static PRIORITY_HIGH: number = 1;

    @property static PRIORITY_MED: number = 5;

    @property static PRIORITY_LOW: number = 10;

    @property static BASE: string = 'namespaces/pipes/messages/';

    @property static get NORMAL() {
      return `${this.BASE}normal`;
    };

    // ipsType = PointerT(PipeMessage.protected({
    @property _type: string = null;

    // ipnPriority = PointerT(PipeMessage.protected({
    @property _priority: number = null;

    // ipoHeader = PointerT(PipeMessage.protected({
    @property _header: ?object = null;

    // ipoBody = PointerT(PipeMessage.protected({
    @property _body: ?any = null;

    @method getType(): string {
      return this._type;
    }

    @method setType(asType: string) {
      this._type = asType;
    }

    @method getPriority(): number {
      return this._priority;
    }

    @method setPriority(anPriority: number) {
      this._priority = anPriority;
    }

    @method getHeader(): ?object {
      return this._header;
    }

    @method setHeader(aoHeader: ?object) {
      this._header = aoHeader;
    }

    @method getBody(): ?any {
      return this._body;
    }

    @method setBody(aoBody: ?any) {
      this._body = aoBody;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(asType: string, aoHeader: ?object = null, aoBody: ?any = null, anPriority: ?number = 5) {
      super(... arguments);
      this.setType(asType);
      if (aoHeader != null) {
        this.setHeader(aoHeader);
      }
      if (aoBody != null) {
        this.setBody(aoBody);
      }
      this.setPriority(anPriority);
    }
  }
}
