import flatpickr from 'flatpickr';
import type { RangeConfig, RangeChange } from './types';
export default function (range: RangeConfig, change: RangeChange): (fp: flatpickr.Instance) => {
    readonly onKeyDown: () => void;
    readonly onReady: () => void;
};
