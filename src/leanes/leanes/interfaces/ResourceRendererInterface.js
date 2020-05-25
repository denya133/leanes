import type { ContextInterface } from './ContextInterface';
import type { ResourceInterface } from './ResourceInterface';
import type { RouterRouteT } from '../types/RouterRouteT';
import type { ResourceRendererListResultT } from '../types/ResourceRendererListResultT';
import type { ResourceRendererItemResultT } from '../types/ResourceRendererItemResultT';


export interface ResourceRendererInterface {
  render<
    T = any, R = ?(ResourceRendererListResultT| ResourceRendererItemResultT | any)
  >(
    ctx: ContextInterface,
    aoData: T,
    resource: ResourceInterface,
    opts: ?RouterRouteT
  ): Promise<R>
}
