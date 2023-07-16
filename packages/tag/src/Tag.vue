<template>
  <li
    :class="{
      ...themeClasses,
      [styles.size]: true,
      [styles.layout]: true,
    }"
  >
    <span
      v-if="iconClass"
      :class="{
        [iconClass]: true,
        [styles.icon]: true,
      }"
    ></span>
    <slot>
      {{ text }}
    </slot>
    <span
      v-if="closable && !formDisabled && withinTags"
      :class="styles.delIcon"
      @click="handleClose"
    >
      ✕
    </span>
  </li>
</template>

<script setup lang="ts">
import { style } from '@apathia/apathia.twind'
import { computed, inject } from 'vue'
import { TagEmits, TagProps } from './types'

defineOptions({
  name: 'Tag',
})

const getTagStyle = () => {
  const size = style`text-xs`
  const theme = {
    default: style`bg-fill-gray text-content-accent`,
    primary: style`bg-brand-light text-brand-primary`,
    success: style`bg-success-light text-success-primary`,
    danger: style`bg-error-light text-error-primary`,
    warning: style`bg-warning-light text-warning-primary`,
  }

  const hollow = style`border bg-opacity-40`
  const icon = style`inline-block`
  const layout = style`inline-flex items-center mr-1 px-1.5 py-1 rounded cursor-default font-medium`
  const delIcon = style`inline-block cursor-pointer ml-1.5 hover:(text-error-primary)`

  return {
    theme,
    layout,
    delIcon,
    icon,
    size,
    hollow,
  }
}

const props = withDefaults(defineProps<TagProps>(), {
  text: '',
  iconClass: '',
  closable: false,
})

const emit = defineEmits<TagEmits>()

const styles = getTagStyle()
const formDisabled = inject('FormDisabled', false)
const withinTags = inject('WithinTags', false)

const handleClose = () => {
  emit('close')
}

const themeClasses = computed(() => ({
  [styles.theme.default]: !(
    props.primary ||
    props.success ||
    props.danger ||
    props.warning
  ),
  [styles.theme.primary]: props.primary,
  [styles.theme.success]: props.success,
  [styles.theme.danger]: props.danger,
  [styles.theme.warning]: props.warning,
  [styles.hollow]: props.hollow,
}))
</script>
