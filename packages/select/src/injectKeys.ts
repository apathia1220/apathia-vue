import type { InjectionKey } from 'vue'
import type {
  SelectValueType,
  SelectState,
  OptionRegister,
  OptionRemover,
} from './types'

export const RegisterKey: InjectionKey<OptionRegister> = Symbol('register')

export const UpdateRegisterKey: InjectionKey<OptionRegister> =
  Symbol('updateRegister')

export const UnregisterKey: InjectionKey<OptionRemover> = Symbol('unregister')

export const SelectStateKey: InjectionKey<Partial<SelectState>> =
  Symbol('selectState')

export const ChangeHandlerKey: InjectionKey<
  (value: SelectValueType, label: string, isInnerChange?: boolean) => void
> = Symbol('changeHandler')

export const FocusKey: InjectionKey<(uid: number, el?: HTMLElement) => void> =
  Symbol('focus')

export const SameValueCompareKey: InjectionKey<
  (newValue: SelectValueType, oldValue: SelectValueType) => boolean
> = Symbol('sameValueCompare')
