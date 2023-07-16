import { CSSProperties } from 'vue';
export declare type InputProps = {
    type?: string;
    modelValue?: string | number;
    inputClass?: string | object;
    search?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    maxWords?: number;
};
export declare type InputEmits = {
    'update:modelValue': [value: string];
    input: [e: Event];
    search: [value: string | number];
};
export declare type InputAttrs = {
    style: CSSProperties;
};
