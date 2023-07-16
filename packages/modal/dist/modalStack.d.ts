import type { ModalInstance } from './types';
export declare const modalStack: ModalInstance[];
export declare function popModalStack(): void;
export declare function tryCloseLastModal(isEsc?: boolean): void;
export declare function pushModal(modal: ModalInstance): void;
