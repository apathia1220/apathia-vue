import { computed, isRef, Ref, unref } from 'vue'
import type { SetupContext } from 'vue'
import type { RadioUserProps, RadioEmits } from './types'

export default function (
  userProps: RadioUserProps,
  emit: SetupContext<RadioEmits>['emit'],
): {
  isSelected: Ref<boolean>
  handleChange: () => void
} {
  const { disabled, modelValue, value, groupState, changeHandler, inputEl } =
    userProps

  let isSelected

  if (isRef(groupState)) {
    // 根据RadioGroup的值更新selected状态
    isSelected = computed(() => unref(groupState).value === value.value)
  } else {
    // 根据自身的值更新selected状态
    isSelected = computed(() => modelValue.value === value.value)
  }

  const select = () => {
    if (disabled.value) {
      return
    }

    emit('update:modelValue', value.value)

    const input = inputEl && unref(inputEl)
    input && input.focus()

    emit('change', value.value)
    changeHandler(value.value)
  }

  return {
    isSelected,
    handleChange: select,
  }
}
