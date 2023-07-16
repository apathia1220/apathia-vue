<template>
  <tr
    :class="{
      [styles.row]: true,
      [rowClasses]: true,
      [styles.stripedRow]: stripe && rowIndex % 2 === 1, // 奇数
    }"
    :style="rowStyles"
    @click="clickRow($event, rowIndex)"
    @mouseUp="handleRowMouseUp"
  >
    <td
      v-for="(col, colIndex) in cols"
      :key="colIndex"
      :class="col?.tdClasses"
      v-bind="col?.tdAttrs"
    >
      <template v-if="col && 'type' in col">
        <span v-if="col.type === 'index'">{{ rowIndex + 1 }}</span>

        <Checkbox
          v-else-if="col.type === 'selection'"
          :model-value="!!selectedMap[row[rowKey]]"
          :disabled="
            col.disabledWhen ? !!col.disabledWhen({ row, rowIndex }) : false
          "
        />
        <Icon
          v-else-if="col.type === 'expand' && expandable"
          @click="toggleExpand"
        >
          <Minus v-if="expandActive" />
          <Plus v-else />
        </Icon>
      </template>

      <span v-else-if="col && 'field' in col">
        {{ get(row, col.field || '') }}
      </span>

      <div
        v-else-if="col && 'buttons' in col && col.buttons"
        :class="styles.cellBtnsWrap"
      >
        <BaseButton
          v-for="(button, buttonIndex) in col.buttons({
            row,
            rowIndex,
            colIndex,
          })"
          :key="buttonIndex"
          small
          v-bind="classNames2props(button.className)"
          @click="
            button.onClick({
              row,
              rowIndex,
              colIndex,
            })
          "
        >
          {{ button.text }}
        </BaseButton>
      </div>

      <CustomRender
        v-else-if="col && 'render' in col"
        :render="col.render"
        :row="row"
        :col-index="colIndex"
        :row-index="rowIndex"
      />
    </td>
  </tr>

  <!-- expand table row -->
  <transition
    :enter-from-class="styles.fadeEnd"
    :enter-active-class="styles.fadeActive"
    :leave-active-class="styles.fadeActive"
    :leave-to-class="styles.fadeEnd"
  >
    <tr v-if="expandable && expandActive">
      <td :colspan="columns.length">
        <CustomRender
          :render="expand.expandRowRender"
          :row="row"
          :row-index="rowIndex"
        />
      </td>
    </tr>
  </transition>
</template>

<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import { get } from 'lodash'
import { css, style } from '@apathia/apathia.twind'
import { CustomRender } from '@apathia/apathia.custom-render'
import { Icon } from '@apathia/apathia.icon'
import { BaseButton } from '@apathia/apathia.button'
import { Checkbox } from '@apathia/apathia.checkbox'
import { Minus, Plus } from '@apathia/apathia.icon-svg'
import { TableMultiSelectedHelper } from './useTableSelected'
import { toStyleObject, toRealWidth } from './utils'
import type { TableRowProps, TableRowEmits } from './types'

defineOptions({
  name: 'TableRow',
})

const props = withDefaults(defineProps<TableRowProps>(), {
  border: false,
  cellSpan: (() => [1, 1]) as () => [number, number],
  rowKey: 'id',
  rowIndex: 0,
  currentActiveRow: 0,
  expand: () => ({}),
})

const emit = defineEmits<TableRowEmits>()

const rowClasses =
  props.rowClassName?.({ row: props.row, rowIndex: props.rowIndex }) || ''
const rowStyles =
  props.rowStyle?.({ row: props.row, rowIndex: props.rowIndex }) || ''

const { selectedMap } = inject('TableMultiSelected') as TableMultiSelectedHelper

const isRowActiveStyle = computed(
  () => props.highlightCurrentRow && props.currentActiveRow === props.rowIndex,
)

const expandable = computed(
  () =>
    typeof props.expand.expandRowRender === 'function' &&
    !!props.expand.rowExpandable?.({
      row: props.row,
      rowIndex: props.rowIndex,
    }),
)
const expandActive = ref(false)
const toggleExpand = () => {
  expandActive.value = !expandActive.value
}

