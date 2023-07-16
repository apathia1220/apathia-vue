<template>
  <textarea
    v-model="inputValue"
    :disabled="!!disableInput"
    :class="classes"
    v-bind="attrs"
  ></textarea>
</template>

<script setup lang="ts">
import { computed, toRef, useAttrs } from 'vue'
import { useInjectProp } from '@apathia/apathia.hooks'
import { style } from '@apathia/apathia.twind'
import type { TextareaProps, TextareaEmits } from './type'

defineOptions({
  name: 'Textarea',
})

const getStyles = () => ({
  commonTextarea: style`block border border-line-accent rounded pt-2 px-2 text-sm outline-none focus:(bg-fill-white border-brand-primary)`,
  fullWidth: style`w-full`,
})

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: undefined,
})

const emit = defineEmits<TextareaEmits>()

const attr = useAttrs()

const disableInput = useInjectProp(
  'FormDisabled',
  false,
  toRef(props, 'disabled'),
)

const styles = getStyles()
const classes = computed(() => ({
  [styles.commonTextarea]: true,
  [styles.fullWidth]: attr.cols === undefined,
}))

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  },
})

const attrs = computed(() => ({
  ...attr,
  // default rows
  rows: attr.rows === undefined ? '3' : attr.rows,
}))
</script>
