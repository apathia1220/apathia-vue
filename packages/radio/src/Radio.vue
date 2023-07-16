<template>
  <label
    :class="{ [styles.wrapper]: true, [styles.wrapperDisabled]: isDisabled }"
  >
    <span :class="{ [styles.radio]: true }">
      <input
        type="radio"
        tabindex="0"
        :class="{ [styles.input]: true }"
        :value="value"
        :checked="isSelected"
        :disabled="isDisabled"
        @click="handleChange"
        @keydown.space="handleChange"
        @keydown.enter="handleChange"
      />
      <span
        ref="inputEl"
        :class="{
          [styles.inner]: true,
          [styles.innerDisabled]: isDisabled,
          [styles.innerSelected]: isSelected && !isDisabled,
          [styles.innerSelectedDisabled]: isDisabled && isSelected,
          [styles.ring]: !isDisabled,
        }"
        tabindex="-1"
      >
      </span>
    </span>
    <span v-if="$slots.default" :class="styles.contentWrap">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { inject, ref, toRefs, computed, isRef } from 'vue'
import type { Ref } from 'vue'
import { noop } from 'lodash'
import { tw, css, style, apply } from '@apathia/apathia.twind'
import useRadio from './useRadio'
import type { GroupData, RadioProp, RadioEmits } from './types'

defineOptions({
  name: 'Radio',
})

const props = withDefaults(defineProps<RadioProp>(), {
  value: false,
  modelValue: false,
  disabled: undefined,
})

const emit = defineEmits<RadioEmits>()

const { value, modelValue } = toRefs(props)

const groupState = inject('groupState', null) as null | Ref<GroupData>

const changeHandler = inject('changeHandler', noop)

const isDisabled = computed(() => {
  if (props.disabled !== undefined) {
    return props.disabled
  }
  return isRef(groupState) ? groupState.value.disabled : false
})

const inputEl = ref(null)
const userProps = {
  value,
  modelValue,
  disabled: isDisabled,
  groupState,
  changeHandler,
  inputEl,
}

const { isSelected, handleChange } = useRadio(userProps, emit)

const styles = {
  wrapper: style`inline-flex mr-2 p-0 list-none cursor-pointer items-center text-sm`,
  wrapperDisabled: style`text-content-neutral cursor-not-allowed`,
  radio: style`relative inline-block m-0 p-0 whitespace-nowrap align-middle`,
  inner: tw(
    style`relative block w-4 h-4 top-0 left-0 bg-content-white border border-fill-accent outline-none`,
    css`
      border-radius: 100px;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        display: table;
        left: 3px;
        top: 3px;
        ${apply`w-2 h-2 bg-brand-primary rounded`}
        opacity: 0;
        transform: scale(0);
        transition: all 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
    `,
  ),
  innerSelected: tw(
    style`border-brand-hover`,
    css`
      &::after {
        opacity: 1;
        transform: scale(0.875);
        transition: all 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
    `,
  ),
  innerDisabled: style`bg-info-forbid border-line-accent cursor-not-allowed outline-none`,
  innerSelectedDisabled: tw(css`
    &::after {
      opacity: 1;
      transform: scale(0.875);
      transition: all 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
  `),
  ring: style`focus:ring-2 focus:ring-brand-primary`,
  input: style`hidden`,
  contentWrap: style`mx-1`,
}
</script>
