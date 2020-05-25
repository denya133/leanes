import type { CollectionInterface } from '../interfaces/CollectionInterface';
import type { RecordInterface } from '../interfaces/RecordInterface';
import type { CursorInterface } from '../interfaces/CursorInterface';


export default (Module) => {
  const {
    initializeMixin, meta, property, method,
    Utils: { _ }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin<
      D = RecordInterface
    > extends BaseClass {
      @meta static object = {};

      // ipoCollection = PointerT(this.protected({
      @property _collection: {[key: string | number]: ?object} = null;

      @method onRegister() {
        super.onRegister(... arguments);
        this._collection = {};
      }

      @method async push(aoRecord: D): Promise<D> {
        const id = aoRecord.id;
        if (id == null) {
          return false;
        }
        this._collection[id] = await this.serializer.serialize(aoRecord);
        return await this.serializer.normalize(
          this.delegate, this._collection[id]
        );
      }

      @method async remove(id: string | number): Promise<void> {
        delete this._collection[id];
      }

      @method async take(id: string | number): Promise<?D> {
        return await this.serializer.normalize(
          this.delegate, this._collection[id]
        );
      }

      @method async takeMany(ids: Array<string | number>): Promise<CursorInterface<CollectionInterface<D>, D>> {
        return Module.NS.Cursor.new(
          this, ids.map((id) => this._collection[id])
        );
      }

      @method async takeAll(): Promise<CursorInterface<CollectionInterface<D>, D>> {
        return Module.NS.Cursor.new(this, _.values(this._collection));
      }

      @method async override(id: string | number, aoRecord: D): Promise<D> {
        this._collection[id] = await this.serializer.serialize(aoRecord);
        return await this.serializer.normalize(
          this.delegate, this._collection[id]
        );
      }

      @method async includes(id: string | number): Promise<boolean> {
        return this._collection[id] != null;
      }

      @method async length(): Promise<number> {
        return Object.keys(this._collection).length;
      }
    }
    return Mixin;
  });
}
