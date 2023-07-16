import {
  computed,
  ref,
  shallowReactive,
  watch,
  onBeforeUpdate,
  onUpdated,
} from 'vue'
import type {
  ComponentPublicInstance,
  ComputedRef,
  Ref,
  SetupContext,
} from 'vue'
import { mergeWithDefault } from '@apathia/apathia.shared'
import type { PaginationConfig, PageItem, PaginationEmits } from './types'

const DEFAULT_OPTIONS: PaginationConfig = {
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
}

export function usePagination(
  props: { options: ComputedRef<PaginationConfig> },
  emit: SetupContext<PaginationEmits>['emit'],
) {
  const realOptions = shallowReactive(
    mergeWithDefault(DEFAULT_OPTIONS, props.options.value),
  )

  const jumpTo = ref('1')
  const prevPage = ref(0)
  const init = ref(false)
  // const pages = [] as PageItem[] // Available pages array for v-for
  const pages = ref<PageItem[]>([])
  const btnsRef = ref<HTMLElement[]>([]) as Ref<HTMLElement[]>

  const setPageBtnRef = (el: Element | ComponentPublicInstance | null) => {
    btnsRef.value.push(el as HTMLElement)
  }

  onBeforeUpdate(() => {
    btnsRef.value = []
  })

  onUpdated(() => {
    updateButtonFocus(realOptions.currentPage)
  })

  const totalItems = computed(() => {
    if (typeof realOptions.totalItems === 'number') {
      return realOptions.totalItems
    }
    return 0
  })

  const totalPages = computed(() => {
    const options = realOptions

    if (totalItems.value === 0) {
      return 0
    }
    return Math.ceil(totalItems.value / options.pageSize)
  })

  const selectPage = (newPage: string | number) => {
    const pageNumber = Number(newPage) || 1

    // prevent click on current page again
    if (realOptions.currentPage === pageNumber) {
      return
    }

    if (prevPage.value == null) {
      prevPage.value = realOptions.currentPage
    }
    realOptions.currentPage = pageNumber
    prevPage.value = pageNumber

    // emit custom change event
    emit('page-change', pageNumber, totalPages.value)

    handlePageChange(pageNumber)
  }

  const handlePageChange = (pageNumber: number) => {
    const limit = realOptions.maxLength
    if (limit === undefined || pageNumber === 0) {
      return
    }

    const keepMiddle = realOptions.keepMiddle

    // go to first
    if (pageNumber === 1 && prevPage.value > limit) {
      pages.value = initPagesArray(
        keepMiddle,
        totalPages.value,
        pageNumber,
        limit,
      )
      init.value = true
      return
    }

    if (keepMiddle && limit < totalPages.value) {
      pages.value = updatePagesArray(
        keepMiddle,
        totalPages.value,
        pageNumber,
        limit,
      )
      return
    }

    // check whether to update array
    const start = (Math.ceil(prevPage.value / limit) - 1) * limit + 1
    const end = Math.min(start + limit - 1, totalPages.value)

    if (pageNumber < start || pageNumber > end) {
      pages.value = updatePagesArray(
        keepMiddle,
        totalPages.value,
        pageNumber,
        limit,
      )
    }
    // this.$nextTick(this.updateButtonFocus(pageNumber))
  }

  const updateButtonFocus = (pageNumber = 1) => {
    const pageIndex = pages.value.findIndex(page => page.number === pageNumber)
    const btns = btnsRef.value
    if (btns && btns[pageIndex]) {
      btns[pageIndex].focus()
    }
  }

  const keepMiddle = !!realOptions.keepMiddle

  prevPage.value = realOptions.currentPage

  watch(
    () => props.options.value,
    optionsVal => {
      ;(Object.keys(optionsVal) as Array<keyof PaginationConfig>).forEach(
        key => {
          if (optionsVal[key] !== undefined) {
            switch (key) {
              case 'currentPage':
              case 'totalItems':
              case 'pageSize':
              case 'totalPages':
              case 'maxLength':
                realOptions[key] = Number(optionsVal[key])
                break
              default:
                realOptions[key] = optionsVal[key]
                break
            }
          }
        },
      )
    },
    { immediate: true },
  )

  watch(
    () => realOptions,
    optionsVal => {
      ;(Object.keys(optionsVal) as Array<keyof PaginationConfig>).forEach(
        key => {
          if (optionsVal[key] !== undefined) {
            switch (key) {
              case 'currentPage':
              case 'totalItems':
              case 'pageSize':
              case 'totalPages':
              case 'maxLength':
                realOptions[key] = Number(optionsVal[key])
                break
              default:
                realOptions[key] = optionsVal[key]
                break
            }
          }
        },
      )
    },
    { immediate: true },
  )

  watch(
    () => totalPages.value,
    () => {
      pages.value = initPagesArray(
        keepMiddle,
        totalPages.value,
        realOptions.currentPage,
        realOptions.maxLength,
      )
      init.value = true
    },
    { immediate: true },
  )

  watch(
    () => realOptions.currentPage,
    page => {
      if (init.value === true) {
        init.value = false
        return
      }
      if (page === prevPage.value) return

      if (page > 1 && page > totalPages.value) {
        // 更新的页数超出最大页数时 翻到最大页
        selectPage(totalPages.value)
        return
      }

      prevPage.value = page
      handlePageChange(page)
    },
  )

  watch(
    () => jumpTo.value,
    (val: string) => {
      if (val === '') {
        return
      }

      let newValue = Number(String(val).replace(/[^0-9]/gi, ''))
      if (newValue > 0 && newValue <= totalPages.value) {
        newValue = Math.ceil(newValue)
      } else {
        newValue = newValue <= 0 ? 1 : totalPages.value
      }
      jumpTo.value = String(newValue)
    },
  )

  return {
    jumpTo,
    pages,
    totalPages,
    totalItems,
    selectPage,
    setPageBtnRef,
    innerOptions: realOptions,
  }
}

