import type { ContextInterface } from '../interfaces/ContextInterface';
import type { ResourceRendererInterface } from '../interfaces/ResourceRendererInterface';
import type { ResourceInterface } from '../interfaces/ResourceInterface';

import type { RouterRouteT } from '../types/RouterRouteT';
import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../types/RequestT';


export interface SwitchInterface {
  middlewares: Array<(ctx: ContextInterface) => Promise<?boolean>>;

  handlers: Array<(ctx: ContextInterface) => Promise<?boolean>>;

  +responseFormats: string[];

  routerName: string;

  use(index: number | Function, middleware: ?Function): SwitchInterface;

  callback(): (req: object, res: object) => Promise<void>;

  handleStatistics(reqLength: number, resLength: number, time: number, aoContext: ContextInterface): Promise<void>;

  onerror(err: Error): void;

  respond(ctx: ContextInterface): void;

  perform<
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(method: string, url: string, options: Config<T, R>): Promise<L>;

  rendererFor(asFormat: string): ResourceRendererInterface;

  sendHttpResponse(
    ctx: ContextInterface,
    aoData: ?any,
    resource: ResourceInterface,
    opts: RouterRouteT
  ): Promise<void>;

  defineRoutes(): void;

  sender(
    resourceName: string,
    aoMessage: {|context: ContextInterface, reverse: string|},
    params: RouterRouteT
  ): void;

  createNativeRoute(opts: RouterRouteT): void;
}
