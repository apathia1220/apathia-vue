import { SetupContext, Ref, WritableComputedRef, ComputedRef } from 'vue';
import type { Column, DataItem, TableEmits } from './types';
export interface TableMultiSelectedHelper {
    selectedMap: WritableComputedRef<Record<string, boolean>>;
    allSelected: WritableComputedRef<boolean>;
    indeterminate: ComputedRef<boolean>;
    toggleItem: (i: DataItem) => void;
    toggleAllSelected: () => void;
    shiftToggle: (range: DataItem[]) => void;
}
export declare function useTableSelected(data: Readonly<Ref<DataItem[]>>, selectedKeys: Ref<Array<number | string>>, selected: Ref<DataItem[]>, key: Ref<string>, columns: Ref<Column[]>, emit: SetupContext<TableEmits>['emit']): TableMultiSelectedHelper;
