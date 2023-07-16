import type { RenderCustom } from '@apathia/apathia.custom-render'

export type ModalProps = {
  modelValue?: boolean
  title?: string
  subTitle?: string
  render?: RenderCustom
  renderHeader?: RenderCustom
  top?: number | string
  width?: number | string
  showClose?: boolean
  maskClosable?: boolean
  keyboard?: boolean
  beforeClose?: () => boolean
  onClose?: () => void
}

export type ModalListItemProps = {
  props: ModalProps
  id: string
}

export type ModalEmits = {
  'update:modelValue': [value: boolean]
  close: []
}

export type ModalInstance = {
  props: ModalProps
  close: () => void
}
