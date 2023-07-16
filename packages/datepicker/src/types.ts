import flatpickr from 'flatpickr'

export type DateFormatType =
  | 'Y-m'
  | 'Y-m-d'
  | 'Y-m-d H:i'
  | 'Y-m-d H:i:S'
  | 'Y-m-d H:i:s'
  | 'Y-m-d h:i:s'

export type RangeItem = [string | number, string | number]

export type RangeConfig = {
  [key: string]: RangeItem
}

export type RangeChange = (v: RangeItem) => void

export type GroupProps = {
  startTime: string | number
  endTime: string | number
  dateFormat?: DateFormatType
  timestamp?: boolean
  disabled?: boolean
  startDateOptions?: flatpickr.Options.Options
  endDateOptions?: flatpickr.Options.Options
  range?: RangeConfig
}

export type DateProps = {
  options?: flatpickr.Options.Options
  modelValue: string | number
  dateFormat?: DateFormatType
  timestamp?: boolean
  range?: RangeConfig
}

export type DateEmits = {
  'update:modelValue': [modelValue: string | number]
  change: [{ dateStr: string; value: string | number }]
  rangeChange: [v: RangeItem]
}

export type GroupEmits = {
  'update:startTime': [value: string | number]
  'update:endTime': [value: string | number]
}

export type PluginConfig = {
  clearIcon?: string
  confirmIcon?: string
  confirmText?: string
  clearText?: string
  showAlways?: boolean
  theme?: string
}
