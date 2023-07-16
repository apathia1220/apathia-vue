import type { Column, RealColumns } from './types';
export declare function useTableColumns(props: {
    columns: Column[];
    [x: string]: unknown;
}): RealColumns;
