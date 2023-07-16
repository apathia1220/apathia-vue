import {
  computed,
  SetupContext,
  Ref,
  WritableComputedRef,
  ComputedRef,
} from 'vue'
import type { Column, DataItem, TableEmits } from './types'

type Event = 'update:selected' | 'update:selectedKeys'
export interface TableMultiSelectedHelper {
  selectedMap: WritableComputedRef<Record<string, boolean>>
  allSelected: WritableComputedRef<boolean>
  indeterminate: ComputedRef<boolean>
  toggleItem: (i: DataItem) => void
  toggleAllSelected: () => void
  shiftToggle: (range: DataItem[]) => void
}

export function useTableSelected(
  data: Readonly<Ref<DataItem[]>>,
  selectedKeys: Ref<Array<number | string>>,
  selected: Ref<DataItem[]>,
  key: Ref<string>,
  columns: Ref<Column[]>,
  emit: SetupContext<TableEmits>['emit'],
): TableMultiSelectedHelper {
  const disabledKeyMap = computed(() => {
    const [selectionColumn] = columns.value.filter(
      col => 'type' in col && col.type === 'selection',
    )
    if (
      !selectionColumn ||
      !('disabledWhen' in selectionColumn) ||
      typeof selectionColumn.disabledWhen !== 'function'
    )
      return {}

    return data.value
      .filter((item, index) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // 由于selectedWhen 是可选的 所以加上！可以使用，如果没有传不会报错
        selectionColumn.disabledWhen!({ row: item, rowIndex: index }),
      )
      .reduce((map: Record<string, boolean>, item) => {
        map[`${item[key.value]}`] = true
        return map
      }, {})
  })

  const checkableCount = computed(() => {
    return data.value.length - Object.keys(disabledKeyMap.value).length
  })

  const selectedMap = computed({
    get: () => {
      // selected， selectedKeys 二者等价
      if (selected.value && selected.value.length) {
        return selected.value.reduce<Record<string, boolean>>((acc, cur) => {
          acc[`${cur[key.value]}`] = true
          return acc
        }, {})
      } else if (selectedKeys.value && selectedKeys.value.length) {
        return selectedKeys.value.reduce<Record<string, boolean>>(
          (acc, key) => {
            acc[key] = true
            return acc
          },
          {},
        )
      } else {
        return {}
      }
    },
    set: (checkedMap: Record<string, boolean>) => {
      const selectedItems = data.value.filter(
        item =>
          checkedMap[`${item[key.value]}`] &&
          !disabledKeyMap.value[`${item[key.value]}`],
      )

      emit('update:selected', selectedItems)
      emit(
        'update:selectedKeys',
        selectedItems.map(item => item[key.value]),
      )
    },
  })

  const allSelected = computed({
    get() {
      return data.value.length === 0 || checkableCount.value === 0
        ? false
        : selected.value.length === checkableCount.value
    },
    set(value: boolean) {
      if (value) {
        selectedMap.value = data.value.reduce<Record<string, boolean>>(
          (acc, item) => {
            acc[`${item[key.value]}`] = true
            return acc
          },
          {},
        )
      } else {
        selectedMap.value = {}
      }
    },
  })

  const toggleItem = (item: DataItem) => {
    const identify = `${item[`${key.value}`]}`

    // note: reassign
    selectedMap.value = {
      ...selectedMap.value,
      [identify]: !selectedMap.value[identify],
    }
  }

  const toggleAllSelected = () => {
    allSelected.value = !allSelected.value
  }

  const shiftToggle = (range: DataItem[]) => {
    const rangeAllChecked = range.every(
      i => selectedMap.value[`${i[key.value]}`],
    )

    // note: reassign
    selectedMap.value = {
      ...selectedMap.value,
      ...range.reduce<Record<string, boolean>>((acc, cur) => {
        acc[`${cur[key.value]}`] = !rangeAllChecked
        return acc
      }, {}),
    }
  }

  const indeterminate = computed(() => {
    const intersection = data.value.filter(item => {
      return selectedMap.value[`${item[key.value]}`]
    })
    return intersection.length > 0 && !allSelected.value
  })

  return {
    selectedMap,
    allSelected,
    indeterminate,

    toggleItem,
    toggleAllSelected,
    shiftToggle,
  }
}
