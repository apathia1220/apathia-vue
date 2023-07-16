declare module '*.vue' {
  import { ComponentOptions } from 'vue'

  const component: ComponentOptions
  export default component
}

declare module '@'

declare type Timeout = ReturnType<typeof setTimeout>
declare type Interval = ReturnType<typeof setInterval>

declare type Props<T> = T extends new () => { $props: infer P } ? P : never
