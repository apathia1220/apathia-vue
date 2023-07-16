import { ComputedRef } from 'vue'
import { TriggerType, Placement } from '@apathia/apathia.popper'

export type DropdownInstance = {
  hideOnClick?: ComputedRef<boolean>
}

export type DropdownProps = {
  delay?: number
  disabled?: boolean
  label?: string
  trigger?: TriggerType
  placement?: Placement
  hideOnClick?: boolean
}

export type DropdownEmits = {
  show: [value: boolean]
  hide: [value: boolean]
}
