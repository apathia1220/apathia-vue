export type TagType = 'success' | 'primary' | 'danger' | 'warning'

export type TagItem =
  | string
  | {
      type?: TagType
      closeable?: boolean
      iconClass?: string
      [k: string]: any
    }
export type TagsProps = {
  modelValue: TagItem[]
  primary?: boolean
  success?: boolean
  danger?: boolean
  warning?: boolean
  hollow?: boolean
  closable: boolean
  showTag: (tag: TagItem) => string
  handleTag: (str: string) => TagItem
  disabled: boolean
}

export type TagProps = {
  text: string
  iconClass: string
  primary?: boolean
  success?: boolean
  danger?: boolean
  warning?: boolean
  hollow?: boolean
  closable: boolean
}

export type TagEmits = {
  close: []
}

export type TagsEmits = {
  'update:modelValue': [tags: TagItem[]]
  change: [tags: TagItem[]]
}
