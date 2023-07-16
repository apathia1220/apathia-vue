import type { InjectionKey } from 'vue';
import type { SelectValueType, SelectState, OptionRegister, OptionRemover } from './types';
export declare const RegisterKey: InjectionKey<OptionRegister>;
export declare const UpdateRegisterKey: InjectionKey<OptionRegister>;
export declare const UnregisterKey: InjectionKey<OptionRemover>;
export declare const SelectStateKey: InjectionKey<Partial<SelectState>>;
export declare const ChangeHandlerKey: InjectionKey<(value: SelectValueType, label: string, isInnerChange?: boolean) => void>;
export declare const FocusKey: InjectionKey<(uid: number, el?: HTMLElement) => void>;
export declare const SameValueCompareKey: InjectionKey<(newValue: SelectValueType, oldValue: SelectValueType) => boolean>;
