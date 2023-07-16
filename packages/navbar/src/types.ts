export type NavNode = {
  value: string | number
  label: string
  disabled?: boolean
  iconClass?: string
  children?: NavNode[]
}

export type ThemeType = 'underline' | 'default'

export type NavbarProps = {
  type?: ThemeType
  modelValue?: string | number
  list: NavNode[]
  trigger?: string
  disabledParent?: boolean
}

export type NavbarEmits = {
  'update:modelValue': [value: NavNode['value']]
  change: [navNode: NavNode]
}
