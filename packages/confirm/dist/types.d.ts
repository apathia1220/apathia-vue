import type { RenderCustom } from '@apathia/apathia.custom-render';
export declare type ConfirmProps = {
    render: string | RenderCustom;
    renderFooter?: RenderCustom<{
        confirm?: (...args: any) => any;
        cancel?: (...args: any) => any;
    }>;
    confirmText?: string;
    cancelText?: string;
    btnPosition?: 'left' | 'right' | 'center';
};
