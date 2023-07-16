<template>
  <label
    :class="{ [styles.wrapper]: true, [styles.disabledWrapper]: disableInput }"
  >
    <span :class="{ [styles.checkbox]: true }">
      <input
        type="checkbox"
        :class="{ [styles.input]: true }"
        :checked="isChecked"
        :disabled="disableInput"
        :value="trueValue"
        @click.stop="handleChange"
        @keydown.space="handleChange"
        @keydown.enter="handleChange"
      />
      <span
        ref="inputEl"
        :class="{
          [styles.inner]: true,
          [styles.disabledInner]: disableInput,
          [styles.checkedBlueBorder]:
            !disableInput && (isChecked || indeterminate),
          [styles.checkedAfter]: isChecked && !indeterminate,
          [styles.indeterAfter]: !isChecked && indeterminate,
          [styles.ring]: !disableInput,
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
import { ref, toRefs, Ref } from 'vue'
import { useInjectProp } from '@apathia/apathia.hooks'
import { tw, css, apply, style } from '@apathia/apathia.twind'
import useCheckbox from './useCheckbox'
import type { CheckboxProps, CheckboxEmit } from './types'

defineOptions({
  name: 'Checkbox',
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  trueValue: true,
  falseValue: false,
  value: undefined,
  disabled: undefined,
  indeterminate: false,
})

const emit = defineEmits<CheckboxEmit>()

const inputEl = ref(null)
const { modelValue, trueValue, falseValue, value, disabled } = toRefs(props)

const disableInput = useInjectProp(
  'FormDisabled',
  false,
  disabled,
) as Ref<boolean>

const userProps = {
  modelValue,
  trueValue,
  falseValue,
  value,
  disabled: disableInput,
  inputEl,
}

const { isChecked, handleChange } = useCheckbox(userProps, emit)
const getCheckboxStyles = () => ({
  wrapper: style`inline-flex mr-2 p-0 list-none cursor-pointer items-center text-sm`,
  disabledWrapper: style`text-fill-accent cursor-not-allowed`,
  checkbox: style`relative inline-block p-0 whitespace-nowrap outline-none align-middle`,
  inner: tw(
    style`relative block w-4 h-4 top-0 left-0 bg-fill-white border border-fill-accent rounded outline-none`,
    css`
      transition: all 0.3s;
      &::after {
        content: '';
        display: table;
        position: absolute;
        width: 5px;
        height: 9px;
        top: 1px;
        left: 5px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0);
        transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
      }
    `,
  ),

  checkedBlueBorder: style`bg-brand-primary border-brand-primary`,
  // check mark
  checkedAfter: tw(css`
    &::after {
      transform: rotate(45deg) scale(1);
      transition: all 0.15s cubic-bezier(0.12, 0.4, 0.29, 1.46);
    }
  `),
  // indeterminate
  indeterAfter: tw(css`
    &::after {
      transform: rotate(90deg) scale(1);
      border-bottom: 0;
    }
  `),
  disabledInner: tw(
    style`bg-fill-gray border-fill-accent cursor-not-allowed outline-none`,
    css`
      &::after {
        ${apply`border-fill-accent`}
      }
    `,
  ),
  ring: style`focus:ring-2 focus:ring-brand-primary`,
  input: style`hidden`,
  contentWrap: style`mx-1`,
})
const styles = getCheckboxStyles()
</script>
