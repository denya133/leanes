

export type ResourceListResultT = {|
  meta: {|
    pagination: {|
      limit: number | 'not defined',
      offset: number | 'not defined'
    |}
  |},
  items: Array<object>
|}