/**
 * Create a page object used in pagination list
 * @param  {Number} number - Page number
 * @param  {Number | String} text - text displayed in pagination button
 * @return {Object}
 */
function createPage(number: number, text: number | string) {
  return {
    number,
    text,
  }
}

/**
 * Generate pages array, accept a limit maxLength
 * @param {Boolean} keepMiddle - Whether to keep current page in the middle of the visible ones
 * @param  {Number} totalPages - Total page number
 * @param {Number} currentPage - Current page number
 * @param {Number} limit - max length of the array
 * @return {Array} Array of pages
 */
function initPagesArray(
  keepMiddle: boolean,
  totalPages: number,
  currentPage: number,
  limit: number,
) {
  const pages = [] as PageItem[]

  let number
  let start = 1
  let end = totalPages
  if (!currentPage) {
    return pages
  }

  if (keepMiddle && currentPage > limit) {
    // current page is displayed in the middle of the visible ones
    start = Math.max(currentPage - Math.floor(limit / 2), 1)
    end = start + limit - 1

    // Adjust if limit is exceeded
    if (end > totalPages) {
      end = totalPages
      start = end - limit + 1
      if (start < 1) {
        start = 1
      }
    }
  } else {
    start = (Math.ceil(currentPage / limit) - 1) * limit + 1
    end = Math.min(start + limit - 1, totalPages)
  }

  for (number = start; number <= end; number++) {
    pages.push(createPage(number, number))
  }
  if (totalPages > end && !keepMiddle) {
    pages.push(createPage(number, '...'))
  }
  return pages
}

/**
 * Generate pages array, accept a limit maxLength
 * @param {Boolean} keepMiddle - Whether to keep current page in the middle of the visible ones
 * @param {Number} totalPages - Total page number
 * @param {Number} currentPage - Current page number
 * @param {Number} limit - max length of the array
 * @return {Array} Array of pages
 */
function updatePagesArray(
  keepMiddle: boolean,
  totalPages: number,
  currentPage: number,
  limit: number,
) {
  const pages = [] as PageItem[]

  let number
  let start = 1
  let end
  if (keepMiddle) {
    // current page is displayed in the middle of the visible ones
    start = Math.max(currentPage - Math.floor(limit / 2), 1)
    end = start + limit - 1

    // Adjust if limit is exceeded
    if (end > totalPages) {
      end = totalPages
      start = end - limit + 1
    }
  } else {
    start = (Math.ceil(currentPage / limit) - 1) * limit + 1
    end = Math.min(start + limit - 1, totalPages)
  }

  // Add page numbers
  for (number = start; number <= end; number++) {
    pages.push(createPage(number, number))
  }

  if (keepMiddle) {
    return pages
  }

  // Add boundary buttons
  if (limit <= 0) {
    return pages
  }
  if (start > 1) {
    pages.unshift(createPage(start - 1, '...'))
  }
  if (end < totalPages) {
    pages.push(createPage(end + 1, '...'))
  }

  return pages
}
