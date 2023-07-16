import type { ComputedRef, Ref } from 'vue'

export type SelectValueType =
  | number
  | string
  | boolean
  | Record<string, any>
  | null

export enum Direction {
  UP = 'up',
  DOWN = 'down',
}

export type OptionProps = {
  value: string | number | boolean | null
  disabled: boolean
}

export type Option = {
  value: SelectValueType
  label: string
  disabled: boolean
}

export type SelectState = {
  label: string
  remote: boolean
  value: SelectValueType
  valueKey: string
  filterStr: string
  optionIds: number[]
  optionMap: Record<string, Option>
  focusId: number
  pendingFocusId: number
  innerChange: boolean
  indeed: boolean
}

export type OptionRegister = (
  disabled: boolean,
  uid: number,
  value: SelectValueType,
  label: string,
) => void

export type OptionRemover = (uid: number) => void

export interface SelectUserProps {
  modelValue: Ref<SelectValueType>
  filterable: Ref<boolean>
  valueKey: Ref<string>
  disabled: ComputedRef<boolean | ComputedRef<boolean> | undefined>
  emptyText: Ref<string>
  placeholder: Ref<string>
}

export type SelectProps = {
  modelValue: SelectValueType
  valueKey: string
  placeholder: string
  filterable: boolean
  clearable: boolean
  emptyText: string
  disabled?: boolean
  maxHeight: number | string
  isLoading: boolean
  placement: string
}

export type SelectEmits = {
  'update:modelValue': [value: SelectValueType]
  'native-change': [value: SelectValueType, label: string]
  'query-change': [value: string]
  change: [value: SelectValueType, label: string]
  input: [value: SelectValueType, label: string]
}
