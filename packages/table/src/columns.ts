import { ref, onMounted, watch, onUpdated } from 'vue'
import { useEventListener } from '@apathia/apathia.hooks'
import type { Column, RealColumns } from './types'

export function useTableColumns(props: {
  columns: Column[]
  [x: string]: unknown
}): RealColumns {
  const tableWidth = ref(0)
  const containerRef = ref<HTMLElement | null>(null)

  const updateTableWidth = () => {
    tableWidth.value = containerRef.value?.offsetWidth || 0
  }
  useEventListener('resize', updateTableWidth)
  onMounted(updateTableWidth)
  onUpdated(updateTableWidth)

  const realColumns = ref<Column[]>([])
  const resolveColumns = () => {
    const unsureColumnCount = props.columns.filter(
      col => col.width === undefined,
    ).length
    const definedColumnTotalWidth = props.columns.reduce(
      (acc, col) =>
        col.width !== undefined ? acc + parseInt(col.width + '', 10) : acc,
      0,
    )

    // 所有的宽度都没有指定时，不需要额外计算宽度
    const noCalcWidth = unsureColumnCount === props.columns.length

    const columnWidth =
      (tableWidth.value - definedColumnTotalWidth) / unsureColumnCount

    realColumns.value = props.columns
      .filter(col => (col.when ? col.when() : true))
      .map(col => {
        col.align = col.align || 'center'
        return col.width || noCalcWidth ? col : { ...col, width: columnWidth }
      })
  }

  watch(() => tableWidth.value, resolveColumns, { flush: 'post' })

  watch(
    [
      ...props.columns
        .filter(col => col.when && typeof col.when === 'function')
        .map(col => col.when),
      () => props.columns,
    ],
    resolveColumns,
    { immediate: true },
  )

  return {
    realColumns,
    containerRef,
  }
}
