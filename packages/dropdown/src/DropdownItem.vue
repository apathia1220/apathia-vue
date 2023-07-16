<template>
  <div
    :class="{
      [styles.menuItem]: true,
      [styles.active]: !disabled && active,
      [styles.disabled]: disabled,
    }"
    @click="clickCurItem"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { style } from '@apathia/apathia.twind'
import type { DropdownInstance } from './types'

defineOptions({
  name: 'DropdownItem',
})

interface DropdownItemProps {
  active?: boolean
  disabled?: boolean
}

const getDropdownItemStyle = () => ({
  menuItem: style`block px-2 py-2 rounded text(sm content-primary) hover:bg-fill-light cursor-pointer`,
  active: style`text-brand-active`,
  disabled: style`text-content-neutral hover:bg-fill-white cursor-default pointer-events-none`,
})

withDefaults(defineProps<DropdownItemProps>(), {
  active: false,
  disabled: false,
})

const dropdown = inject<DropdownInstance>('dropdown')
const updateVisible = inject<(a: boolean) => void>('updateVisible')

const clickCurItem = () => {
  if (dropdown?.hideOnClick?.value) {
    updateVisible?.(false)
  }
}

const styles = getDropdownItemStyle()
</script>
