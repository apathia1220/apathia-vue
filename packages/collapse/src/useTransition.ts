import { RendererElement } from 'vue'
import { raf } from '@apathia/apathia.shared'
import type { TransitionProps } from './types'

export function useTransition(props: TransitionProps) {
  function onEnter(el: RendererElement) {
    setHeight(el, '0px')
    setTransition(el, props.duration)
    raf(() => {
      setHeight(el, `${el.scrollHeight}px`)
    })
  }

  function onLeave(el: RendererElement) {
    setHeight(el, `${el.scrollHeight}px`)
    setTransition(el, props.duration)
    raf(() => {
      setHeight(el, '0px')
    })
  }

  const getTransitionProps = () => ({
    onEnter,
    onLeave,
    onAfterEnter: resetStyle,
    onAfterLeave: resetStyle,
  })

  return {
    getTransitionProps,
  }
}

function setTransition(el: RendererElement, time: number) {
  el.style.transition = `height ${time}ms`
  el.style.overflow = 'hidden'
}

function setHeight(el: RendererElement, height: string) {
  el.style.height = height
}

function resetStyle(el: RendererElement) {
  el.style.height = ''
  el.style.transition = ''
  el.style.overflow = ''
}
