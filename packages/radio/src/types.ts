import type { Ref } from 'vue'

export type RadioProp = {
  value: number | string | boolean
  modelValue: string | number | boolean
  disabled?: boolean
}

export type GroupData = {
  value: string | number | boolean
  disabled: boolean
}

export type RadioGroupProps = {
  modelValue: string | number | boolean
  disabled?: boolean
}

export type RadioEmits = {
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}

export type RadioGroupEmits = {
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}

export type RadioUserProps = {
  disabled: Ref<boolean>
  modelValue: Ref<string | number | boolean>
  value: Ref<string | number | boolean>
  groupState: Ref<GroupData> | null
  changeHandler: (val: string | number | boolean) => void
  inputEl: Ref<HTMLInputElement | null>
}
