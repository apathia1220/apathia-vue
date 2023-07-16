export type TextareaProps = {
  modelValue: string
  disabled?: boolean
}

export type TextareaEmits = {
  'update:modelValue': [value: string]
}
