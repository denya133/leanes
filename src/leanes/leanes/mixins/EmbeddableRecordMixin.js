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

import type { CollectionInterface } from '../interfaces/CollectionInterface';
import type { RecordInterface } from '../interfaces/RecordInterface';

import type { EmbedConfigT } from '../types/EmbedConfigT';
import type { RelationInverseT } from '../types/RelationInverseT';
import type { JoiT } from '../types/JoiT';

const hasProp = {}.hasOwnProperty;

export default (Module) => {
  const {
    initializeMixin, meta, property, method, chains,
    Utils: { _, joi }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    @chains(['create', 'update'], function () { return; })
    class Mixin extends BaseClass {
      @meta static object = {};

      @property static get schema(): JoiT {
        const existedSchema = this._schemas.get(this);
        if (existedSchema != null) return existedSchema;

        const vhAttrs = {};
        const voAttrs = this.attributes;
        for (const vsAttr in voAttrs) {
          if (!hasProp.call(voAttrs, vsAttr)) continue;
          const vhAttrValue = voAttrs[vsAttr];
          vhAttrs[vsAttr] = _.isFunction(vhAttrValue.validate)
            ? vhAttrValue.validate.call(this)
            : vhAttrValue.validate;
        }
        const voComps = this.computeds;
        for (const vsComp in voComps) {
          if (!hasProp.call(voComps, vsComp)) continue;
          const vhCompValue = voComps[vsComp];
          vhAttrs[vsComp] = _.isFunction(vhCompValue.validate)
            ? vhCompValue.validate.call(this)
            : vhCompValue.validate;
        }
        const voEmbeds = this.embeddings;
        for (const vsEmbed in voEmbeds) {
          if (!hasProp.call(voEmbeds, vsEmbed)) continue;
          const vhEmbedValue = voEmbeds[vsEmbed];
          vhAttrs[vsEmbed] = _.isFunction(vhEmbedValue.validate)
            ? vhEmbedValue.validate.call(this)
            : vhEmbedValue.validate;
        }
        this._schemas.set(this, joi.object(vhAttrs));
        return this._schemas.get(this);
      }

      @property static get embeddings(): {[key: string]: EmbedConfigT} {
        return this.metaObject.getGroup('embeddings', false);
      }

      @method async create(): Promise<RecordInterface> {
        const response = await this.collection.push(this);
        if (response != null) {
          const voAttrs = this.constructor.attributes;
          for (const vsAttr in voAttrs) {
            if (!hasProp.call(voAttrs, vsAttr)) continue;
            this[vsAttr] = response[vsAttr];
          }
          const voEmbeds = this.constructor.embeddings;
          for (const vsEmbed in voEmbeds) {
            if (!hasProp.call(voEmbeds, vsEmbed)) continue;
            this[vsEmbed] = response[vsEmbed];
          }
          this._internalRecord = response._internalRecord;
        }
        return this;
      }

      @method async update(): Promise<RecordInterface> {
        const response = await this.collection.override(this.id, this);
        if (response != null) {
          const voAttrs = this.constructor.attributes;
          for (const vsAttr in voAttrs) {
            if (!hasProp.call(voAttrs, vsAttr)) continue;
            this[vsAttr] = response[vsAttr];
          }
          const voEmbeds = this.constructor.embeddings;
          for (const vsEmbed in voEmbeds) {
            if (!hasProp.call(voEmbeds, vsEmbed)) continue;
            this[vsEmbed] = response[vsEmbed];
          }
          this._internalRecord = response._internalRecord;
        }
        return this;
      }

      @method static async normalize(ahPayload: ?object, aoCollection: CollectionInterface<RecordInterface>): Promise<RecordInterface> {
        const voRecord = await super.normalize(... arguments);
        const voEmbeds = voRecord.constructor.embeddings;
        for (const vsEmbed in voEmbeds) {
          if (!hasProp.call(voEmbeds, vsEmbed)) continue;
          const { load } = voEmbeds[vsEmbed];
          voRecord[vsEmbed] = await load.call(voRecord);
        }
        voRecord._internalRecord = voRecord.constructor.makeSnapshotWithEmbeds(voRecord);
        return voRecord;
      }

      @method static async serialize(aoRecord: ?RecordInterface): Promise<?object> {
        const voEmbeds = aoRecord.constructor.embeddings;
        for (const vsEmbed in voEmbeds) {
          if (!hasProp.call(voEmbeds, vsEmbed)) continue;
          const { put } = voEmbeds[vsEmbed];
          await put.call(aoRecord);
        }
        return await super.serialize(aoRecord);
      }

      @method static async recoverize(ahPayload: ?object, aoCollection: CollectionInterface<RecordInterface>): Promise<?RecordInterface> {
        const voRecord = await super.recoverize(... arguments);
        const voEmbeds = voRecord.constructor.embeddings;
        for (const vsEmbed in voEmbeds) {
          if (!hasProp.call(voEmbeds, vsEmbed)) continue;
          const { restore } = voEmbeds[vsEmbed];
          if (vsEmbed in ahPayload) {
            voRecord[vsEmbed] = await restore.call(voRecord, ahPayload[vsEmbed]);
          }
        }
        return voRecord;
      }

      @method static objectize(aoRecord: ?RecordInterface): ?object {
        const vhResult = super.objectize(... arguments);
        const voEmbeds = aoRecord.constructor.embeddings;
        for (const vsEmbed in voEmbeds) {
          if (!hasProp.call(voEmbeds, vsEmbed)) continue;
          const { replicate } = voEmbeds[vsEmbed];
          if (aoRecord[vsEmbed] != null) {
            vhResult[vsEmbed] = replicate.call(aoRecord);
          }
        }
        return vhResult;
      }

      @method static makeSnapshotWithEmbeds(aoRecord: ?RecordInterface): ?object {
        if (aoRecord == null) {
          return null;
        }
        const vhResult = aoRecord._internalRecord;
        const voEmbeds = aoRecord.constructor.embeddings;
        for (const vsEmbed in voEmbeds) {
          if (!hasProp.call(voEmbeds, vsEmbed)) continue;
          const { replicate } = voEmbeds[vsEmbed];
          vhResult[vsEmbed] = replicate.call(aoRecord);
        }
        return vhResult;
      }

      // TODO: не учтены установки значений, которые раньше не были установлены
      @method async changedAttributes(): Promise<{[key: string]: [?any, ?any]}> {
        const vhResult = await super.changedAttributes();
        const voEmbeds = this.constructor.embeddings;
        const ir = this._internalRecord;
        for (const vsEmbed in voEmbeds) {
          if (!hasProp.call(voEmbeds, vsEmbed)) continue;
          const { replicate } = voEmbeds[vsEmbed];
          const voOldValue = ir != null ? ir[vsEmbed] : undefined;
          const voNewValue = replicate.call(this);
          if (!_.isEqual(voNewValue, voOldValue)) {
            vhResult[vsEmbed] = [voOldValue, voNewValue];
          }
        }
        return vhResult;
      }

      @method async resetAttribute(asAttribute: string): Promise<void> {
        await super.resetAttribute(... arguments);
        const attrConf = this.constructor.embeddings[asAttribute];
        if (this._internalRecord != null) {
          if (attrConf != null) {
            const { restore } = attrConf;
            const voOldValue = this._internalRecord[asAttribute];
            this[asAttribute] = await restore.call(this, voOldValue);
          }
        }
      }

      @method async rollbackAttributes(): Promise<void> {
        await super.rollbackAttributes(... arguments);
        if (this._internalRecord != null) {
          const voEmbeds = this.constructor.embeddings;
          for (const vsEmbed in voEmbeds) {
            if (!hasProp.call(voEmbeds, vsEmbed)) continue;
            const { restore } = voEmbeds[vsEmbed];
            const voOldValue = this._internalRecord[vsEmbed];
            this[vsEmbed] = await restore.call(this, voOldValue);
          }
        }
      }
    }
    return Mixin;
  });
}
