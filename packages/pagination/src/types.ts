export type PaginationConfig = {
  currentPage: number
  totalItems: number
  pageSize: number
  totalPages: number
  maxLength: number
  keepMiddle: boolean
  directionBtns: boolean
  previousText: string
  nextText: string
  boundaryBtns: boolean
  firstText: string
  lastText: string
  totalCount: boolean
  jumpPage: boolean
  // ?? only to avoid type warning
  [x: string]: any
}

export type PaginationProps = {
  options: PaginationConfig
}

export type PaginationEmits = {
  'page-change': [pageNumber: number, totalPages: number]
}

export type PageItem = {
  number: number
  text: string | number
}

export type PaginationEvent = 'page-change'
