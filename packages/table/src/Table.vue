<template>
  <div
    ref="containerRef"
    :class="styles.container"
    :style="{
      'max-height': fixedHeader ? `${height}px` : 'auto',
    }"
  >
    <table :class="styles.table" :style="tableStyle" v-bind="$attrs">
      <TableHeader
        v-if="showHeader"
        :columns="realColumns"
        :border="border"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :sort="sort"
        :fixed-header="fixedHeader"
        @sortChange="$emit('sort-change', $event)"
      />

      <template v-if="data.length === 0 || loading">
        <tbody>
          <tr style="height: 55px; text-align: center">
            <td :colspan="realColumns.length">
              <template v-if="loading">
                <slot name="loading">
                  <Loading />
                </slot>
              </template>
              <template v-else-if="data.length === 0">
                <slot name="empty">
                  <p>没有数据</p>
                </slot>
              </template>
            </td>
          </tr>
        </tbody>
      </template>

      <TableBody
        v-if="data.length && !loading && showData"
        :columns="realColumns"
        :data="data"
        :border="border"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :cell-span="cellSpan"
        :current="currentId"
        :highlight-current-row="highlightCurrentRow"
        :row-key="rowKey"
        :expand="expand"
        @currentChange="onCurrentChange"
      />
    </table>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, provide, toRefs } from 'vue'
import { style, css } from '@apathia/apathia.twind'
import { Loading } from '@apathia/apathia.loading'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import { useTableColumns } from './columns'
import { useTableSelected } from './useTableSelected'
import type { DataItem, TableProps, TableEmits } from './types'

defineOptions({
  name: 'Table',
})

const props = withDefaults(defineProps<TableProps>(), {
  stripe: false,
  border: false,
  cellSpan: (() => [1, 1]) as () => [number, number],
  showHeader: true,
  showData: true,
  rowKey: 'key',
  highlightCurrentRow: true,
  current: -1,
  currentSelected: null,
  selected: () => [],
  selectedKeys: () => [],
  sort: () => ({}),
  expand: () => ({}),
  scroll: () => ({}),
})

const emit = defineEmits<TableEmits>()

const getStyles = () => ({
  container: style`shadow relative overflow-auto border(b line-accent)`,
  table: style`min-w-full w-full table-fixed divide-y divide-line-accent text(sm left) leading-normal rounded box-border m-0 p-0 ${css(
    { 'border-collapse': 'separate', 'border-spacing': 0 },
  )}`,
})

const styles = getStyles()

const currentId = computed(() =>
  props.currentSelected ? props.currentSelected[props.rowKey] : props.current,
)

// 多选
const { data, selected, selectedKeys, rowKey, columns } = toRefs(props)
const tableMultiSelected = useTableSelected(
  data,
  selectedKeys,
  selected,
  rowKey,
  columns,
  emit,
)

const tableStyle = computed(() => ({
  minWidth: props.scroll.width ? `${props.scroll.width}px` : '',
  minHeight: props.scroll.height ? `${props.scroll.height}px` : '',
}))

provide('TableMultiSelected', tableMultiSelected)

const { containerRef, realColumns } = useTableColumns(props)
const fixedHeader = computed(() => props.height !== 0)

watch(
  () => props.data,
  () => {
    tableMultiSelected.selectedMap.value = {}
  },
)

function onCurrentChange(item: DataItem) {
  emit('update:current', item[rowKey.value])
  emit('update:currentSelected', item)
}
</script>
