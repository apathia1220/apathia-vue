import flatpickr from 'flatpickr';
export declare type DateFormatType = 'Y-m' | 'Y-m-d' | 'Y-m-d H:i' | 'Y-m-d H:i:S' | 'Y-m-d H:i:s' | 'Y-m-d h:i:s';
export declare type RangeItem = [string | number, string | number];
export declare type RangeConfig = {
    [key: string]: RangeItem;
};
export declare type RangeChange = (v: RangeItem) => void;
export declare type GroupProps = {
    startTime: string | number;
    endTime: string | number;
    dateFormat?: DateFormatType;
    timestamp?: boolean;
    disabled?: boolean;
    startDateOptions?: flatpickr.Options.Options;
    endDateOptions?: flatpickr.Options.Options;
    range?: RangeConfig;
};
export declare type DateProps = {
    options?: flatpickr.Options.Options;
    modelValue: string | number;
    dateFormat?: DateFormatType;
    timestamp?: boolean;
    range?: RangeConfig;
};
export declare type DateEmits = {
    'update:modelValue': [modelValue: string | number];
    change: [{
        dateStr: string;
        value: string | number;
    }];
    rangeChange: [v: RangeItem];
};
export declare type GroupEmits = {
    'update:startTime': [value: string | number];
    'update:endTime': [value: string | number];
};
export declare type PluginConfig = {
    clearIcon?: string;
    confirmIcon?: string;
    confirmText?: string;
    clearText?: string;
    showAlways?: boolean;
    theme?: string;
};
