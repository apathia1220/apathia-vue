import * as icons from './components';
import type { App } from 'vue';
export interface InstallOptions {
    prefix?: string;
}
declare const _default: (app: App, { prefix }?: InstallOptions) => void;
export default _default;
export { icons };
