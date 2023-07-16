import { App, inject } from 'vue'
import Alert from './AlertFn'
import type { Alerter } from './types'

const alertKey = 'apathia-toast'

export function toastInstall(app: App, injectKey: string) {
  app.provide(injectKey || alertKey, Alert)
  app.config.globalProperties.$toast = Alert
}

export function useToast(key?: string): Alerter {
  return inject(key || alertKey)!
}
