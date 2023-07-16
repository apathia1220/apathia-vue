export type ScrollbarType = 'horizontal' | 'vertical'

export type ScrollbarProps = {
  move: number
  length: number
  size: number
  hide?: boolean
  type: ScrollbarType
}

export type ContainerSize = 'thick' | 'normal' | 'thin' | number

export type ScrollContainerProps = {
  size?: ContainerSize
  tag?: string
  scrollTop?: number
  scrollLeft?: number
  autoHide?: boolean
  hideVertical?: boolean
  hideHorizontal?: boolean
}

export type ScrollbarEmits = {
  change: [{ offset: number; duration?: number }]
}

export type ScrollContainerEmits = {
  'update:scrollTop': [top: number]
  'update:scrollLeft': [left: number]
}
