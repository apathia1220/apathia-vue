import { ComponentPublicInstance, Ref } from 'vue';
import type { PopperProps, PopperEmitOption } from './types';
export declare function usePopper(option: PopperProps, emitOption: PopperEmitOption): {
    getContentProps: () => {
        ref: (el: Element | ComponentPublicInstance | null) => void;
    };
    getArrowProps: () => {
        ref: (el: Element | ComponentPublicInstance | null) => void;
    };
    getTargetProps: () => {
        ref: (el: Element | ComponentPublicInstance | null) => void;
    };
    update: () => void;
    instance: import("@popperjs/core").Instance | null;
    initPopper: () => void;
    detachPopper: () => void;
    visibility: Ref<boolean>;
    getArrowStyle: (color: string, bgc: string, borderc: string) => {
        arrowBase: string;
        content: string;
    };
    hasMounted: Ref<boolean>;
    show: () => void;
    close: () => void;
};
