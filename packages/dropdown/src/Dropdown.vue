<template>
  <Popper
    v-model="visible"
    :trigger="trigger"
    :placement="placement"
    :show-arrow="false"
    :popper-class="`${staticStyle.popper} ${divide ? staticStyle.divide : ''}`"
    :distance="5"
    :transition-class="transitionClass"
    :delay="delay"
    :disabled="disabled"
    @show="show"
    @hide="hide"
  >
    <slot>
      <BaseButton :class="staticStyle.baseButton">
        {{ label }}
        <span
          :class="`v-icon v-icon-chevron-down ${staticStyle.iconClass}`"
        ></span>
      </BaseButton>
    </slot>
    <template #content>
      <slot name="dropdown"></slot>
    </template>
  </Popper>
</template>

<script setup lang="ts">
import { computed, ref, provide } from 'vue'
import { BaseButton } from '@apathia/apathia.button'
import { Popper, TriggerType, Placement } from '@apathia/apathia.popper'
import { style } from '@apathia/apathia.twind'
import type { DropdownProps, DropdownEmits } from './types'

defineOptions({
  name: 'Dropdown',
})

const getDropdownStyle = () => ({
  transitionClass: {
    'enter-from-class': style`transform opacity-0 scale-95`,
    'enter-active-class': style`transition ease-out duration-100`,
    'enter-to-class': style`transform opacity-100 scale-100`,
    'leave-from-class': style`transform opacity-100 scale-100`,
    'leave-active-class': style`transition ease-in duration-75`,
    'leave-to-class': style`transform opacity-0 scale-95`,
  },
  staticStyle: {
    popper: style`max-w-7xl rounded shadow-lg bg-fill-white`,
    divide: style`divide-y divide-fill-light py-0`,
    iconClass: style`text-xs`,
    baseButton: style`m-0`,
  },
})

const props = withDefaults(defineProps<DropdownProps>(), {
  delay: 300,
  disabled: false,
  label: '',
  trigger: 'click',
  placement: 'bottom',
  hideOnClick: false,
})

const emit = defineEmits<DropdownEmits>()

const visible = ref<boolean>(false)
const divide = ref<boolean>(false)

const show = (state: boolean) => {
  emit('show', state)
}

const hide = (state: boolean) => {
  emit('hide', state)
}

provide('dropdown', {
  hideOnClick: computed(() => props.hideOnClick),
})

provide('updateVisible', (v: boolean) => {
  visible.value = v
})

provide('updateDivide', (v: boolean) => {
  divide.value = v
})

const { transitionClass, staticStyle } = getDropdownStyle()
</script>
