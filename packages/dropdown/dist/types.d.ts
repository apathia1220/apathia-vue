import { ComputedRef } from 'vue';
import { TriggerType, Placement } from '@apathia/apathia.popper';
export declare type DropdownInstance = {
    hideOnClick?: ComputedRef<boolean>;
};
export declare type DropdownProps = {
    delay?: number;
    disabled?: boolean;
    label?: string;
    trigger?: TriggerType;
    placement?: Placement;
    hideOnClick?: boolean;
};
export declare type DropdownEmits = {
    show: [value: boolean];
    hide: [value: boolean];
};
