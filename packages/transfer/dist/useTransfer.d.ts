import type { ComputedRef, SetupContext } from 'vue';
import type { TransferDataItem, Key } from './types';
import type { TransferProps, TransferEmits } from './types';
declare const _default: (userProps: Readonly<ComputedRef<TransferProps>>, emit: SetupContext<TransferEmits>['emit']) => {
    selectedSource: import("vue").Ref<Key[]>;
    selectedTarget: import("vue").Ref<Key[]>;
    processedData: ComputedRef<{
        value: Key;
        label: string;
        disabled: boolean;
    }[]>;
    valueMap: ComputedRef<Record<string, TransferDataItem>>;
    source: ComputedRef<{
        value: Key;
        label: string;
        disabled: boolean;
    }[]>;
    target: ComputedRef<TransferDataItem[]>;
    resolve: (oldValue: Key[], addValue: Key[]) => Key[];
    addAll: () => void;
    removeAll: () => void;
    addSelected: () => void;
    removeSelected: () => void;
};
export default _default;
