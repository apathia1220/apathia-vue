(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.custom-render"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.custom-render", "@apathia/apathia.hooks", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["switch"] = {}, global.Vue, global["custom-render"], global.hooks, global.twind));
})(this, function(exports2, vue, apathia_customRender, apathia_hooks, apathia_twind) {
  "use strict";
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Switch"
    },
    __name: "Switch",
    props: {
      as: { default: "div" },
      modelValue: { type: [String, Number, Boolean], default: false },
      trueValue: { type: [String, Number, Boolean], default: true },
      falseValue: { type: [String, Number, Boolean], default: false },
      inactiveText: {},
      activeText: {},
      disabled: { type: Boolean, default: void 0 },
      size: {},
      loading: { type: Boolean, default: false }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit }) {
      const props = __props;
      const getStyles = ({
        isTrue: isTrue2,
        disabled,
        loading,
        large: large2,
        small: small2
      }) => {
        const outerMinWidth = large2 && "3.5rem" || small2 && "1.75rem" || "2.75rem";
        const outerHeight = large2 && "2rem" || small2 && "1rem" || "1.5rem";
        const circleSize = `calc(${outerHeight} - 2px)`;
        return {
          wrapper: apathia_twind.style`inline-block box-border m-0 p-0 text-2xl focus:outline-none cursor-pointer text-sm ${apathia_twind.css`
      line-height: auto;
    `} ${loading ? apathia_twind.apply`opacity-40` : ""}`,
          switchWrap: apathia_twind.style`inline-block relative select-none transition-all
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${disabled ? "bg-opacity-40" : "bg-opacity-0"}
        ${isTrue2 ? "border(solid brand-primary) bg-brand-primary" : "border(solid line-accent) bg-fill-neutral"}
        ${apathia_twind.css`
          height: ${outerHeight};
          min-width: ${outerMinWidth};
          line-height: ${outerHeight};
          border-radius: ${outerHeight};
        `}
        `,
          outer: apathia_twind.style`inline-block transition-all
        ${apathia_twind.css`
          &:focus {
            box-shadow: 0 0 0 2px fade(rgb(140, 94, 247), 20%);
            outline: 0;
          }
          &:focus:hover {
            ${apathia_twind.apply`shadow-none`}
          }
          &:after {
            ${apathia_twind.apply`bg-fill-white absolute top-px cursor-pointer`}
            left: ${isTrue2 ? `calc(100% - ${outerHeight} + 1px)` : "1px"};
            height: ${circleSize};
            width: ${circleSize};
            content: '';
            border-radius: 50%;
            transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
          }
          &:before {
            ${apathia_twind.apply`bg-transparent absolute border(brand-primary r t-0 b-0 l-0) ${isTrue2 ? "right-1" : "left-1"}`}
            display: ${loading ? "block" : "none"};
            height: calc(${outerHeight} - 8px);
            width: calc(${outerHeight} - 8px);
            content: '';
            border-radius: 50%;
            top: 4px;
            z-index: 1;
            animation: switch-loading 1s linear;
            animation-iteration-count: infinite;
          }
          @keyframes switch-loading {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}`,
          inner: apathia_twind.style`px-1 text-content-white text-xs transition-all duration-300  ${apathia_twind.css`
      margin: ${isTrue2 ? `0 ${circleSize} 0 0` : `0 0 0 ${circleSize}`};
      i {
        width: ${circleSize};
        height: ${circleSize};
        text-align: center;
      }
    `}`,
          inactiveText: apathia_twind.style`${!isTrue2 ? "text-brand-primary" : ""}`,
          activeText: apathia_twind.style`${isTrue2 ? "text-brand-primary" : ""}`
        };
      };
      const slots = vue.useSlots();
      const disableChange = apathia_hooks.useInjectProp("FormDisabled", false, props.disabled);
      const isTrue = vue.computed(() => props.modelValue === props.trueValue);
      const large = vue.computed(() => !!(props.size && props.size === "large"));
      const small = vue.computed(() => !!(props.size && props.size === "small"));
      const innerRender = vue.computed(
        () => isTrue.value ? props.activeText || slots.active : props.inactiveText || slots.inactive
      );
      const toggle = () => {
        const newValue = isTrue.value ? props.falseValue : props.trueValue;
        emit("update:modelValue", newValue);
        emit("change", newValue);
      };
      const handleChange = () => {
        if (!(props.loading || !!disableChange.value)) {
          toggle();
        }
      };
      const styles = apathia_twind.getComputedStyle(
        {
          isTrue,
          large,
          small,
          disabled: !!disableChange.value,
          loading: props.loading
        },
        getStyles
      );
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.as), {
          class: vue.normalizeClass({
            [vue.unref(styles).wrapper]: true,
            [vue.unref(styles).wrapperLoading]: _ctx.loading
          }),
          onClick: handleChange
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(vue.unref(styles).switchWrap)
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(styles).outer)
              }, null, 2),
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(styles).inner)
              }, [
                vue.createVNode(vue.unref(apathia_customRender.CustomRender), { render: innerRender.value }, null, 8, ["render"])
              ], 2)
            ], 2)
          ]),
          _: 1
        }, 8, ["class"]);
      };
    }
  });
  exports2.Switch = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
