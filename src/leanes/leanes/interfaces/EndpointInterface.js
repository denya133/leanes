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

import type { EndpointInterface:EndpointInterfaceDef } from './EndpointInterface';
import type { GatewayInterface } from './GatewayInterface';
import type { Interface } from './../../patternes/interfaces/ProxyInterface';
export type { JoiT } from '../../types/JoiT';

export interface EndpointInterface extends Interface {

  gateway: GatewayInterface;

  tags: ?array;
  headers: ?array;
  pathParams: ?array;
  queryParams: ?array;
  payload: ?object;
  responses: ?array;
  errors: ?array;
  title: ?string;
  synopsis: ?string;
  isDeprecated: boolean;

  tag(asName: string): EndpointInterfaceDef;
  header(name: strng, schema: JoiT, description: ?string): EndpointInterfaceDef;
  pathParam(name: strng, schema: JoiT, description: ?string): EndpointInterfaceDef;
  queryParam(name: strng, schema: JoiT, description: ?string): EndpointInterfaceDef;
  body(schema: JoiT, mimes: ?(array | string), description: ?string): EndpointInterfaceDef;
  response(status: [number | string | JoiT ], schema: ?(JoiT | string | array), mimes: ?(array | string), description: ?string): EndpointInterfaceDef;
  error(status: number | string, description: ?string): EndpointInterfaceDef;
  summary(asSummary: string): EndpointInterfaceDef;
  description(asDescription: string): EndpointInterfaceDef;
  deprecated(abDeprecated: boolean): EndpointInterfaceDef;
}
