<template>
  <nav :class="styles.wrapper">
    <ul :class="styles.ul">
      <li v-if="innerOptions.totalCount" :class="styles.count">
        <slot name="total" :totalItems="totalItems" :totalPages="totalPages">
          共{{ totalItems }} 条数据
        </slot>
      </li>
      <li
        v-if="innerOptions.boundaryBtns"
        :class="{
          [styles.item]: true,
          [styles.itemDisabled]: innerOptions.currentPage === 1,
        }"
        @click="selectPage(1)"
      >
        {{ innerOptions.firstText }}
      </li>
      <li
        v-if="innerOptions.directionBtns"
        :class="{
          [styles.item]: true,
          [styles.itemDisabled]: innerOptions.currentPage === 1,
        }"
        @click="selectPage(innerOptions.currentPage - 1)"
      >
        {{ innerOptions.previousText }}
      </li>
      <li
        v-for="(page, index) in pages"
        :key="index"
        :ref="setPageBtnRef"
        :class="{
          [styles.item]: true,
          [styles.numberBtn]: true,
          [styles.active]: page.number === innerOptions.currentPage,
        }"
        @click="selectPage(page.number)"
      >
        {{ page.text }}
      </li>

      <li
        v-if="innerOptions.directionBtns"
        :class="{
          [styles.item]: true,
          [styles.itemDisabled]:
            innerOptions.currentPage === totalPages ||
            innerOptions.totalItems === 0,
        }"
        @click="selectPage(innerOptions.currentPage + 1)"
      >
        {{ innerOptions.nextText }}
      </li>
      <li
        v-if="innerOptions.boundaryBtns"
        :class="{
          [styles.item]: true,
          [styles.itemDisabled]:
            innerOptions.currentPage === totalPages ||
            innerOptions.totalItems === 0,
        }"
        @click="selectPage(totalPages)"
      >
        {{ innerOptions.lastText }}
      </li>

      <li
        v-if="innerOptions.jumpPage"
        :class="{
          [styles.jump]: true,
        }"
      >
        <input
          v-model="jumpTo"
          :class="{
            [styles.jumpInput]: true,
          }"
          @keyup.enter="selectPage(jumpTo)"
        />
        <span
          :class="{
            [styles.pages]: true,
          }"
          >/ {{ totalPages }}</span
        >
        <span
          :class="{
            [styles.jumpBtn]: true,
          }"
          @click="selectPage(jumpTo)"
        >
          跳页
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePagination } from './usePagination'
import { style } from '@apathia/apathia.twind'
import type { PaginationProps, PaginationEmits } from './types'

defineOptions({
  name: 'Pagination',
})

const props = defineProps<PaginationProps>()

const emit = defineEmits<PaginationEmits>()

const options = computed(() => ({ ...props.options }))

const userProps = {
  options,
}

const {
  jumpTo,
  pages,
  totalPages,
  totalItems,
  selectPage,
  setPageBtnRef,
  innerOptions,
} = usePagination(userProps, emit)

const getPaginationStyles = () => ({
  wrapper: style`relative bg-fill-white py-3 flex items-center justify-between`,
  ul: style`relative z-0 inline-flex items-center text-base`,

  item: style`relative inline-flex flex-shrink-0 mx-1 px-btn-lg-y py-px border border-fill-neutral rounded 
    bg-fill-white text-content-primary cursor-pointer select-none hover:bg-brand-primary hover:text-content-white`,

  active: style`text-content-white bg-brand-primary border-brand-primary outline-none`,
  itemDisabled: style`cursor-not-allowed pointer-events-none text-content-neutral bg-fill-light border-fill-gray`,
  numberBtn: style`outline-none`,
  jump: style`relative z-0 inline-flex items-center -space-x-px text-base border border-fill-neutral rounded`,
  jumpInput: style`outline-none text-center w-8 px-btn-lg-y py-px border-0 rounded`,
  jumpBtn: style`text-center w-14  px-btn-lg-y py-px border-0 bg-fill-white rounded
    cursor-pointer hover:bg-brand-primary hover:text-content-white`,
  count: style`px-4`,
  pages: style`pr-1`,
})

const styles = getPaginationStyles()
</script>
