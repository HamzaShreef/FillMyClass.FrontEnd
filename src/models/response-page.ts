export interface ResponsePage<T> {
  dataList:T[]
  hasNext:boolean
  hasPrevious:boolean
  pageSize:boolean
  pageNum:number
}
