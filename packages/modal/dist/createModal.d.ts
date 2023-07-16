import { SetupContext, Ref } from 'vue';
import type { ModalProps, ModalEmits } from './types';
export declare function createModal(props: ModalProps, emit: SetupContext<ModalEmits>['emit'], slots: SetupContext['slots']): {
    shadeRef: Ref<HTMLElement | null>;
    modalRef: Ref<HTMLElement | null>;
    widthStyle: string;
    close: () => void;
    isTemplate: boolean;
};
