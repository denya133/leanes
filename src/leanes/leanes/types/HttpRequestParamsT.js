

export type HttpRequestParamsT = {
  requestType: string,
  recordName: string,
  snapshot?: object,
  id?: (number | string),
  query?: object,
  isCustomReturn?: boolean
}
