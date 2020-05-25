import type { IterableInterface } from '../interfaces/IterableInterface';
import type { RecordInterface } from '../interfaces/RecordInterface';

export default (Module) => {
  const {
    assert,
    initializeMixin, meta, method,
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass implements IterableInterface<RecordInterface> {
      @meta static object = {};

      @method async forEach(lambda: (RecordInterface, number) => Promise<void>): Promise<void> {
        const cursor = await this.takeAll();
        await cursor.forEach(async (item, index) => {
          await lambda(item, index);
        });
      }

      @method async filter(lambda: (RecordInterface, number) => Promise<boolean>): Promise<RecordInterface[]> {
        const cursor = await this.takeAll();
        return await cursor.filter(async (item, index) =>
          await lambda(item, index)
        );
      }

      @method async map<R>(lambda: (RecordInterface, number) => Promise<R>): Promise<R[]> {
        const cursor = await this.takeAll();
        return await cursor.map(async (item, index) =>
          await lambda(item, index)
        );
      }

      @method async reduce<I>(lambda: (I, RecordInterface, number) => Promise<I>, initialValue: I): Promise<I> {
        const cursor = await this.takeAll();
        return await cursor.reduce((async (prev, item, index) =>
          await lambda(prev, item, index)
        ), initialValue);
      }
    }
    return Mixin;
  });
}
