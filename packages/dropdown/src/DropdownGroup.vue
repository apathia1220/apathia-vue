<template>
  <div :class="styles.container">
    <slot></slot>
  </div>
</template>

<!--
  使用当前组件时 会触发dropdown的divide功能
  未被当前组件包裹的#dropdown子内容都会被黑线分割
-->

<script setup lang="ts">
import { inject } from 'vue'
import { style } from '@apathia/apathia.twind'

defineOptions({
  name: 'DropdownGroup',
})

const getDropdownGroupStyle = () => ({
  container: style`py-1`,
})

const updateDivide = inject<(a: boolean) => void>('updateDivide')
const handleDivide = () => {
  updateDivide?.(true)
}
handleDivide()

const styles = getDropdownGroupStyle()
</script>
