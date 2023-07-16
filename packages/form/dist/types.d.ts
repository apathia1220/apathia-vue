export declare type FormPosition = 'left' | 'right' | 'top';
export declare type FormAlign = 'top' | 'center' | 'bottom';
export declare type FormProps = {
    disabled?: boolean;
    inline?: boolean;
    labelWidth?: string | number;
    labelPosition?: FormPosition;
    labelAlign?: FormAlign;
};
export declare type FormItemProps = {
    prop: string;
    labelAlign: FormAlign;
    labelPosition: FormPosition;
    label: string;
    required: boolean;
    offset: boolean;
    labelWidth: number | string;
    inline: boolean;
    contentClass: string;
};
