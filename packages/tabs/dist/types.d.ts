export declare type TabItem = string | number | {
    [k: string]: any;
};
export declare type TabsProps = {
    modelValue: string | number;
    list: Array<TabItem>;
    underline?: boolean;
    showLabel?: Function;
};
export declare type TabsEmits = {
    'update:modelValue': [tab: TabItem];
    navChange: [tab: TabItem];
};
