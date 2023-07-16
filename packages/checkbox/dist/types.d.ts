import type { Ref } from 'vue';
export declare type CheckboxProps = {
    disabled: boolean;
    modelValue: string | number | boolean | Array<unknown>;
    trueValue: string | number | boolean;
    falseValue: string | number | boolean;
    value: string | number | undefined;
    indeterminate: boolean;
};
export declare type CheckboxEmit = {
    'update:modelValue': [value: any];
    change: [value: any];
};
export interface CheckboxUserProps {
    disabled: Ref<boolean>;
    modelValue: Ref<string | number | boolean | Array<unknown>>;
    trueValue: Ref<string | number | boolean>;
    falseValue: Ref<string | number | boolean>;
    value: Ref<string | number | undefined>;
    inputEl: Ref<HTMLInputElement | null>;
}
