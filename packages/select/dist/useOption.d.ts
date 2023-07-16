import type { Ref, ComputedRef } from 'vue';
import type { SelectValueType, SelectState, OptionRegister, OptionRemover } from './types';
export declare function useOption(userProps: {
    value: Ref<number | string | boolean>;
    disabled: Ref<boolean>;
    register: OptionRegister;
    unregister: OptionRemover;
    updateRegister: OptionRegister;
    selectState: SelectState;
    changeHandler: (value: SelectValueType, label: string, isInnerChange?: boolean) => void;
    isSameValue: (newVal: SelectValueType, oldVal: SelectValueType) => boolean;
    focus: (uid: number, focusedEl?: HTMLElement) => void;
    compoId: number;
}): {
    isSelected: Ref<boolean>;
    isHidden: Ref<boolean>;
    isFocused: ComputedRef<boolean>;
    getRootProps: () => Record<string, unknown>;
};
