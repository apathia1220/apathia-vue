import { Component, h } from 'vue'
import { useModal } from '@apathia/apathia.modal'
import Confirm from './Confirm.vue'
import { ConfirmProps } from './types'
import type { ModalProps } from '@apathia/apathia.modal'

const defaultOptions = {
  title: '',
  render: '',
  confirmText: '确认',
  cancelText: '取消',
  btnPosition: 'right',
}

export function useConfirm() {
  const { modal, remove } = useModal()

  function confirm(options: ConfirmProps & ModalProps) {
    const {
      render,
      renderFooter,
      confirmText,
      cancelText,
      btnPosition,
      ...modalOptions
    } = {
      ...defaultOptions,
      ...options,
    }
    const confirmOptions = {
      render,
      renderFooter,
      confirmText,
      cancelText,
      btnPosition,
    }
    return new Promise((resolve, reject) => {
      function doConfirm() {
        resolve(null)
        remove()
      }

      function doCancel() {
        reject()
        remove()
      }

      modal({
        showClose: false,
        width: 450,
        ...modalOptions,
        render: () =>
          h(Confirm as Component, {
            ...confirmOptions,
            confirm: doConfirm,
            cancel: doCancel,
          }),
      })
    })
  }

  return { confirm, remove }
}
