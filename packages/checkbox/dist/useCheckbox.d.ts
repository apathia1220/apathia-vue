import { ComputedRef } from 'vue';
import type { SetupContext } from 'vue';
import type { CheckboxEmit, CheckboxUserProps } from './types';
export default function useCheckbox(userProps: CheckboxUserProps, emit: SetupContext<CheckboxEmit>['emit']): {
    isChecked: ComputedRef<boolean>;
    handleChange: () => void;
};
