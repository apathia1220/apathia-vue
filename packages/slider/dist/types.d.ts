import { StyleValue } from 'vue';
export declare type Marker = Record<number, Partial<{
    label: string;
    style: StyleValue;
}>>;
export declare type SliderProps = {
    modelValue: number;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    showSteps?: boolean;
    showTooltip?: boolean;
    formatTooltip?: Function;
    range?: boolean;
    valueRange?: number[];
    marks?: Marker;
    vertical?: boolean;
    height?: number;
};
export declare type StopProps = {
    step: number;
    min: number;
    max: number;
    vertical?: boolean;
    marks: Marker;
};
export declare type SliderEmits = {
    'update:modelValue': [value: number];
};
