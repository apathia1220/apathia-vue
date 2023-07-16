export declare type Key = string | number;
export declare type TransferDataItem = {
    value: Key;
    label: string;
    disabled: boolean;
};
export declare type TargetOrder = 'original' | 'push' | 'unshift';
export declare type Props = {
    value: string;
    label: string;
    disabled: string;
};
export declare type Checked = Key[];
export declare type CheckedMap = Record<Key, boolean>;
export declare type TransferProps = {
    modelValue: Key[];
    data: Array<Record<string, string | boolean | number>>;
    filterable?: boolean;
    filterPlaceholder?: string;
    filterMethod?: (word: string, option: TransferDataItem) => boolean;
    targetOrder?: TargetOrder;
    titles?: [string, string];
    propKeys: Props;
    leftDefaultChecked?: Key[];
    rightDefaultChecked?: Key[];
};
export declare type TransferEmits = {
    'update:modelValue': [keys: Key[]];
    select: [keys: Key[]];
    remove: [keys: Key[]];
};
export declare type PanelProps = {
    modelValue: Key[];
    data: TransferDataItem[];
    filterable?: boolean;
    filterPlaceholder?: string;
    defaultChecked?: Key[];
    filterMethod?: (w: string, option: TransferDataItem) => boolean;
    title: string;
};
export declare type PanelEmits = {
    'update:modelValue': [keys: Key[]];
};
