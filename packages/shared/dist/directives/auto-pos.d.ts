import type { DirectiveBinding } from 'vue';
declare type El = HTMLElement & {
    __parent?: Element;
    __reCompute?: () => any;
};
declare const _default: {
    beforeMount(el: HTMLElement): void;
    mounted(el: El, binding: DirectiveBinding): void;
    updated(el: El, binding: DirectiveBinding): void;
    unmounted(el: El): void;
};
export default _default;
