export declare type PaginationConfig = {
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
    [x: string]: any;
};
export declare type PaginationProps = {
    options: PaginationConfig;
};
export declare type PaginationEmits = {
    'page-change': [pageNumber: number, totalPages: number];
};
export declare type PageItem = {
    number: number;
    text: string | number;
};
export declare type PaginationEvent = 'page-change';
