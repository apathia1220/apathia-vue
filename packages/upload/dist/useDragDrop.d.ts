import { ComputedRef, Ref } from 'vue';
import { MaybeRef } from '@apathia/apathia.shared';
export declare function useDragDrop(el: MaybeRef<HTMLElement | null>, disabled: Ref<boolean> | ComputedRef<boolean>, processFiles: (files?: FileList) => void): {
    dragging: Ref<boolean>;
};
