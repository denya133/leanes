

export type ResourceRendererListResultT = {
  meta: {|
    pagination: {|
      limit: number | 'not defined',
      offset: number | 'not defined'
    |}
  |},
  [key: string]: Array<object>
}
