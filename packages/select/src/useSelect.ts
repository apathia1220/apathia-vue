import { debounce } from 'lodash'
import {
  nextTick,
  Ref,
  computed,
  reactive,
  ref,
  shallowReactive,
  unref,
  watch,
  onBeforeUnmount,
  SetupContext,
  ComponentPublicInstance,
} from 'vue'
import { onClickOutside, useResizeObserver } from '@apathia/apathia.hooks'
import {
  SelectValueType,
  Direction,
  Option,
  SelectUserProps,
  SelectEmits,
} from './types'

export default function useSelect(
  userProps: SelectUserProps,
  emit: SetupContext<SelectEmits>['emit'],
) {
  const { disabled, modelValue, valueKey, filterable, emptyText, placeholder } =
    userProps

  const rootEl = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>
  const inputEl = ref<HTMLInputElement | null>(null) as Ref<HTMLElement | null>
  const dropdownEl = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>

  const active = ref(false)
  const filterStr = ref('')

  const tempArr = shallowReactive<number[]>([])
  const tempMap = shallowReactive<Record<string, Option>>({})
  const inputFocused = ref(false)
  // 记录 select 组件的状态
  const selectState = reactive({
    label: '',
    remote: filterable.value,
    value: modelValue.value,
    valueKey: valueKey.value,
    filterStr: '',
    optionIds: [] as number[],
    optionMap: {} as Record<string, Option>,
    focusId: 0,
    pendingFocusId: 0,
    innerChange: false,
    indeed: true,
  })
  // 动画的id
  const measureAFId = ref(0)
  const mutateAFId = ref(0)
  const pendingCacheUpdate = shallowReactive({
    register: false,
    unregister: false,
  })
  const minWidth = ref(0)
  useResizeObserver(rootEl, (entries: { contentRect: { width: number } }[]) => {
    minWidth.value = entries?.[0]?.contentRect?.width || 200
  })

  const isEmpty = computed(() => selectState.optionIds.length === 0)

  const label = computed(() => {
    if (isEmpty.value && emptyText.value) {
      return emptyText.value
    }
    return selectState.label
  })

  const isNoResult = computed(() => {
    const { optionMap } = selectState
    const result: Option[] = []
    Object.keys(optionMap).forEach(uid => {
      const item = optionMap[uid]
      if (!item.disabled) {
        result.push(item)
      }
    })
    return result.length === 0
  })

  const isRemote = ref(false)

  const finalPlaceholder = computed(() => label.value || placeholder.value)

  const disableSelect = computed(() => !!disabled.value)

  const checkValue = () => {
    const hasValue = hasSelectValue(selectState.value)
    if (!hasValue && !isEmpty.value) {
      // 如果选项中不含该值，且选项不为空数组（空数组可能是异步数据情况），远程搜索情况除外
      // 清空 label, model值不变
      changeHandler(selectState.value, '')
      if (selectState.optionIds.length === 1) {
        // eslint-disable-next-line
        console.warn('[Select]没有符合model值的选项') // eslint/vue parse issue: [Select
      }
    }
  }

  const isSameValue = (newVal: SelectValueType, oldVal: SelectValueType) => {
    if (newVal == null || oldVal == null) {
      // allow null
      return newVal === oldVal
    }
    if (typeof newVal === 'object' && typeof oldVal === 'object') {
      // object
      const key = valueKey.value
      return newVal[key] === oldVal[key]
    }
    // other
    return newVal === oldVal
  }

  const toggleActive = () => {
    active.value = !active.value
  }

  const hasSelectValue = (value?: SelectValueType) => {
    const optionMap = selectState.optionMap
    if (value === undefined) {
      return false
    }
    const optionKeys = Object.keys(optionMap)
    return optionKeys.some(key => isSameValue(optionMap[key].value, value))
  }

  const outsideClick = () => {
    active.value = false
    resetFilterStr()
  }

  const resetFilterStr = () => {
    filterStr.value = label.value
    selectState.filterStr = ''
  }

  const clear = () => {
    changeHandler('', '')
  }

  const changeHandler = (
    value: SelectValueType,
    labelStr: string,
    isInnerChange = false,
  ) => {
    // 正在远程搜索时，重置列表项不触发label更新
    if (value === modelValue.value && isRemote.value) return

    const state = selectState
    state.label = labelStr
    state.innerChange = isInnerChange === true
    resetFilterStr()
    if (value !== modelValue.value) {
      emit('update:modelValue', value)

      emit('input', value, label)
      emit('change', value, label)
      // 只有内部Option选择之后才会触发'native-change'事件（参考原生select的 change事件），区分于input事件
      if (isInnerChange) {
        emit('native-change', value, label)
      }
    }
  }

  const updateRegister = (
    disabledVal: boolean,
    uid: number,
    value: SelectValueType,
    labelStr: string,
  ) => {
    const state = selectState
    if (state.optionMap[uid]) {
      state.optionMap[uid] = {
        value,
        label: labelStr,
        disabled: disabledVal,
      }
    }
  }

  const updateCache = (type: 'register' | 'unregister') => {
    pendingCacheUpdate[type] = false
    selectState.optionIds = tempArr.slice()
    selectState.optionMap = { ...tempMap }
    if (type === 'register') {
      checkValue()
    } else {
      // options变化才会触发，此时定为remote
      isRemote.value = true
    }
  }
  const getNextId = (curId: number, direction: Direction) => {
    const optionIds = selectState.optionIds
    let newIndex = optionIds.indexOf(curId)
    if (direction === Direction.UP) {
      if (newIndex <= 0) {
        newIndex = optionIds.length - 1
      } else {
        newIndex -= 1
      }
      // down
    } else if (newIndex === optionIds.length - 1) {
      newIndex = 0
    } else {
      newIndex += 1
    }
    return optionIds[newIndex]
  }
  const keyFocus = (direction: Direction) => {
    if (!active.value) {
      active.value = true
      return
    }
    if (!selectState.optionIds.length) return
    let newId = getNextId(selectState.focusId, direction)
    while (selectState.optionMap[newId].disabled) {
      newId = getNextId(newId, direction)
    }
    focus(newId)
  }

  const focus = (uid: number, focusedEl?: HTMLElement) => {
    if (!active.value) return
    if (uid && !focusedEl) {
      if (selectState.focusId === uid) return
      selectState.focusId = uid
      return
    }
    if (!focusedEl) return
    // 按键变化焦点
    // 控制某一项已经 active 但没有选中时，滑动窗口 仍然保持该元素 active
    measureAFId.value = requestAnimationFrame(() => {
      // measure
      const dropdown = unref(dropdownEl) as HTMLElement
      if (!dropdown) return

      const ulElement = dropdown.querySelector('ul') as HTMLElement
      if (!ulElement) return
      const { offsetHeight: listOffsetHeight, scrollHeight: listScrollHeight } =
        ulElement
      const { top: listTop, bottom: listBottom } =
        ulElement.getBoundingClientRect()
      const {
        offsetTop: focusOffsetTop,
        offsetHeight: focusOffsetHeight,
        clientHeight: focusClientHeight,
      } = focusedEl
      const { top: focusTop, bottom: focusBottom } =
        focusedEl.getBoundingClientRect()
      const overScroll = focusOffsetHeight / 3

      mutateAFId.value = requestAnimationFrame(() => {
        // mutate
        // console.log(focusedEl)
        if (!ulElement) return
        if (focusBottom + overScroll > listBottom) {
          // console.log(focusedEl)
          ulElement.scrollTop = Math.min(
            focusOffsetTop + focusClientHeight - listOffsetHeight + overScroll,
            listScrollHeight,
          )
        } else if (focusTop - overScroll < listTop) {
          ulElement.scrollTop = Math.max(focusOffsetTop - overScroll, 0)
        }
      })
    })
  }

  const selectFocused = () => {
    const state = selectState
    const target = state.optionMap[state.focusId]
    state.value = (target && target.value) || ''
  }

  const keyHandler = (event: KeyboardEvent) => {
    if (disableSelect.value) return
    if (event.key === 'Tab') return // 保留 tab 默认事件
    switch (event.key) {
      case ' ': // space
        if (filterable.value) {
          // 可筛选的不支持space快捷键
          break
        }
        event.preventDefault()
        event.stopPropagation()
        if (active.value) {
          selectFocused()
        }
        toggleActive()
        break
      case 'Enter':
        if (active.value) {
          event.preventDefault()
          event.stopPropagation()
          selectFocused()
          active.value = false
        } else {
          toggleActive()
        }
        break
      case 'Escape':
        event.stopPropagation()
        if (active.value) {
          active.value = false
        }
        break
      case 'ArrowDown':
        event.preventDefault()
        event.stopPropagation()
        keyFocus(Direction.DOWN)
        break
      case 'ArrowUp':
        event.preventDefault()
        event.stopPropagation()
        keyFocus(Direction.UP)
        break
      default:
    }
  }

  const register = (
    disabledOption: boolean,
    uid: number,
    value: SelectValueType,
    labelStr: string,
  ) => {
    const state = selectState
    if (isSameValue(value, modelValue.value)) {
      state.value = value
      state.label = labelStr
      state.pendingFocusId = uid
    }
    // 操作临时对象
    tempArr.push(uid)
    tempMap[uid] = {
      value,
      label: labelStr,
      disabled: disabledOption,
    }
    if (pendingCacheUpdate.register) {
      return
    }
    pendingCacheUpdate.register = true
    // 所有执行完毕后赋值
    nextTick(() => {
      updateCache('register')
    })
  }

  const unregister = (uid: number) => {
    // const { tempArr, tempMap } = this
    // 操作临时对象
    const optionIndex = tempArr.indexOf(uid)
    tempArr.splice(optionIndex, 1)
    delete tempMap[uid]
    if (pendingCacheUpdate.unregister) return
    pendingCacheUpdate.unregister = true
    // 所有执行完毕后赋值
    nextTick(() => {
      updateCache('unregister')
    })
  }

  const filterHandler = debounce(() => {
    if (inputFocused.value && filterable.value) {
      active.value = true
      nextTick(() => {
        selectState.filterStr = filterStr.value
        emit('query-change', filterStr.value)
      })
    }
  }, 200)

  const toggleDropdown = () => {
    if (disableSelect.value) return
    toggleActive()
  }

  watch(
    modelValue,
    newVal => {
      selectState.value = newVal
      nextTick(() => {
        if (selectState.innerChange) {
          selectState.innerChange = false
          return
        }
        if (!pendingCacheUpdate.register && !pendingCacheUpdate.unregister) {
          checkValue()
        }
      })
    },
    { immediate: true },
  )

  watch(label, newVal => {
    filterStr.value = newVal
  })

  watch(active, newVal => {
    if (newVal) {
      if (selectState.pendingFocusId) {
        selectState.focusId = selectState.pendingFocusId
        selectState.pendingFocusId = 0
      }
      const input = unref(inputEl)
      if (input) {
        input.focus()
      }
      filterStr.value = ''
      if (isRemote.value) {
        emit('query-change', filterStr.value)
      }
    } else {
      resetFilterStr()
      const input = unref(inputEl)
      if (input) {
        input.blur()
      }
    }
  })
  onClickOutside(rootEl, outsideClick)

  onBeforeUnmount(() => {
    if (mutateAFId.value || measureAFId.value) {
      cancelAnimationFrame(mutateAFId.value)
      cancelAnimationFrame(measureAFId.value)
    }
  })

  const getRootProps = () => ({
    disabled: !!disabled.value || isEmpty.value,
    ref: (el: Element | ComponentPublicInstance | null) => {
      rootEl.value = el as HTMLElement
    },
    onClick: toggleDropdown,
    onKeydown: keyHandler,
  })

  const getInputProps = () => ({
    type: 'text',
    tabindex: '0',
    value: filterStr.value.trim(),
    placeholder: finalPlaceholder.value,
    disabled: !!disabled.value,
    readonly: !filterable.value || !inputFocused.value,
    ref: (el: Element | ComponentPublicInstance | null) => {
      inputEl.value = el as HTMLInputElement
    },
    onInput: (event: InputEvent) => {
      filterStr.value = (event.target as HTMLInputElement).value
      filterHandler()
    },
    onFocus: () => {
      inputFocused.value = true
    },
    onBlur: () => {
      inputFocused.value = false
    },
  })

  const getDropdownProps = () => ({
    style: {
      width: `${minWidth.value}px`,
    },
    ref: (el: Element | ComponentPublicInstance | null) => {
      dropdownEl.value = el as HTMLElement
    },
  })

  return {
    getRootProps,
    getInputProps,
    getDropdownProps,

    toggleDropdown,
    register,
    unregister,
    updateRegister,
    focus,
    clear,
    isSameValue,
    keyHandler,
    changeHandler,
    filterHandler,

    filterStr,
    selectState,
    active,
    isEmpty,
    isRemote,
    inputFocused,
    finalPlaceholder,
    isNoResult,
    rootEl,
    inputEl,
  }
}
