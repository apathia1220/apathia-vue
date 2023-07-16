import type { Column, ResponsePager } from './types';
export declare function createTable<T>(cols: Column[], shallowData?: boolean): readonly [import("vue").ComputedRef<{
    data: T[];
    loading: boolean;
    columns: Column[];
    pagination: {
        currentPage: number;
        totalItems: number;
        pageSize: number;
        totalPages: number;
        maxLength: number;
        keepMiddle: boolean;
        directionBtns: boolean;
        previousText: string;
        nextText: string;
        firstText: string;
        lastText: string;
        totalCount: boolean;
        boundaryBtns: boolean;
        totalTemplate: (total: number) => string;
        jumpPage: boolean;
    };
    showPagination: boolean;
    showData: boolean;
    showHeader: boolean;
}>, {
    setColumns: (value: Column[]) => void;
    getColmns: () => Column[];
    setData: (newData: T[] | {
        (): Promise<T[]>;
    }) => void;
    getData: () => T[];
    getPagination: () => {
        currentPage: number;
        totalItems: number;
        pageSize: number;
        totalPages: number;
        maxLength: number;
        keepMiddle: boolean;
        directionBtns: boolean;
        previousText: string;
        nextText: string;
        firstText: string;
        lastText: string;
        totalCount: boolean;
        boundaryBtns: boolean;
        totalTemplate: (total: number) => string;
        jumpPage: boolean;
    };
    setPagination: (pager: {
        num: number;
        size: number;
        total: number;
    }) => void;
    updatePager: (pager?: ResponsePager) => void;
    getCurrentPage: () => number;
    triggerPagination: (value: boolean) => void;
    triggerData: (value: boolean) => void;
    triggerHeader: (value: boolean) => void;
}];
