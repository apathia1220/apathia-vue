import { App } from 'vue';
import type { Alerter } from './types';
export declare function toastInstall(app: App, injectKey: string): void;
export declare function useToast(key?: string): Alerter;
