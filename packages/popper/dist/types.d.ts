import { Instance } from '@popperjs/core';
import type { RenderCustom } from '@apathia/apathia.custom-render';
import { ComponentPublicInstance, Ref } from 'vue';
export declare type TriggerType = 'click' | 'hover' | 'focus' | 'manual';
export declare const placement: readonly ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"];
export declare type Placement = (typeof placement)[number];
export declare type PopperInstance = Instance;
export declare type RefType = Ref<HTMLElement | null>;
export declare type ElementType = RefType | ComponentPublicInstance | HTMLElement;
export declare type PopperProps = {
    distance: number;
    skidding: number;
    trigger: TriggerType;
    dark: boolean;
    placement: Placement;
    content?: string | number;
    transitionClass: object;
    showArrow: boolean;
    delay: number;
    disabled: boolean;
    component?: ComponentPublicInstance;
    modelValue?: boolean;
    popperClass: string;
    appendToBody: boolean;
    render?: RenderCustom;
    target?: HTMLElement;
    delayClose?: number;
};
export declare type PopperListProps = {
    props: PopperProps;
    id: string;
};
export declare type PopperEmits = {
    'update:modelValue': [boolean];
    hide: [val: boolean, instance: PopperInstance | null];
    show: [val: boolean, instance: PopperInstance | null];
    afterHide: [];
};
export declare type PopperExpose = {
    update: () => void;
};
export declare type PopperEmitOption = {
    emitVisible: (val: boolean) => void;
    emitHide: (val: boolean, instance: PopperInstance | null) => void;
    emitShow: (val: boolean, instance: PopperInstance | null) => void;
};
