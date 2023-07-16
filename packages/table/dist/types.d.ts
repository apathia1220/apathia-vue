import type { CSSProperties, Ref } from 'vue';
import type { RenderCustom, RenderFn } from '@apathia/apathia.custom-render';
export declare type DataItem = Record<string, unknown> & {
    [rowKey: string]: string | number;
};
export declare type Button = {
    text: string;
    className?: string;
    onClick: (arg: {
        row?: DataItem;
        rowIndex?: number;
        colIndex?: number;
    }) => void;
};
export declare type FilterOptions = {
    enabled: boolean;
    styleClass: string;
    placeholder?: string;
    filterValue: '';
    filterDownItems: Array<{
        label: string;
        value: string | number;
    }>;
    filterFn: (data: DataItem, filterString: string) => boolean;
};
interface BaseColumn {
    title: RenderCustom;
    width?: number | string;
    align?: 'left' | 'right' | 'center';
    className?: string;
    colSpan?: number;
    filterOptions?: FilterOptions;
    fixed?: 'left' | 'right';
    when?: () => boolean;
    type?: 'index' | 'expand' | 'selection';
    sortable?: boolean;
    prop?: string;
    field?: string;
    disabledWhen?: (arg: {
        rowIndex: number;
        row: DataItem;
    }) => boolean;
    render?: RenderFn<{
        row?: DataItem;
        colIndex?: number;
        rowIndex?: number;
    }>;
    buttons?: (arg: {
        row?: DataItem;
        rowIndex?: number;
        colIndex?: number;
    }) => Button[];
}
interface SortColumn extends BaseColumn {
    sortable: true;
    prop: string;
}
interface IndexColumn extends BaseColumn {
    type: 'index';
}
interface ExpandColumn extends BaseColumn {
    type: 'expand';
}
interface SelectionColumn extends BaseColumn {
    type: 'selection';
    disabledWhen?: (arg: {
        rowIndex: number;
        row: DataItem;
    }) => boolean;
}
interface FieldColumn extends BaseColumn {
    field: string;
}
interface RenderColumn extends BaseColumn {
    render: RenderFn<{
        row?: DataItem;
        colIndex?: number;
        rowIndex?: number;
    }>;
}
interface ButtonColumn extends BaseColumn {
    buttons: (arg: {
        row?: DataItem;
        rowIndex?: number;
        colIndex?: number;
    }) => Button[];
}
export declare type Column = FieldColumn | ButtonColumn | RenderColumn | ButtonColumn | SelectionColumn | IndexColumn | SortColumn | ExpandColumn;
export declare type HeaderClassNamesGenerator = () => string;
export declare type HeaderStylesGenerator = () => string | CSSProperties | undefined;
export declare type ClassNamesGenerator<T> = {
    (p: T): string;
};
export declare type StylesGenerator<T> = {
    (p: T): string | CSSProperties | undefined;
};
export declare type Order = 'asc' | 'desc';
export declare type Sorter = {
    order: Order;
    prop: string;
};
export declare type Expander = {
    rowExpandable: (p: {
        row: DataItem;
        rowIndex: number;
    }) => boolean;
    expandRowRender: RenderFn<{
        row?: DataItem;
        rowIndex?: number;
    }>;
};
export interface GoPager {
    num: number;
    size: number;
    total: number;
}
export interface LegacyPager {
    current_page: number;
    page_size: number;
    total_items: number;
}
export declare type ResponsePager = GoPager | LegacyPager;
export interface PaginationItem {
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
}
export declare type TableProps = {
    data: DataItem[];
    columns: Column[];
    stripe?: boolean;
    border?: boolean;
    headerRowClassName?: HeaderClassNamesGenerator;
    headerRowStyle?: HeaderStylesGenerator;
    headerCellClassName?: ClassNamesGenerator<{
        colIndex: number;
    }>;
    headerCellStyle?: StylesGenerator<{
        colIndex: number;
    }>;
    rowClassName?: ClassNamesGenerator<{
        row: DataItem;
        rowIndex: number;
    }>;
    rowStyle?: StylesGenerator<{
        row: DataItem;
        rowIndex: number;
    }>;
    cellClassName: ClassNamesGenerator<{
        row: DataItem;
        col: Column;
        colIndex: number;
        rowIndex: number;
    }>;
    cellStyle: (c: {
        row: DataItem;
        col: Column;
        rowIndex: number;
        colIndex: number;
    }) => [number, number];
    cellSpan: (c: {
        row: DataItem;
        col: Column;
        rowIndex: number;
        colIndex: number;
    }) => [number, number];
    height?: number;
    showHeader?: boolean;
    showData?: boolean;
    rowKey: string;
    highlightCurrentRow?: boolean;
    current?: string | number;
    currentSelected: DataItem | null;
    selected: DataItem[];
    selectedKeys: Array<string | number>;
    sort: Partial<Sorter>;
    expand: Partial<Expander>;
    loading?: boolean;
    scroll: Partial<{
        width: number;
        height: number;
    }>;
};
export declare type TableEmits = {
    'update:selected': [selectedItems: DataItem[]];
    'update:selectedKeys': [selectedKeys: Array<string | number>];
    'update:current': [current: DataItem['rowKey']];
    'update:currentSelected': [data: DataItem];
    'sort-change': [sorter: Sorter];
};
export declare type SortProps = {
    sort: Partial<Sorter>;
    prop: string;
};
export declare type SortEmits = {
    'sort-change': [sorter: Sorter];
};
export declare type TableHeaderProps = {
    columns: Column[];
    border: boolean;
    headerRowClassName?: HeaderClassNamesGenerator;
    headerRowStyle?: HeaderStylesGenerator;
    headerCellClassName?: ClassNamesGenerator<{
        colIndex: number;
    }>;
    headerCellStyle?: StylesGenerator<{
        colIndex: number;
    }>;
    sort: Partial<Sorter>;
    fixedHeader?: boolean;
};
export declare type TableHeaderEmits = {
    'sort-change': [sorter: Sorter];
    'check-all-change': [];
};
export declare type TableRowProps = {
    columns: Column[];
    row: DataItem;
    border: boolean;
    stripe?: boolean;
    rowClassName?: ClassNamesGenerator<{
        row: DataItem;
        rowIndex: number;
    }>;
    rowStyle?: StylesGenerator<{
        row: DataItem;
        rowIndex: number;
    }>;
    cellClassName?: ClassNamesGenerator<{
        row: DataItem;
        col: Column;
        colIndex: number;
        rowIndex: number;
    }>;
    cellStyle?: StylesGenerator<{
        row: DataItem;
        col: Column;
        colIndex: number;
        rowIndex: number;
    }>;
    cellSpan: (c: {
        row: DataItem;
        col: Column;
        rowIndex: number;
        colIndex: number;
    }) => [number, number];
    highlightCurrentRow?: boolean;
    rowKey: string;
    rowIndex: number;
    currentActiveRow: number;
    expand: Partial<Expander>;
};
export declare type TableRowEmits = {
    'row-click': [e: Event, rowIndex: number, row: DataItem];
};
export declare type TableBodyProps = {
    columns: Column[];
    data: DataItem[];
    current: string | number;
    highlightCurrentRow: boolean;
    rowKey: string;
};
export declare type TableBodyEmits = {
    'current-change': [item: DataItem];
};
export declare type RealColumns = {
    realColumns: Ref<Column[]>;
    containerRef: Ref<HTMLElement | null>;
};
export {};
