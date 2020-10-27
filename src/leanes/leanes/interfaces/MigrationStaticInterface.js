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

import type { CollectionInterface } from './CollectionInterface';
import type { RecordInterface } from './RecordInterface';

export interface MigrationStaticInterface<
  SUPPORTED_TYPES, NON_OVERRIDDEN
> {
  createCollection(
    name: string,
    options: ?object
  ): void;

  createEdgeCollection(
    collection_1: string,
    collection_2: string,
    options: ?object
  ): void;

  addField(
    collection_name: string,
    field_name: string,
    options: $Values<SUPPORTED_TYPES> | {
      type: $Values<SUPPORTED_TYPES>, 'default': any
    }
  ): void;

  addIndex(
    collection_name: string,
    field_names: string[],
    options: {
      type: 'hash' | 'skiplist' | 'persistent' | 'geo' | 'fulltext',
      unique: ?boolean,
      sparse: ?boolean
    }
  ): void;

  addTimestamps(
    collection_name: string,
    options: ?object
  ): void;

  changeCollection(
    name: string,
    options: object
  ): void;

  changeField(
    collection_name: string,
    field_name: string,
    options: $Values<SUPPORTED_TYPES> | {
      type: $Values<SUPPORTED_TYPES>
    }
  ): void;

  renameField(
    collection_name: string,
    field_name: string,
    new_field_name: string
  ): void;

  renameIndex(
    collection_name: string,
    old_name: string,
    new_name: string
  ): void;

  renameCollection(
    collection_name: string,
    new_name: string
  ): void;

  dropCollection(
    collection_name: string
  ): void;

  dropEdgeCollection(
    collection_1: string,
    collection_2: string
  ): void;

  removeField(
    collection_name: string,
    field_name: string
  ): void;

  removeIndex(
    collection_name: string,
    field_names: string[],
    options: {
      type: 'hash' | 'skiplist' | 'persistent' | 'geo' | 'fulltext',
      unique: ?boolean,
      sparse: ?boolean
    }
  ): void;

  removeTimestamps(
    collection_name: string,
    options: ?object
  ): void;

  reversible(
    lambda: ({|up: () => Promise<void>, down: () => Promise<void>|}) => Promise<void>
  ): void;

  change(): ?NON_OVERRIDDEN;

  up(): ?NON_OVERRIDDEN;

  down(): ?NON_OVERRIDDEN;

  (aoAttributes: object, aoCollection: CollectionInterface): RecordInterface;
}
