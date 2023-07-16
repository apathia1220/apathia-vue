<template>
  <tbody>
    <TableRow
      v-for="(row, rowIndex) in data"
      v-bind="$attrs"
      :key="row[rowKey]"
      :row="row"
      :row-key="rowKey"
      :columns="columns"
      :highlight-current-row="highlightCurrentRow"
      :row-index="rowIndex"
      :current-active-row="currentRowIndex"
      @rowClick="clickRow"
    />
  </tbody>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import TableRow from './TableRow.vue'
import type { DataItem, TableBodyProps, TableBodyEmits } from './types'
import type { TableMultiSelectedHelper } from './useTableSelected'

defineOptions({
  name: 'TableBody',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TableBodyProps>(), {
  current: -1,
  rowKey: 'id',
})

const emit = defineEmits<TableBodyEmits>()

const currentRowIndex = computed({
  get: () => {
    return props.data.findIndex(i => i[props.rowKey] === props.current)
  },
  set: (rowIndex: number) => {
    emit('current-change', props.data[rowIndex])
  },
})
const { selectedMap, toggleItem, shiftToggle } = inject(
  'TableMultiSelected',
) as TableMultiSelectedHelper

const multiSelected = computed(
  () =>
    props.columns.findIndex(col => 'type' in col && col.type === 'selection') >
    -1,
)

// shift check handle
const shiftIndex = ref(-1)
const normalIndex = ref(-1)

const clickRow = (e: MouseEvent, rowIndex: number, row: DataItem) => {
  currentRowIndex.value = rowIndex

  if (!multiSelected.value) {
    return
  }

  if (e.shiftKey) {
    shiftIndex.value = rowIndex
    if (normalIndex.value === shiftIndex.value) {
      toggleItem(row)
      normalIndex.value = rowIndex
      return
    }

    let range: DataItem[] = []
    if (normalIndex.value < shiftIndex.value) {
      const start =
        props.data
          .slice(normalIndex.value, shiftIndex.value + 1)
          .findIndex(item => !!selectedMap.value[`${item[props.rowKey]}`]) +
        normalIndex.value
      range = props.data.slice(start, shiftIndex.value + 1)
    } else if (normalIndex.value > shiftIndex.value) {
      const start = selectedMap.value[`${row[`${props.rowKey}`]}`]
        ? shiftIndex.value + 1
        : shiftIndex.value
      range = props.data.slice(start, normalIndex.value + 1)
    }
    shiftToggle(range)
  } else {
    toggleItem(row)
  }
  normalIndex.value = rowIndex
}

// export default defineComponent({
//   name: 'TableBody',

//   components: {
//     TableRow,
//   },

//   inheritAttrs: false,

//   props: {
//     columns: {
//       type: Array as PropType<Column[]>,
//       required: true,
//     },
//     data: {
//       type: Array as PropType<DataItem[]>,
//       required: true,
//     },
//     current: {
//       type: [String, Number],
//       default: -1,
//     },
//     highlightCurrentRow: {
//       type: Boolean,
//     },
//     rowKey: {
//       type: String,
//       default: 'id',
//     },
//   },

//   emits: ['current-change'],

//   setup(props, { emit }) {
//     // index
//     const currentRowIndex = computed({
//       get: () => {
//         return props.data.findIndex(i => i[props.rowKey] === props.current)
//       },
//       set: (rowIndex: number) => {
//         emit('current-change', props.data[rowIndex])
//       },
//     })
//     const { selectedMap, toggleItem, shiftToggle } = inject(
//       'TableMultiSelected',
//     ) as TableMultiSelectedHelper

//     const multiSelected = computed(
//       () =>
//         props.columns.findIndex(
//           col => 'type' in col && col.type === 'selection',
//         ) > -1,
//     )

//     // shift check handle
//     const shiftIndex = ref(-1)
//     const normalIndex = ref(-1)

//     const clickRow = (e: MouseEvent, rowIndex: number, row: DataItem) => {
//       currentRowIndex.value = rowIndex

//       if (!multiSelected.value) {
//         return
//       }

//       if (e.shiftKey) {
//         shiftIndex.value = rowIndex
//         if (normalIndex.value === shiftIndex.value) {
//           toggleItem(row)
//           normalIndex.value = rowIndex
//           return
//         }

//         let range: DataItem[] = []
//         if (normalIndex.value < shiftIndex.value) {
//           const start =
//             props.data
//               .slice(normalIndex.value, shiftIndex.value + 1)
//               .findIndex(item => !!selectedMap.value[`${item[props.rowKey]}`]) +
//             normalIndex.value
//           range = props.data.slice(start, shiftIndex.value + 1)
//         } else if (normalIndex.value > shiftIndex.value) {
//           const start = selectedMap.value[`${row[`${props.rowKey}`]}`]
//             ? shiftIndex.value + 1
//             : shiftIndex.value
//           range = props.data.slice(start, normalIndex.value + 1)
//         }
//         shiftToggle(range)
//       } else {
//         toggleItem(row)
//       }
//       normalIndex.value = rowIndex
//     }

//     return {
//       clickRow,
//       currentRowIndex,
//     }
//   },
// })
</script>
