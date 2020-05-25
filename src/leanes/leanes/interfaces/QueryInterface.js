

export interface QueryInterface {
  $forIn: ?object;

  $join: ?object;

  $let: ?object;

  $filter: ?object;

  $collect: ?object;

  $into: ?(string | object);

  $having: ?object;

  $sort: ?Array;

  $limit: ?number;

  $offset: ?number;

  $avg: ?string;

  $sum: ?string;

  $min: ?string;

  $max: ?string;

  $count: ?boolean;

  $distinct: ?boolean;

  $remove: ?(string | object);

  $patch: ?object;

  $return: ?(string | object);

  forIn(aoDefinitions: object): QueryInterface;

  join(aoDefinitions: object): QueryInterface;

  filter(aoDefinitions: object): QueryInterface;

  'let'(aoDefinitions: object): QueryInterface;

  collect(aoDefinition: object): QueryInterface;

  into(aoDefinition: string | object): QueryInterface;

  having(aoDefinition: object): QueryInterface;

  sort(aoDefinition: object): QueryInterface;

  limit(anValue: number): QueryInterface;

  offset(anValue: number): QueryInterface;

  distinct(): QueryInterface;

  remove(expr: ?(string | object)): QueryInterface;

  patch(aoDefinition: object): QueryInterface;

  'return'(aoDefinition: string | object): QueryInterface;

  count(): QueryInterface;

  avg(asDefinition: string): QueryInterface;

  min(asDefinition: string): QueryInterface;

  max(asDefinition: string): QueryInterface;

  sum(asDefinition: string): QueryInterface;
}
