import { watch, ref, nextTick, SetupContext, Ref } from 'vue'
import { onClickOutside } from '@apathia/apathia.hooks'
import { mountContainerDom } from '@apathia/apathia.shared'
import { pushModal, popModalStack } from './modalStack'
import { hideScrollbar } from './helper'
import type { ModalProps, ModalEmits } from './types'

export function createModal(
  props: ModalProps,
  emit: SetupContext<ModalEmits>['emit'],
  slots: SetupContext['slots'],
) {
  const shadeRef = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>
  const modalRef = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>
  const widthStyle = getWidthStyle(props.width, props.top)
  const isTemplate = !!slots.default

  mountContainerDom('modal')

  function templateClose() {
    if (props.beforeClose && props.beforeClose()) {
      emit('update:modelValue', false)
      popModalStack()
    }
  }
  function functionClose() {
    if (props.beforeClose && props.beforeClose()) {
      emit('close')
      popModalStack()
    }
  }

  const close = isTemplate ? templateClose : functionClose

  function bindClickOutside() {
    if (props.maskClosable === false) return

    function handleClose() {
      if (props.beforeClose && props.beforeClose()) {
        close()
      }
    }

    nextTick(() => {
      onClickOutside(modalRef, handleClose)
    })
  }

  watch(
    () => props.modelValue,
    show => {
      if (show) {
        pushModal({ close, props }) // esc close 事件栈
        hideScrollbar() // 隐藏滚动条来阻止滚动事件
        bindClickOutside() // 绑定点击蒙层关闭事件
        if (shadeRef.value) {
          shadeRef.value.scrollTop = 0
        }
      } else {
        emit('close')
      }
    },
  )

  return {
    shadeRef,
    modalRef,
    widthStyle,
    close,
    isTemplate,
  }
}

function getWidthStyle(width?: string | number, top?: string | number) {
  return `
    width: ${width}${typeof width === 'number' ? 'px' : ''};
    margin-top: ${top}${typeof top === 'number' ? 'px' : ''};
  `
}
