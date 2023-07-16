import { Instance } from '@popperjs/core'
import type { RenderCustom } from '@apathia/apathia.custom-render'
import { ComponentPublicInstance, Ref } from 'vue'

export type TriggerType = 'click' | 'hover' | 'focus' | 'manual'

export const placement = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const

export type Placement = (typeof placement)[number]

export type PopperInstance = Instance

export type RefType = Ref<HTMLElement | null>

export type ElementType = RefType | ComponentPublicInstance | HTMLElement

export type PopperProps = {
  distance: number
  skidding: number
  trigger: TriggerType
  dark: boolean
  placement: Placement
  content?: string | number
  transitionClass: object
  showArrow: boolean
  delay: number
  disabled: boolean
  component?: ComponentPublicInstance
  modelValue?: boolean
  popperClass: string
  appendToBody: boolean
  render?: RenderCustom
  target?: HTMLElement
  delayClose?: number
}

export type PopperListProps = {
  props: PopperProps
  id: string
}

export type PopperEmits = {
  'update:modelValue': [boolean]
  hide: [val: boolean, instance: PopperInstance | null]
  show: [val: boolean, instance: PopperInstance | null]
  afterHide: []
}

export type PopperExpose = {
  update: () => void
}

export type PopperEmitOption = {
  emitVisible: (val: boolean) => void
  emitHide: (val: boolean, instance: PopperInstance | null) => void
  emitShow: (val: boolean, instance: PopperInstance | null) => void
}
