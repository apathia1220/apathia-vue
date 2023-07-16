import type { Ref } from 'vue';
export declare type RadioProp = {
    value: number | string | boolean;
    modelValue: string | number | boolean;
    disabled?: boolean;
};
export declare type GroupData = {
    value: string | number | boolean;
    disabled: boolean;
};
export declare type RadioGroupProps = {
    modelValue: string | number | boolean;
    disabled?: boolean;
};
export declare type RadioEmits = {
    'update:modelValue': [value: string | number | boolean];
    change: [value: string | number | boolean];
};
export declare type RadioGroupEmits = {
    'update:modelValue': [value: string | number | boolean];
    change: [value: string | number | boolean];
};
export declare type RadioUserProps = {
    disabled: Ref<boolean>;
    modelValue: Ref<string | number | boolean>;
    value: Ref<string | number | boolean>;
    groupState: Ref<GroupData> | null;
    changeHandler: (val: string | number | boolean) => void;
    inputEl: Ref<HTMLInputElement | null>;
};
