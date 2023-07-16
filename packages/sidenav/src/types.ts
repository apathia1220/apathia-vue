export type SideNodeType = {
  text?: string
  icon?: string[]
  children?: SideNodeType[]
  [k: string]: any
}

export type SideNavProps = {
  menuList: SideNodeType[]
  activeKey: string
  mini: boolean
  search: boolean
  keyField: keyof SideNodeType
}

export type SideNodeProps = {
  node: SideNodeType
  mini: boolean
  activeKey: string
  selectHandler: Function
  keyField: keyof SideNodeType
}

export type SideNodeEmits = {
  select: [node: SideNodeType]
}
