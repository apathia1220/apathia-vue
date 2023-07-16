(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind"), require("@apathia/apathia.shared")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.hooks", "@apathia/apathia.twind", "@apathia/apathia.shared"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.button = {}, global.Vue, global.hooks, global.twind, global.shared));
})(this, function(exports2, vue, apathia_hooks, apathia_twind, apathia_shared) {
  "use strict";
  function useButton(userProps, attrs) {
    const { disabled } = userProps;
    const { onclick = apathia_shared.noop, ondblclick = apathia_shared.noop, onmousedown = apathia_shared.noop, onmouseup = apathia_shared.noop } = attrs;
    const getButtonProps = () => ({
      disabled: !!disabled.value,
      onclick: !disabled.value && apathia_shared.isFunction(onclick) ? onclick : apathia_shared.noop,
      ondblclick: !disabled.value && apathia_shared.isFunction(ondblclick) ? ondblclick : apathia_shared.noop,
      onmousedown: !disabled.value && apathia_shared.isFunction(onmousedown) ? onmousedown : apathia_shared.noop,
      onmouseup: !disabled.value && apathia_shared.isFunction(onmouseup) ? onmouseup : apathia_shared.noop
    });
    return {
      getButtonProps
    };
  }
  const _sfc_main = vue.defineComponent({
    ...{
      name: "BaseButton"
    },
    __name: "Button",
    props: {
      tag: {},
      href: { type: Boolean },
      primary: { type: Boolean, default: false },
      success: { type: Boolean, default: false },
      danger: { type: Boolean, default: false },
      info: { type: Boolean, default: false },
      warning: { type: Boolean, default: false },
      pink: { type: Boolean, default: false },
      active: { type: Boolean, default: false },
      plain: { type: Boolean, default: false },
      large: { type: Boolean, default: false },
      small: { type: Boolean, default: false },
      hollow: { type: Boolean, default: false },
      round: { type: Boolean, default: false },
      disabled: { type: Boolean, default: void 0 }
    },
    setup(__props) {
      const props = __props;
      const attrs = vue.useAttrs();
      const { tag, href, disabled } = vue.toRefs(props);
      const disableButton = apathia_hooks.useInjectProp(
        "FormDisabled",
        false,
        disabled
      );
      const tagType = vue.computed(() => {
        if (href && href.value) {
          return "a";
        }
        return tag && tag.value ? tag.value : "button";
      });
      const userProps = { disabled: disableButton };
      const { getButtonProps } = useButton(userProps, attrs);
      const btnClass = vue.computed(() => {
        const themeString = props.primary && "primary" || props.pink && "pink" || props.success && "success" || props.danger && "danger" || props.info && "info" || props.warning && "warning" || "primary";
        return [
          styles.themeStyles.base,
          styles.themeStyles[themeString],
          props.small ? styles.size.small : "",
          props.large ? styles.size.large : "",
          props.hollow ? `${styles.hollow.base} ${styles.hollow[themeString]}` : "",
          props.plain ? styles.plain[themeString] : "",
          props.active ? styles.active[themeString] : "",
          props.disabled ? `${styles.disabled.base} ${styles.disabled[themeString]}` : "",
          props.round ? styles.size.round : ""
        ];
      });
      const getButtonStyles = () => {
        const themeStyles = {
          base: apathia_twind.style`inline-block border-0 no-underline rounded-md py-btn-md-y px-2 transition focus:outline-none duration-500 ease select-none text-base mr-2 whitespace-nowrap text-base text-center ${apathia_twind.css`
      min-width: 3.75rem;
    `}`,
          primary: apathia_twind.style`bg-brand-primary text-content-white hover:bg-brand-hover active:bg-brand-active`,
          pink: apathia_twind.style`bg-pink-primary text-content-white hover:bg-pink-hover active:bg-pink-active`,
          success: apathia_twind.style`bg-success-primary text-content-white hover:bg-success-hover active:bg-success-active`,
          danger: apathia_twind.style`bg-error-primary text-content-white hover:bg-error-hover active:bg-error-active`,
          warning: apathia_twind.style`bg-warning-primary text-content-white hover:bg-warning-hover active:bg-warning-active`,
          info: apathia_twind.style`bg-info-primary text-content-accent hover:bg-info-hover active:bg-info-active`
        };
        const activeStyles = {
          primary: apathia_twind.style`bg-brand-active`,
          pink: apathia_twind.style`bg-pink-active`,
          success: apathia_twind.style`bg-success-active`,
          danger: apathia_twind.style`bg-error-active`,
          warning: apathia_twind.style`bg-warning-active`,
          info: apathia_twind.style`bg-fill-neutral`,
          secondary: apathia_twind.style`border-brand-active text-brand-active`
        };
        const disableStyles = {
          base: apathia_twind.style`cursor-not-allowed`,
          primary: apathia_twind.style`bg-brand-forbid`,
          pink: apathia_twind.style`bg-pink-forbid`,
          success: apathia_twind.style`bg-success-forbid`,
          danger: apathia_twind.style`bg-error-forbid`,
          warning: apathia_twind.style`bg-warning-forbid`,
          info: apathia_twind.style`bg-fill-gray`
        };
        const hollowStyles = {
          base: apathia_twind.style`bg-fill-white border`,
          primary: apathia_twind.style`text-brand-primary hover:text-content-white`,
          pink: apathia_twind.style`text-pink-primary hover:text-content-white`,
          success: apathia_twind.style`text-success-primary hover:text-content-white`,
          danger: apathia_twind.style`text-error-primary hover:text-content-white`,
          warning: apathia_twind.style`text-warning-primary hover:text-content-white`,
          info: apathia_twind.style`text-content-accent hover:bg-success-primary hover:text-content-primary`
        };
        const plainStyles = {
          primary: apathia_twind.style`bg-brand-light text-brand-primary hover:text-content-white`,
          pink: apathia_twind.style`bg-pink-light text-pink-primary hover:text-content-white`,
          success: apathia_twind.style`bg-success-light text-success-primary hover:text-content-white`,
          danger: apathia_twind.style`bg-error-light text-error-primary hover:text-content-white`,
          warning: apathia_twind.style`bg-warning-light text-warning-primary hover:text-content-white`,
          info: apathia_twind.style`bg-fill-light text-content-accent hover:text-content-primary`
        };
        const sizeStyles = {
          small: apathia_twind.style`text-sm font-medium py-btn-sm-y ${apathia_twind.css`
      min-width: 3.5rem;
    `}`,
          large: apathia_twind.style`text-base py-btn-lg-y ${apathia_twind.css`
      width: 4rem;
    `}`,
          round: apathia_twind.style`rounded-full`
        };
        return {
          themeStyles,
          active: activeStyles,
          disabled: disableStyles,
          hollow: hollowStyles,
          plain: plainStyles,
          size: sizeStyles
        };
      };
      const styles = getButtonStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tagType.value), vue.mergeProps({ ...vue.unref(getButtonProps)() }, {
          class: btnClass.value,
          href: vue.unref(href)
        }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["class", "href"]);
      };
    }
  });
  exports2.BaseButton = _sfc_main;
  exports2.useButton = useButton;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
