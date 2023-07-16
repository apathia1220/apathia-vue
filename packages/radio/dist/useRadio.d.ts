import { Ref } from 'vue';
import type { SetupContext } from 'vue';
import type { RadioUserProps, RadioEmits } from './types';
export default function (userProps: RadioUserProps, emit: SetupContext<RadioEmits>['emit']): {
    isSelected: Ref<boolean>;
    handleChange: () => void;
};
