import {
  ref,
  unref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type {
  SelectValueType,
  SelectState,
  OptionRegister,
  OptionRemover,
} from './types'

export function useOption(userProps: {
  value: Ref<number | string | boolean>
  disabled: Ref<boolean>
  register: OptionRegister
  unregister: OptionRemover
  updateRegister: OptionRegister
  selectState: SelectState
  changeHandler: (
    value: SelectValueType,
    label: string,
    isInnerChange?: boolean,
  ) => void
  isSameValue: (newVal: SelectValueType, oldVal: SelectValueType) => boolean
  focus: (uid: number, focusedEl?: HTMLElement) => void
  compoId: number
}): {
  isSelected: Ref<boolean>
  isHidden: Ref<boolean>
  isFocused: ComputedRef<boolean>
  getRootProps: () => Record<string, unknown>
} {
  const isHidden = ref(false)
  const isSelected = ref(false)
  const mouseMoveFocus = ref(false)
  const currentOptionChange = ref(false)
  const label = ref('')

  const {
    value,
    disabled,
    register,
    unregister,
    updateRegister,
    selectState,
    changeHandler,
    isSameValue,
    focus,
    compoId,
  } = userProps

  const rootEl = ref(null) as Ref<HTMLElement | null>

  const isFocused = computed(() => compoId === selectState.focusId)

  watch(isFocused, val => {
    if (val && mouseMoveFocus.value === false) {
      const el = unref(rootEl)
      if (el) {
        focus(0, el)
      }
    }
    mouseMoveFocus.value = false
  })

  const queryChange = (val: string) => {
    nextTick(() => {
      const shouldHide =
        label.value.toLowerCase().indexOf(val.toLowerCase()) === -1
      if (isHidden.value !== shouldHide) {
        // 状态不变的不通知
        isHidden.value = shouldHide
        if (!disabled.value) {
          updateRegister(isHidden.value, compoId, value.value, label.value)
        }
      }
    })
  }
  const handleChange = (event: MouseEvent) => {
    if (disabled.value) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    // 点击了当前选择的值
    const clickSelf = isSameValue(value.value, selectState.value)
    if (clickSelf) {
      return
    }
    isSelected.value = true
    currentOptionChange.value = true
    changeHandler(value.value, label.value, true)
  }
  const handleChecked = (newVal: SelectValueType) => {
    //  处理外部props变化
    if (currentOptionChange.value === true) {
      // option自己触发值变化
      currentOptionChange.value = false
      return
    }
    if (selectState.innerChange) {
      // 其他option触发值变化
      isSelected.value = false
      return
    }
    // 外部值变化
    const optionValue = value.value
    const newSelected = isSameValue(newVal, optionValue)

    if (newSelected) {
      changeHandler(optionValue, label.value)
    }
    isSelected.value = newSelected
  }
  const mouseoverHandler = () => {
    if (disabled.value) return
    focus(compoId)
    mouseMoveFocus.value = true
  }

  // this.$nextTick(() => {
  watch(() => selectState.filterStr, queryChange)
  watch(() => selectState.value, handleChecked, {
    immediate: true,
  })
  // })

  onMounted(() => {
    const elElement = unref(rootEl)
    const labelElement = elElement?.querySelector('[label]')
    label.value =
      labelElement?.getAttribute('label') ||
      elElement?.textContent?.trim() ||
      ''
    nextTick(() => {
      register(disabled.value, compoId, value.value, label.value)
    })
  })

  onBeforeUnmount(() => {
    unregister(compoId)
  })

  const getRootProps = () => ({
    tabindex: '0',
    style: isHidden.value ? 'display: none;' : null,
    ref: (el: HTMLElement) => {
      rootEl.value = el
    },
    onMouseover: mouseoverHandler,
    onClick: handleChange,
  })

  return {
    getRootProps,
    isSelected,
    isHidden,
    isFocused,
  }
}
