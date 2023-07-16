import { style } from '@apathia/apathia.twind'
import { modalStack } from './modalStack'

export function hideScrollbar() {
  if (typeof window === 'undefined') return

  const html = document.documentElement
  if (html.scrollHeight - html.clientHeight > 0) {
    // 判断是否会出现滚动条
    document.body.style.overflow = 'hidden'
    document.body.style.width = 'calc(100% - 15px)'
  }
}

export function showScrollbar() {
  if (typeof window === 'undefined') return

  if (modalStack.length === 0) {
    document.body.style.overflow = 'auto'
    document.body.style.width = 'auto'
  }
}

export function mountContainerDom() {
  if (typeof window === 'undefined') return

  if (!document.querySelector('.apathia-modal')) {
    const className = style`z-modal relative` // 只有定位元素(position:relative/absolute/fixed)的 z-index 才有作用
    // 在第一次调用的时候挂载一次
    const modalContainerDom = document.createElement('div')
    modalContainerDom.className = `apathia-modal ${className}`
    document.body.appendChild(modalContainerDom)
  }
}
