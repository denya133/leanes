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

// import type { RecordInterface } from '../../interfaces/RecordInterface';
// import type { CollectionInterface } from '../../interfaces/CollectionInterface';
import type { CursorInterface } from '../../interfaces/CursorInterface';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class Cursor<
    C = null, D = {}, T = D[]
  > extends CoreObject implements CursorInterface<C, D> {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipnCurrentIndex = PointerT(Cursor.private({
    @property _currentIndex: number = 0;

    // iplArray = PointerT(Cursor.private({
    @property _array: any;

    // ipoCollection = PointerT(Cursor.private({
    @property _collection: ?C;

    @property isClosed: boolean = false;

    @method setCollection(aoCollection: C): CursorInterface<C, D> {
      this._collection = aoCollection;
      return this;
    }

    @method setIterable(alArray: T): CursorInterface<C, D> {
      this._array = alArray;
      return this;
    }

    @method async toArray(): Promise<D[]> {
      const results = [];
      while ((await this.hasNext())) {
        results.push((await this.next()));
      }
      return results;
    }

    @method async next(): Promise<?D> {
      const data = (await (this._array[this._currentIndex]));
      this._currentIndex++;
      switch (false) {
        case !(data == null):
          return data;
        case this._collection == null:
          return (await this._collection.normalize(data));
        default:
          return data;
      }
    }

    @method async hasNext(): Promise<boolean> {
      if (_.isNil(this._array)) return false;
      return (await (!_.isNil(this._array[this._currentIndex])));
    }

    @method async close(): Promise<void> {
      let j;
      for (let i = j = 0, len = this._array.length; j < len; i = ++j) {
        delete this._array[i];
      }
      delete this._array;
    }

    @method async count(): Promise<number> {
      const array = this._array || [];
      const length = typeof array.length === "function" ?
        array.length()
      :
        undefined;
      return (await (length || array.length));
    }

    @method async forEach(lambda: (D, number) => ?Promise<void>): Promise<void> {
      let index = 0;
      try {
        while ((await this.hasNext())) {
          await lambda((await this.next()), index++);
        }
      } catch (error) {
        await this.close();
        throw error;
      }
    }

    @method async map<R>(lambda: (D, number) => R | Promise<R>): Promise<R[]> {
      let index = 0;
      try {
        const results = [];
        while ((await this.hasNext())) {
          results.push((await lambda((await this.next()), index++)));
        }
        return results;
      } catch (error) {
        await this.close();
        throw error;
      }
    }

    @method async filter(lambda: (D, number) => boolean | Promise<boolean>): Promise<D[]> {
      let index = 0;
      const records = [];
      try {
        while ((await this.hasNext())) {
          const record = (await this.next());
          if ((await lambda(record, index++))) {
            records.push(record);
          }
        }
        return records;
      } catch (error) {
        await this.close();
        throw error;
      }
    }

    @method async find(lambda: (D, number) => boolean | Promise<boolean>): Promise<?D> {
      let index = 0;
      let _record = null;
      try {
        while ((await this.hasNext())) {
          const record = (await this.next());
          if ((await lambda(record, index++))) {
            _record = record;
            break;
          }
        }
        return _record;
      } catch (error) {
        await this.close();
        throw error;
      }
    }

    @method async compact(): Promise<D[]> {
      const results = [];
      try {
        while (this._currentIndex < (await this.count())) {
          const rawResult = this._array[this._currentIndex];
          ++this._currentIndex;
          if (!_.isEmpty(rawResult)) {
            const result = (await (async function() {
              switch (false) {
                case this._collection == null:
                  return (await this._collection.normalize(rawResult));
                default:
                  return rawResult;
              }
            }).call(this));
            results.push(result);
          }
        }
        return results;
      } catch (error) {
        await this.close();
        throw error;
      }
    }

    @method async reduce<I>(lambda: (I, D, number) => I | Promise<I>, initialValue: I): Promise<I> {
      try {
        let index = 0;
        let _initialValue = initialValue;
        while ((await this.hasNext())) {
          _initialValue = (await lambda(_initialValue, (await this.next()), index++));
        }
        return _initialValue;
      } catch (error) {
        await this.close();
        throw error;
      }
    }

    @method async first(): Promise<?D> {
      try {
        const result = (await this.hasNext()) ? (await this.next()) : null;
        await this.close();
        return result;
      } catch (error) {
        await this.close();
        throw error;
      }
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(aoCollection: ?C = null, alArray: ?T = []) {
      super(... arguments);
      if (aoCollection != null) {
        this._collection = aoCollection;
      }
      this._array = alArray;
    }
  }
}
