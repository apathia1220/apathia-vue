/**
 * 保存 modal close 事件栈, 实现 modal 正常关闭
 */
import { useEventListener } from '@apathia/apathia.hooks'
import type { ModalInstance } from './types'

export const modalStack: ModalInstance[] = []
let stopListener = () => {}

export function popModalStack() {
  modalStack.pop()
}

export function tryCloseLastModal(isEsc?: boolean) {
  if (modalStack.length > 0) {
    const lastModal = modalStack[modalStack.length - 1]
    if (lastModal.props.beforeClose && !lastModal.props.beforeClose()) return
    if (!lastModal.props.keyboard && isEsc) return
    lastModal?.close()
    if (modalStack.length === 0) stopListener()
  }
}

export function pushModal(modal: ModalInstance) {
  modalStack.push(modal)
  // push 第一个时绑定事件
  if (modalStack.length === 1) {
    stopListener = useEventListener(
      'keydown',
      (event: { key: string; stopPropagation: () => void }) => {
        if (event.key === 'Escape') {
          // ESC
          event.stopPropagation()
          tryCloseLastModal(true)
        }
      },
    )
  }
}
