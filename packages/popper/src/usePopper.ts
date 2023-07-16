import {
  onMounted,
  onUnmounted,
  watch,
  ref,
  nextTick,
  ComponentPublicInstance,
  Ref,
} from 'vue'
import { createPopper, StrictModifiers } from '@popperjs/core'
import { onClickOutside, useEventListener } from '@apathia/apathia.hooks'
import { mountContainerDom } from '@apathia/apathia.shared'
import { isRefType, getArrowStyle, isHTMLElement } from './util'
import type {
  PopperProps,
  ElementType,
  PopperEmitOption,
  PopperInstance,
} from './types'

export function usePopper(option: PopperProps, emitOption: PopperEmitOption) {
  const contentRef = ref<HTMLElement | null>(null)
  const arrowRef = ref<HTMLElement | null>(null)
  const { emitVisible, emitHide, emitShow } = emitOption

  mountContainerDom('popper')

  let target: ElementType
  if (option.component) {
    target = option.component
  } else if (option.target) {
    target = option.target
  } else {
    target = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>
  }

  let instance: PopperInstance | null = null

  const getTarget = () => {
    if (isHTMLElement(target)) {
      return target
    }

    return isRefType(target) ? target.value : (target.$el as HTMLElement)
  }

  // 解决命名冲突
  const visibility = ref(!!option.modelValue)

  const detachPopper = () => {
    instance?.destroy?.()
    instance = null
  }

  let timer: Timeout | null

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const show = () => {
    if (option.disabled) return
    visibility.value = true
    if (typeof option.modelValue === 'boolean') {
      emitVisible(true)
    }
    if (option.delayClose && option.trigger !== 'hover') {
      clearTimer()
      timer = setTimeout(() => {
        close()
      }, option.delayClose)
    }
  }

  const close = () => {
    visibility.value = false
    clearTimer()
    if (typeof option.modelValue === 'boolean') {
      emitVisible(false)
    }
    if (option.disabled) {
      detachPopper()
    }
  }

  let stopArr: (() => void)[] = []

  const handleEvent = () => {
    const targetEl = getTarget()

    if (!targetEl) return

    if (option.trigger === 'hover') {
      stopArr.push(
        useEventListener(targetEl, 'mouseenter', () => {
          clearTimer()
          if (visibility.value) {
            return
          }
          show()
        }),
      )
      stopArr.push(
        useEventListener(targetEl, 'mouseleave', () => {
          clearTimer()
          timer = setTimeout(() => {
            close()
          }, option.delayClose || option.delay)
        }),
      )
    }

    if (option.trigger === 'click') {
      stopArr.push(
        useEventListener(targetEl, 'click', e => {
          e.stopPropagation()
          if (visibility.value) {
            close()
          } else {
            show()
          }
        }),
      )
      stopArr.push(
        onClickOutside(targetEl, () => {
          if (visibility.value) {
            close()
          }
        }),
      )
    }

    if (option.trigger === 'focus') {
      stopArr.push(
        useEventListener(targetEl, 'focusin', () => {
          if (visibility.value) return
          show()
        }),
      )
      stopArr.push(
        useEventListener(targetEl, 'focusout', () => {
          close()
        }),
      )
    }
  }

  const modifiersArr: StrictModifiers[] = [
    {
      name: 'offset',
      options: {
        offset: [option.skidding, option.distance],
      },
    },
    {
      name: 'computeStyles',
      options: {
        adaptive: false,
        gpuAcceleration: false,
      },
    },
  ] as StrictModifiers[]
  const initPopper = () => {
    if (!visibility.value) {
      return
    }
    if (option.showArrow) {
      modifiersArr.push({
        name: 'arrow',
        phase: 'main',
        options: {
          element: arrowRef.value,
        },
      } as StrictModifiers)
    }
    const targetEl = getTarget()
    const contentEl = contentRef.value
    if (targetEl && contentEl) {
      createPopper(targetEl, contentEl, {
        placement: option.placement,
        modifiers: modifiersArr,
      })
    }
  }

  const handleContentEvent = () => {
    const contentEl = contentRef.value

    if (!contentEl) return

    if (option.trigger === 'hover') {
      stopArr.push(
        useEventListener(contentEl, 'mouseenter', () => {
          clearTimer()
        }),
      )
      stopArr.push(
        useEventListener(contentEl, 'mouseleave', () => {
          clearTimer()
          timer = setTimeout(() => {
            close()
          }, option.delayClose || option.delay)
        }),
      )
    }

    if (option.trigger === 'click') {
      stopArr.push(
        useEventListener(contentEl, 'mouseup', e => {
          e.stopPropagation()
        }),
      )
      stopArr.push(
        useEventListener(contentEl, 'click', e => {
          e.stopPropagation()
        }),
      )
    }
  }

  const hasMounted = ref(visibility.value)

  // 处理visibility变化
  const update = () => {
    if (!visibility.value) return

    if (instance) {
      instance.update()
    } else {
      initPopper()
    }
  }
  const watchVisible = (val: boolean) => {
    if (!hasMounted.value) {
      hasMounted.value = true
      nextTick(() => {
        update()
        handleContentEvent()
      })
      if (val) {
        emitShow(val, instance)
        return
      }
    }
    if (val) {
      update()
      emitShow(val, instance)
      return
    }
    emitHide(val, instance)
  }
  watch(visibility, watchVisible)

  const detachEvent = () => {
    stopArr.forEach(v => {
      v()
    })
    stopArr = []
  }

  onMounted(() => {
    handleEvent()
    initPopper()
  })
  onUnmounted(() => {
    if (timer) clearTimeout(timer)
    detachPopper()
    detachEvent()
  })

  const getContentProps = () => ({
    ref: (el: Element | ComponentPublicInstance | null) => {
      contentRef.value = el as HTMLElement
    },
  })
  const getArrowProps = () => ({
    ref: (el: Element | ComponentPublicInstance | null) => {
      arrowRef.value = el as HTMLElement
    },
  })
  const getTargetProps = () => ({
    ref: (el: Element | ComponentPublicInstance | null) => {
      if (isRefType(target)) {
        target.value = el as HTMLElement
      }
    },
  })

  return {
    getContentProps,
    getArrowProps,
    getTargetProps,
    update,
    instance: instance as PopperInstance | null,
    initPopper,
    detachPopper,
    visibility,
    getArrowStyle,
    hasMounted,
    show,
    close,
  }
}
