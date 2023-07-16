import { shallowRef, ref, unref, computed } from 'vue'
import type { Ref } from 'vue'
import type {
  Column,
  ResponsePager,
  PaginationItem as Pagination,
} from './types'

export function createTable<T>(cols: Column[], shallowData = false) {
  // 列表项
  const columns = shallowRef(cols)
  const setColumns = (value: Column[]) => {
    columns.value = value
  }
  const getColmns = () => columns.value

  // 数据
  const loading = ref(false)
  const data: Ref<T[]> = shallowData ? shallowRef([]) : ref([])
  const setData = (newData: T[] | { (): Promise<T[]> }) => {
    if (Array.isArray(newData)) {
      data.value = newData
    } else {
      loading.value = true
      newData()
        .then(value => {
          data.value = value
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
        .finally(() => {
          loading.value = false
        })
    }
  }
  const getData = () => data.value

  // 分页
  const pagination = ref<Pagination>({
    currentPage: 1,
    totalItems: 0,
    pageSize: 10,
    totalPages: 0,
    maxLength: 7,
    keepMiddle: true,
    directionBtns: true,
    previousText: '上一页',
    nextText: '下一页',
    boundaryBtns: true,
    firstText: '首页',
    lastText: '末页',
    totalCount: true,
    jumpPage: false,
    totalTemplate(totalItems /* , totalPages */) {
      return `共 ${totalItems} 条数据`
    },
  })
  const getPagination = () => pagination.value
  const setPagination = (pager: {
    num: number
    size: number
    total: number
  }) => {
    pagination.value.currentPage = pager.num
    pagination.value.totalItems = pager.total
    pagination.value.pageSize = pager.size
  }
  const updatePager = (pager?: ResponsePager) => {
    if (!pager) {
      setPagination({
        num: 1,
        size: 0,
        total: 0,
      })
    } else if ('num' in pager) {
      setPagination(pager)
    } else {
      setPagination({
        num: pager.current_page,
        size: pager.page_size,
        total: pager.total_items,
      })
    }
  }
  const getCurrentPage = () => pagination.value.currentPage

  // 开关
  const showPagination = ref(true)
  const triggerPagination = (value: boolean) => {
    showPagination.value = value
  }

  const showData = ref(true)
  const triggerData = (value: boolean) => {
    showData.value = value
  }

  const showHeader = ref(true)
  const triggerHeader = (value: boolean) => {
    showHeader.value = value
  }

  const tableOptions = computed(() => ({
    data: unref(data),
    loading: unref(loading),
    columns: unref(columns),
    pagination: unref(pagination),

    showPagination: unref(showPagination),
    showData: unref(showData),
    showHeader: unref(showHeader),
  }))

  const tools = {
    setColumns,
    getColmns,

    setData,
    getData,

    // pagination
    getPagination,
    setPagination,
    updatePager,
    getCurrentPage,

    triggerPagination,
    triggerData,
    triggerHeader,
  }

  return [tableOptions, tools] as const
}
