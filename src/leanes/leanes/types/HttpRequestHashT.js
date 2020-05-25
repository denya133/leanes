

export type HttpRequestHashT = {|
  method: string,
  url: string,
  headers: {[key: string]: string},
  data: ?object
|}