let cancelClick = false
const clickRow = (e: Event, rowIndex: number) => {
  if (cancelClick) return

  emit('row-click', e, rowIndex, props.row)
}
const handleRowMouseUp = (e: Event) => {
  const selection = window.getSelection()
  if (
    selection &&
    selection.type === 'Range' &&
    selection.focusNode &&
    selection.anchorNode &&
    selection.anchorNode.nodeType !== Node.ELEMENT_NODE &&
    // 判断普通文字选择，Range 开始与结束应属于同一类 Node
    selection.anchorNode.nodeType === selection.focusNode.nodeType
  ) {
    cancelClick = true

    e.stopPropagation()
  } else {
    cancelClick = false
  }
}

const cols = computed(() =>
  props.columns
    .map((col, colIndex) => {
      const [rowSpan, colSpan] = props.cellSpan?.({
        row: props.row,
        col,
        rowIndex: props.rowIndex,
        colIndex,
      })
      if (colSpan === 0 || rowSpan === 0) {
        // 无需渲染
        return null
      }

      const cellClassName =
        props.cellClassName?.({
          row: props.row,
          col,
          rowIndex: props.rowIndex,
          colIndex,
        }) || ''

      const cellStyles = {
        ...toStyleObject(
          props.cellStyle?.({
            row: props.row,
            col,
            rowIndex: props.rowIndex,
            colIndex,
          }),
        ),
        textAlign: col.align || 'center',
        width: toRealWidth(col.width),
      }

      const tdAttrs: Record<string, unknown> = {
        style: cellStyles,
      }
      if (colSpan !== 1) tdAttrs.colSpan = colSpan
      if (rowSpan !== 1) tdAttrs.rowSpan = rowSpan

      const tdClasses = {
        [styles.cell]: true,
        [styles.bordered]: props.border,
        [styles.fixedColumnLeft]: col.fixed === 'left',
        [styles.fixedColumnRight]: col.fixed === 'right',
        [styles.activeRow]: isRowActiveStyle.value, // sticky 需要再次声明背景色
        [styles.stripedRow]: props.stripe && props.rowIndex % 2 === 1,
        [styles.whiteRow]: !(
          isRowActiveStyle.value ||
          (props.stripe && props.rowIndex % 2 === 1)
        ),
        [cellClassName]: true,
      }

      return {
        ...col,
        tdClasses,
        tdAttrs,
      }
    })
    .filter(Boolean),
)

const classNames2props = (str?: string) => {
  if (!str) {
    return {
      primary: true, // default
    }
  }
  return str
    .split(' ')
    .filter(v => !!v)
    .reduce<Record<string, boolean>>((acc, v) => {
      acc[v] = true
      return acc
    }, {})
}

const getStyles = () => {
  const borderRight = css`
    border-right: 1px solid rgb(0 0 0 / 12%);
  `
  const borderLeft = css`
    border-left: 1px solid rgb(0 0 0 / 12%);
  `

  return {
    row: style`hover:(bg-fill-light) transition`,
    cell: style`px-2 py-3 border(b solid line-accent) break-words text-sm`,
    fixedColumnLeft: style`sticky z-20 left-0 ${borderRight}`,
    fixedColumnRight: style`sticky z-20 right-0 ${borderLeft}`,
    bordered: style`border(r solid line-accent)`,
    stripedRow: style`bg-fill-light`,
    activeRow: style`bg-brand-hover`,
    whiteRow: style`bg-fill-white`,
    cellBtnsWrap: style`inline-flex flex-wrap ${css`
      --gap: 0.25rem;
      --column-gap: var(--gap);
      --row-gap: var(--gap);
      margin: calc(var(--row-gap) / -2) calc(var(--column-gap) / -2);
      & > * {
        margin: calc(var(--row-gap) / 2) calc(var(--column-gap) / 2);
      }
    `}`,

    fadeEnd: style`opacity-0`,
    fadeActive: style`transition-all duration-100`,
  }
}

const styles = getStyles()
</script>
