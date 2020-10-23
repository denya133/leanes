import type { HookedObjectInterface } from '../interfaces/HookedObjectInterface';


export default (Module) => {
  const {
    CoreObject,
    // HookedObjectInterface,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class HookedObject extends CoreObject implements HookedObjectInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property name: string = null;

    // ipoAnchor = HookedObject.protected({
    @property _anchor: object = null;

    // ipmDoHook = HookedObject.protected(HookedObject.async({
    @method async _doHook(asHook, alArguments, asErrorMessage, aDefaultValue): Promise<?any> {
      const anchor = this._anchor || this;
      if (asHook != null) {
        if (_.isFunction(anchor[asHook])) {
          return await anchor[asHook](...alArguments);
        } else if (_.isString(anchor[asHook])) {
          return (typeof anchor.emit === "function" ? await anchor.emit(anchor[asHook], ...alArguments) : undefined);
        } else {
          throw new Error(asErrorMessage);
        }
      } else {
        return await aDefaultValue;
      }
    }

    constructor(name: string, anchor: ?object) {
      super(... arguments);
      this.name = name;
      if (anchor != null) {
        this._anchor = anchor;
      }
    }
  }
}
