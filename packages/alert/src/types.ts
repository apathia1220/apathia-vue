import type { RenderFn } from '@apathia/apathia.custom-render'

export type AlertType = 'info' | 'warning' | 'danger' | 'success' | 'default'

const AlertTypeList = ['info', 'warning', 'danger', 'success', 'default'] as const

export type AlertProps = {
  type?: AlertType
  duration?: number
  title?: string
  message?: string
  showIcon?: boolean
  showClose?: boolean
  render?: RenderFn<{ close?: (...args: any) => any }>
}

export type AlertEmit = {
  close: []
}

export type AlertListProps = {
  props: AlertProps
  id: string
}

type BaseAlerter = {
  (props: AlertProps): void
  closeAll: () => void
}

export type Alerter = {
  [K in typeof AlertTypeList[number]]: (
    title: string,
    message?: string,
    props?: Omit<AlertProps, 'type' | 'title' | 'message'>,
  ) => void
} & BaseAlerter