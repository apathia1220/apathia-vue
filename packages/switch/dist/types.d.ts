export interface SwitchProps {
    as: object | string;
    modelValue: string | number | boolean;
    trueValue: string | number | boolean;
    falseValue: string | number | boolean;
    inactiveText: string;
    activeText: string;
    disabled: boolean | undefined;
    size: string;
    loading: boolean;
}
export declare type SwitchEvent = 'update:modelValue' | 'change';
