export declare type ScrollbarType = 'horizontal' | 'vertical';
export declare type ScrollbarProps = {
    move: number;
    length: number;
    size: number;
    hide?: boolean;
    type: ScrollbarType;
};
export declare type ContainerSize = 'thick' | 'normal' | 'thin' | number;
export declare type ScrollContainerProps = {
    size?: ContainerSize;
    tag?: string;
    scrollTop?: number;
    scrollLeft?: number;
    autoHide?: boolean;
    hideVertical?: boolean;
    hideHorizontal?: boolean;
};
export declare type ScrollbarEmits = {
    change: [{
        offset: number;
        duration?: number;
    }];
};
export declare type ScrollContainerEmits = {
    'update:scrollTop': [top: number];
    'update:scrollLeft': [left: number];
};
