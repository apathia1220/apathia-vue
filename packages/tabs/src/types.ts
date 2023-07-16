export type TabItem = string | number | { [k: string]: any }

export type TabsProps = {
  modelValue: string | number
  list: Array<TabItem>
  underline?: boolean
  showLabel?: Function
}

export type TabsEmits = {
  'update:modelValue': [tab: TabItem]
  navChange: [tab: TabItem]
}
