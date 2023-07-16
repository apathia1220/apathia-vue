<template>
  <i :style="styles()" v-bind="$attrs">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { isString } from '@apathia/apathia.shared'
import type { IconProps } from './types'

defineOptions({
  name: 'Icon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()

const styles = () => {
  if (!props.color && !props.size) return {}

  return {
    fontSize: props.size
      ? isString(props.size)
        ? props.size
        : `${props.size}px`
      : undefined,
    color: props.color || undefined,
  }
}
</script>

<style>
svg {
  height: 1em;
  width: 1em;
}
</style>
