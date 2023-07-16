import { CSSProperties } from 'vue'

export type IconProps = {
  readonly color?: Pick<CSSProperties, 'color'>
  readonly size?: number | string
}
