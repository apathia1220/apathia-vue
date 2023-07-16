import type { CSSProperties, Ref } from 'vue'
import type { RenderCustom, RenderFn } from '@apathia/apathia.custom-render'

export type DataItem = Record<string, unknown> & {
  [rowKey: string]: string | number
}

export type Button = {
  text: string
  className?: string
  onClick: (arg: {
    row?: DataItem
    rowIndex?: number
    colIndex?: number
  }) => void
}

// TODO: filter?
export type FilterOptions = {
  enabled: boolean
  styleClass: string
  placeholder?: string // for input
  filterValue: '' // initial value
  filterDownItems: Array<{ label: string; value: string | number }>
  filterFn: (data: DataItem, filterString: string) => boolean
}

interface BaseColumn {
  // TODO? rename label, 类型抽象
  title: RenderCustom
  width?: number | string
  align?: 'left' | 'right' | 'center'
  className?: string
  colSpan?: number
  // TODO?
  filterOptions?: FilterOptions
  fixed?: 'left' | 'right' // 是否固定列
  when?: () => boolean
  type?: 'index' | 'expand' | 'selection'
  sortable?: boolean
  prop?: string
  field?: string
  disabledWhen?: (arg: { rowIndex: number; row: DataItem }) => boolean
  render?: RenderFn<{ row?: DataItem; colIndex?: number; rowIndex?: number }>
  buttons?: (arg: {
    row?: DataItem
    rowIndex?: number
    colIndex?: number
  }) => Button[]
}

interface SortColumn extends BaseColumn {
  sortable: true
  prop: string // 排序使用的字段
}
interface IndexColumn extends BaseColumn {
  type: 'index'
}
interface ExpandColumn extends BaseColumn {
  type: 'expand'
}
interface SelectionColumn extends BaseColumn {
  type: 'selection'
  disabledWhen?: (arg: { rowIndex: number; row: DataItem }) => boolean
}
interface FieldColumn extends BaseColumn {
  field: string
}
interface RenderColumn extends BaseColumn {
  render: RenderFn<{ row?: DataItem; colIndex?: number; rowIndex?: number }>
}
interface ButtonColumn extends BaseColumn {
  buttons: (arg: {
    row?: DataItem
    rowIndex?: number
    colIndex?: number
  }) => Button[]
}

export type Column =
  | FieldColumn
  | ButtonColumn
  | RenderColumn
  | ButtonColumn
  | SelectionColumn
  | IndexColumn
  | SortColumn
  | ExpandColumn

export type HeaderClassNamesGenerator = () => string

export type HeaderStylesGenerator = () => string | CSSProperties | undefined

export type ClassNamesGenerator<T> = {
  (p: T): string
}
export type StylesGenerator<T> = {
  (p: T): string | CSSProperties | undefined
}

export type Order = 'asc' | 'desc'
export type Sorter = {
  order: Order
  prop: string
}

export type Expander = {
  rowExpandable: (p: { row: DataItem; rowIndex: number }) => boolean
  expandRowRender: RenderFn<{ row?: DataItem; rowIndex?: number }>
}

// go style
export interface GoPager {
  num: number
  size: number
  total: number
}

// php style
export interface LegacyPager {
  current_page: number
  page_size: number
  total_items: number
}

export type ResponsePager = GoPager | LegacyPager

export interface PaginationItem {
  // 当前在第几页
  currentPage: number
  // 总共有多少页
  totalItems: number
  // 每一页的数量
  pageSize: number
  // 总共有多少页
  totalPages: number
  // 分页中最多显示最近多少页
  maxLength: number
  // todo ?
  // 居中显示
  keepMiddle: boolean
  // todo ?
  directionBtns: boolean
  // 设置文字
  previousText: string
  nextText: string
  firstText: string
  lastText: string
  totalCount: boolean
  boundaryBtns: boolean
  // 自定义总量的渲染
  totalTemplate: (total: number) => string
  jumpPage: boolean
}

export type TableProps = {
  data: DataItem[]
  columns: Column[]
  stripe?: boolean
  border?: boolean
  // 自定义样式
  headerRowClassName?: HeaderClassNamesGenerator
  headerRowStyle?: HeaderStylesGenerator
  headerCellClassName?: ClassNamesGenerator<{ colIndex: number }>
  headerCellStyle?: StylesGenerator<{ colIndex: number }>
  rowClassName?: ClassNamesGenerator<{ row: DataItem; rowIndex: number }>
  rowStyle?: StylesGenerator<{ row: DataItem; rowIndex: number }>
  cellClassName: ClassNamesGenerator<{
    row: DataItem
    col: Column
    colIndex: number
    rowIndex: number
  }>
  cellStyle: (c: {
    row: DataItem
    col: Column
    rowIndex: number
    colIndex: number
  }) => [number, number]
  cellSpan: (c: {
    row: DataItem
    col: Column
    rowIndex: number
    colIndex: number
  }) => [number, number]
  height?: number
  showHeader?: boolean
  showData?: boolean
  // 排序key
  rowKey: string
  highlightCurrentRow?: boolean
  // 单选 item[rowKey]
  current?: string | number
  // 单选
  currentSelected: DataItem | null
  // 多选
  selected: DataItem[]
  selectedKeys: Array<string | number>
  // 排序
  sort: Partial<Sorter>
  expand: Partial<Expander>
  loading?: boolean
  scroll: Partial<{ width: number; height: number }>
}

export type TableEmits = {
  'update:selected': [selectedItems: DataItem[]]
  'update:selectedKeys': [selectedKeys: Array<string | number>]
  'update:current': [current: DataItem['rowKey']]
  'update:currentSelected': [data: DataItem]
  'sort-change': [sorter: Sorter]
}

export type SortProps = {
  sort: Partial<Sorter>
  prop: string
}

export type SortEmits = {
  'sort-change': [sorter: Sorter]
}

export type TableHeaderProps = {
  columns: Column[]
  border: boolean
  headerRowClassName?: HeaderClassNamesGenerator
  headerRowStyle?: HeaderStylesGenerator
  headerCellClassName?: ClassNamesGenerator<{ colIndex: number }>
  headerCellStyle?: StylesGenerator<{ colIndex: number }>
  sort: Partial<Sorter>
  fixedHeader?: boolean
}

export type TableHeaderEmits = {
  'sort-change': [sorter: Sorter]
  'check-all-change': []
}

export type TableRowProps = {
  columns: Column[]
  row: DataItem
  border: boolean
  stripe?: boolean
  rowClassName?: ClassNamesGenerator<{ row: DataItem; rowIndex: number }>
  rowStyle?: StylesGenerator<{ row: DataItem; rowIndex: number }>
  cellClassName?: ClassNamesGenerator<{
    row: DataItem
    col: Column
    colIndex: number
    rowIndex: number
  }>
  cellStyle?: StylesGenerator<{
    row: DataItem
    col: Column
    colIndex: number
    rowIndex: number
  }>
  cellSpan: (c: {
    row: DataItem
    col: Column
    rowIndex: number
    colIndex: number
  }) => [number, number]
  highlightCurrentRow?: boolean
  rowKey: string
  rowIndex: number
  currentActiveRow: number
  expand: Partial<Expander>
}

export type TableRowEmits = {
  'row-click': [e: Event, rowIndex: number, row: DataItem]
}

export type TableBodyProps = {
  columns: Column[]
  data: DataItem[]
  current: string | number
  highlightCurrentRow: boolean
  rowKey: string
}

export type TableBodyEmits = {
  'current-change': [item: DataItem]
}

export type RealColumns = {
  realColumns: Ref<Column[]>
  containerRef: Ref<HTMLElement | null>
}
