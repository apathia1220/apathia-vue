export type FormPosition = 'left' | 'right' | 'top'
export type FormAlign = 'top' | 'center' | 'bottom'

export type FormProps = {
  disabled?: boolean
  inline?: boolean
  labelWidth?: string | number
  labelPosition?: FormPosition
  labelAlign?: FormAlign
}

export type FormItemProps = {
  prop: string
  labelAlign: FormAlign
  labelPosition: FormPosition
  label: string
  required: boolean
  offset: boolean
  labelWidth: number | string
  inline: boolean
  contentClass: string
}
