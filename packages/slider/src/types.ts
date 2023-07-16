import { StyleValue } from 'vue'

export type Marker = Record<
  number,
  Partial<{ label: string; style: StyleValue }>
>

export type SliderProps = {
  modelValue: number
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  showSteps?: boolean
  showTooltip?: boolean
  formatTooltip?: Function
  range?: boolean
  valueRange?: number[]
  marks?: Marker
  vertical?: boolean
  height?: number
}

export type StopProps = {
  step: number
  min: number
  max: number
  vertical?: boolean
  marks: Marker
}

export type SliderEmits = {
  'update:modelValue': [value: number]
}
