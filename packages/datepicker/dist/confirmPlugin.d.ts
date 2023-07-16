import flatpickr from 'flatpickr';
import type { PluginConfig } from './types';
declare function confirmDatePlugin(pluginConfig: PluginConfig): (fp: flatpickr.Instance) => {
    onChange?: ((_: any, dateStr: string) => true | void) | undefined;
    onKeyDown(_: any, __: any, ___: any, e: KeyboardEvent): void;
    onReady(): void;
};
export default confirmDatePlugin;
