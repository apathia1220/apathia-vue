import type { SetupContext, Ref } from 'vue';
declare type ButtonUserProps = {
    disabled: Ref<boolean>;
};
export default function useButton(userProps: ButtonUserProps, attrs: SetupContext['attrs']): {
    getButtonProps: () => {
        disabled: boolean;
        onclick: Function;
        ondblclick: Function;
        onmousedown: Function;
        onmouseup: Function;
    };
};
export {};
