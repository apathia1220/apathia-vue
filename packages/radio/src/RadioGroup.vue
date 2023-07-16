<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, provide, toRefs } from 'vue'
import { useInjectProp } from '@apathia/apathia.hooks'
import type { RadioGroupProps, RadioGroupEmits } from './types'

defineOptions({
  name: 'RadioGroup',
})

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: false,
  disabled: undefined,
})

const emit = defineEmits<RadioGroupEmits>()

const { modelValue, disabled } = toRefs(props)

const isDisabled = useInjectProp('FormDisabled', false, disabled)
const groupState = computed(() => ({
  value: modelValue.value,
  disabled: isDisabled.value,
}))

provide('groupState', groupState)
provide('changeHandler', (val: string | number | boolean) => {
  emit('update:modelValue', val)
  emit('change', val)
})
</script>
