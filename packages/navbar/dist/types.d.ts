export declare type NavNode = {
    value: string | number;
    label: string;
    disabled?: boolean;
    iconClass?: string;
    children?: NavNode[];
};
export declare type ThemeType = 'underline' | 'default';
export declare type NavbarProps = {
    type?: ThemeType;
    modelValue?: string | number;
    list: NavNode[];
    trigger?: string;
    disabledParent?: boolean;
};
export declare type NavbarEmits = {
    'update:modelValue': [value: NavNode['value']];
    change: [navNode: NavNode];
};
