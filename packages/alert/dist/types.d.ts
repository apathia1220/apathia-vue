import type { RenderFn } from '@apathia/apathia.custom-render';
export declare type AlertType = 'info' | 'warning' | 'danger' | 'success' | 'default';
declare const AlertTypeList: readonly ["info", "warning", "danger", "success", "default"];
export declare type AlertProps = {
    type?: AlertType;
    duration?: number;
    title?: string;
    message?: string;
    showIcon?: boolean;
    showClose?: boolean;
    render?: RenderFn<{
        close?: (...args: any) => any;
    }>;
};
export declare type AlertEmit = {
    close: [];
};
export declare type AlertListProps = {
    props: AlertProps;
    id: string;
};
declare type BaseAlerter = {
    (props: AlertProps): void;
    closeAll: () => void;
};
export declare type Alerter = {
    [K in typeof AlertTypeList[number]]: (title: string, message?: string, props?: Omit<AlertProps, 'type' | 'title' | 'message'>) => void;
} & BaseAlerter;
export {};
