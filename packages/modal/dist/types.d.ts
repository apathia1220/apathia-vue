import type { RenderCustom } from '@apathia/apathia.custom-render';
export declare type ModalProps = {
    modelValue?: boolean;
    title?: string;
    subTitle?: string;
    render?: RenderCustom;
    renderHeader?: RenderCustom;
    top?: number | string;
    width?: number | string;
    showClose?: boolean;
    maskClosable?: boolean;
    keyboard?: boolean;
    beforeClose?: () => boolean;
    onClose?: () => void;
};
export declare type ModalListItemProps = {
    props: ModalProps;
    id: string;
};
export declare type ModalEmits = {
    'update:modelValue': [value: boolean];
    close: [];
};
export declare type ModalInstance = {
    props: ModalProps;
    close: () => void;
};
