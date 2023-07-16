import type { ComponentPublicInstance, ComputedRef, Ref, SetupContext } from 'vue';
import type { PaginationConfig, PaginationEmits } from './types';
export declare function usePagination(props: {
    options: ComputedRef<PaginationConfig>;
}, emit: SetupContext<PaginationEmits>['emit']): {
    jumpTo: Ref<string>;
    pages: Ref<{
        number: number;
        text: string | number;
    }[]>;
    totalPages: ComputedRef<number>;
    totalItems: ComputedRef<number>;
    selectPage: (newPage: string | number) => void;
    setPageBtnRef: (el: Element | ComponentPublicInstance | null) => void;
    innerOptions: import("vue").ShallowReactive<{
        [x: string]: any;
        currentPage: number;
        totalItems: number;
        pageSize: number;
        totalPages: number;
        maxLength: number;
        keepMiddle: boolean;
        directionBtns: boolean;
        previousText: string;
        nextText: string;
        boundaryBtns: boolean;
        firstText: string;
        lastText: string;
        totalCount: boolean;
        jumpPage: boolean;
    }>;
};
