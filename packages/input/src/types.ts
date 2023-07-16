import { CSSProperties } from 'vue'

export type InputProps = {
  type?: string
  modelValue?: string | number
  inputClass?: string | object
  search?: boolean
  clearable?: boolean
  disabled?: boolean
  maxWords?: number
}

export type InputEmits = {
  'update:modelValue': [value: string]
  input: [e: Event]
  search: [value: string | number]
}

export type InputAttrs = {
  style: CSSProperties
}
