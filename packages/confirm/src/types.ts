import type { RenderCustom } from '@apathia/apathia.custom-render'

export type ConfirmProps = {
  render?: string | RenderCustom
  renderFooter?: RenderCustom<{
    confirm?: (...args: any) => any
    cancel?: (...args: any) => any
  }>
  confirmText?: string
  cancelText?: string
  confirm: Function
  cancel: Function
  btnPosition?: 'left' | 'right' | 'center'
}
