<template>
  <div
    v-bind="{ ...getRootProps() }"
    :class="{
      [styles.selectWrapper]: true,
      [styles.disabled]: disableSelect,
      [styles.active]: active,
    }"
  >
    <input
      v-bind="{ ...getInputProps() }"
      :class="{ [styles.inputSelected]: true, [styles.focused]: inputFocused }"
    />
    <svg
      :class="{ [styles.arrow]: true }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-if="clearable"
      :class="{
        [styles.clearableIcon]: true,
        [styles.clearable]: clearable && filterStr,
      }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-3 -3 24 24"
      fill="currentColor"
      @click.stop="clear"
    >
      <path
        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
      />
    </svg>

    <teleport to="body">
      <div
        v-auto-pos.root="rootEl"
        v-bind="{ ...getDropdownProps() }"
        :class="{
          [styles.dropdownContainer]: true,
          [styles.dropdownContainerShow]: active,
        }"
      >
        <ul
          v-if="!isRemote || !isLoading"
          :class="{ [styles.optionList]: true }"
          role="listbox"
          :style="{ maxHeight: maxHeight + 'px' }"
        >
          <slot></slot>
          <slot v-if="isLoading" name="loading">
            <p :class="{ [styles.tips]: true }">加载中...</p>
          </slot>
          <slot v-if="!isLoading && isEmpty" name="empty">
            <p :class="{ [styles.tips]: true }">没有选项数据</p>
          </slot>
          <slot v-if="!isLoading && !isEmpty && isNoResult" name="no-result">
            <p :class="{ [styles.tips]: true }">没有搜索结果</p>
          </slot>
        </ul>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, provide } from 'vue'
import { useInjectProp } from '@apathia/apathia.hooks'
import { autoPos as vAutoPos } from '@apathia/apathia.shared'
import { style } from '@apathia/apathia.twind'
import useSelect from './useSelect'
import {
  ChangeHandlerKey,
  FocusKey,
  RegisterKey,
  SameValueCompareKey,
  SelectStateKey,
  UnregisterKey,
  UpdateRegisterKey,
} from './injectKeys'
import type { SelectProps, SelectEmits } from './types'

defineOptions({
  name: 'Select',
})

const props = withDefaults(defineProps<SelectProps>(), {
  valueKey: 'value',
  placeholder: '请选择...',
  filterable: false,
  clearable: false,
  emptyText: '暂无数据',
  disabled: undefined,
  maxHeight: 235,
  isLoading: false,
  placement: '',
})

const emits = defineEmits<SelectEmits>()

const {
  disabled,
  modelValue,
  valueKey,
  filterable,
  emptyText,
  maxHeight,
  placeholder,
} = toRefs(props)

const disableSelect = useInjectProp('FormDisabled', false, disabled)

const userProps = {
  disabled: disableSelect,
  modelValue,
  valueKey,
  filterable,
  emptyText,
  maxHeight,
  placeholder,
}

const {
  filterStr,
  updateRegister,
  selectState,
  changeHandler,
  register,
  unregister,
  focus,
  clear,
  isSameValue,
  active,
  isEmpty,
  inputFocused,
  isNoResult,
  isRemote,
  getRootProps,
  getInputProps,
  getDropdownProps,
  rootEl,
} = useSelect(userProps, emits)

provide(UpdateRegisterKey, updateRegister)
provide(RegisterKey, register)
provide(UnregisterKey, unregister)
provide(SelectStateKey, selectState)
provide(ChangeHandlerKey, changeHandler)
provide(FocusKey, focus)
provide(SameValueCompareKey, isSameValue)

const styles = {
  selectWrapper: style`flex relative border rounded border-line-accent bg-content-white shadow h-8`,
  disabled: style(
    'cursor-not-allowed pointer-events-none bg-info-forbid placeholder-content-secondary text-content-secondary',
  ),
  active: style('border-brand-primary'),
  inputSelected: style`flex-1 rounded text-sm py-1.5 pl-2 outline-none cursor-pointer`,
  focused: style('select-none'),
  arrow: style(
    'absolute inset-y-0 right-0 flex items-center pr-2 pl-1.5 py-btn-sm-y pointer-events-none h-8 w-8 text-content-secondary',
  ),
  clearableIcon: style(
    'hidden absolute w-3.5 h-3.5 rounded-full top-2.5 right-7 items-center bg-fill-secondary text-content-white cursor-pointer hover:bg-fill-accent',
  ),
  clearable: style('block'),

  dropdownContainer: style`z-dropdown block h-0 absolute mt-1 border border-line-accent rounded bg-content-white shadow opacity-0 transition duration-200 overflow-y-hidden`,
  dropdownContainerShow: style`h-auto opacity-100`,

  optionList: style`max-h-56 text-base overflow-auto focus:outline-none sm:text-sm`,
  tips: style('ml-3 py-2 text-fill-secondary text-left mr-2'),
}
</script>
