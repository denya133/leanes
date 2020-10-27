/* eslint no-param-reassign: ["error", {
  "props": true, "ignorePropertyModificationsFor": ["properties"]
}] */

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

import type { CollectionInterface } from '../../interfaces/CollectionInterface';
import type { RecordInterface } from '../../interfaces/RecordInterface';
import type { RecordStaticInterface } from '../../interfaces/RecordStaticInterface';
import type { CursorInterface } from '../../interfaces/CursorInterface';
import type { SerializerInterface } from '../../interfaces/SerializerInterface';
import type { ObjectizerInterface } from '../../interfaces/ObjectizerInterface';
import type { SerializableInterface } from '../../interfaces/SerializableInterface';

const hasProp = {}.hasOwnProperty;

export default (Module) => {
  const {
    RECORD_CHANGED,
    Proxy, Serializer, Objectizer,
    ConfigurableMixin,
    assert,
    initialize, partOf, meta, property, method, nameBy, mixin,
    Utils: { _, inflect }
  } = Module.NS;


  @initialize
  @partOf(Module)
  @mixin(ConfigurableMixin)
  class Collection<
    D = RecordInterface, R = $Rest<RecordStaticInterface>
  > extends Proxy implements CollectionInterface<D>, SerializableInterface<D> {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property get delegate(): $Rest<RecordStaticInterface> {
      let delegate: ?(string | Function | $Rest<RecordStaticInterface>) = undefined;
      const proxyData = this.getData();
      delegate = proxyData != null ? proxyData.delegate : undefined;
      if (_.isString(delegate)) {
        delegate = this.ApplicationModule.NS[delegate];
      } else if (!/Migration$|Record$/.test(delegate.name)) {
        delegate = typeof delegate === 'function' ? delegate() : undefined;
      }
      return delegate;
    }

    @property serializer: ?SerializerInterface<D> = null;

    @property objectizer: ?ObjectizerInterface<R, D> = null;

    @method collectionName(): string {
      const firstClassName = _.first(_.remove(this.delegate.parentClassNames(), name =>
        !/Mixin$|Interface$|^CoreObject$|^Record$/.test(name)
      ));
      return inflect.pluralize(inflect.underscore(firstClassName.replace(/Record$/, '')));
    }

    @method collectionPrefix(): string {
      return `${inflect.underscore(this.Module.name)}_`;
    }

    @method collectionFullName(asName: ?string = null): string {
      return `${this.collectionPrefix()}${asName || this.collectionName()}`;
    }

    @method recordHasBeenChanged(asType: string, aoData: object): void {
      this.send(RECORD_CHANGED, aoData, asType);
    }

    @method async generateId(): Promise<string | number> { return; }

    @method async build(properties: object): Promise<D> {
      return await this.objectizer.recoverize(this.delegate, properties);
    }

    @method async create(properties: object): Promise<D> {
      const voRecord = await this.build(properties);
      return await voRecord.save();
    }

    @method async push(aoRecord: D): Promise<D> {
      return assert.fail('Not implemented specific method');
    }

    @method async 'delete'(id: string | number): Promise<void> {
      const voRecord = await this.find(id);
      await voRecord.delete();
    }

    @method async destroy(id: string | number): Promise<void> {
      const voRecord = await this.find(id);
      await voRecord.destroy();
    }

    @method async remove(id: string | number): Promise<void> {
      return assert.fail('Not implemented specific method');
    }

    @method async find(id: string | number): Promise<?D> {
      return await this.take(id);
    }

    @method async findMany(ids: Array<string | number>): Promise<CursorInterface<CollectionInterface<D>, D>> {
      return await this.takeMany(ids);
    }

    @method async take(id: string | number): Promise<?D> {
      return assert.fail('Not implemented specific method');
    }

    @method async takeMany(ids: Array<string | number>): Promise<CursorInterface<CollectionInterface<D>, D>> {
      return assert.fail('Not implemented specific method');
    }

    @method async takeAll(): Promise<CursorInterface<CollectionInterface<D>, D>> {
      return assert.fail('Not implemented specific method');
    }

    @method async update(id: string | number, properties: object): Promise<D> {
      properties.id = id;
      const existedRecord = await this.find(id);
      const receivedRecord = await this.objectizer.recoverize(this.delegate, properties);
      for (const key in properties) {
        if (!hasProp.call(properties, key)) continue;
        existedRecord[key] = receivedRecord[key];
      }
      return await existedRecord.save();
    }

    @method async override(id: string | number, aoRecord: D): Promise<D> {
      return assert.fail('Not implemented specific method');
    }

    @method async clone(aoRecord: D): Promise<D> {
      const vhAttributes = {};
      const RecordClass = this.delegate;
      const vlAttributes = Object.keys(RecordClass.attributes);
      for (const key of vlAttributes) {
        vhAttributes[key] = aoRecord[key];
      }
      const voRecord = new RecordClass(vhAttributes, this);
      voRecord.id = await this.generateId();
      return voRecord;
    }

    @method async copy(aoRecord: D): Promise<D> {
      const voRecord = await this.clone(aoRecord);
      await voRecord.save();
      return voRecord;
    }

    @method async includes(id: string | number): Promise<boolean> {
      return assert.fail('Not implemented specific method');
    }

    @method async length(): Promise<number> {
      return assert.fail('Not implemented specific method');
    }

    @method async normalize(ahData: any): Promise<D> {
      return await this.serializer.normalize(this.delegate, ahData);
    }

    @method async serialize(aoRecord: D, ahOptions: ?object): Promise<any> {
      return await this.serializer.serialize(aoRecord, ahOptions);
    }

    @method setData(ahData: ?{
      delegate: (string | Function | $Rest<RecordStaticInterface>),
      serializer?: (string | Function | Class<Serializer>),
      objectizer?: (string | Function | Class<Objectizer>)
    }) {
      super.setData(... arguments);
      const NS = this.ApplicationModule.NS;
      const serializer = ahData != null ? ahData.serializer : undefined;
      const objectizer = ahData != null ? ahData.objectizer : undefined;
      const SerializerClass = serializer == null ?
        Serializer
      :
        _.isString(serializer) ?
          this.ApplicationModule.NS[serializer]
        :
          !/Serializer$/.test(serializer.name) ?
            typeof serializer === 'function' ?
              serializer()
            :
              undefined
          :
            serializer;
      const ObjectizerClass = objectizer == null ?
        Objectizer
      :
        _.isString(objectizer) ?
          this.ApplicationModule.NS[objectizer]
        :
          !/Objectizer$/.test(objectizer.name) ?
            typeof objectizer === 'function' ?
              objectizer()
            :
              undefined
          :
            objectizer;
      this.serializer = SerializerClass.new(this);
      this.objectizer = ObjectizerClass.new(this);
      return ahData;
    }

    constructor() {
      super(... arguments);
      this.serializer = Serializer.new(this);
      this.objectizer = Objectizer.new(this);
    }
  }
}
