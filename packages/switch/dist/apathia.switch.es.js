import { defineComponent, useSlots, computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, unref, withCtx, createElementVNode, createVNode } from "vue";
import { CustomRender } from "@apathia/apathia.custom-render";
import { useInjectProp } from "@apathia/apathia.hooks";
import { getComputedStyle, style, css, apply } from "@apathia/apathia.twind";
const _sfc_main = defineComponent({
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
        wrapper: style`inline-block box-border m-0 p-0 text-2xl focus:outline-none cursor-pointer text-sm ${css`
      line-height: auto;
    `} ${loading ? apply`opacity-40` : ""}`,
        switchWrap: style`inline-block relative select-none transition-all
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${disabled ? "bg-opacity-40" : "bg-opacity-0"}
        ${isTrue2 ? "border(solid brand-primary) bg-brand-primary" : "border(solid line-accent) bg-fill-neutral"}
        ${css`
          height: ${outerHeight};
          min-width: ${outerMinWidth};
          line-height: ${outerHeight};
          border-radius: ${outerHeight};
        `}
        `,
        outer: style`inline-block transition-all
        ${css`
          &:focus {
            box-shadow: 0 0 0 2px fade(rgb(140, 94, 247), 20%);
            outline: 0;
          }
          &:focus:hover {
            ${apply`shadow-none`}
          }
          &:after {
            ${apply`bg-fill-white absolute top-px cursor-pointer`}
            left: ${isTrue2 ? `calc(100% - ${outerHeight} + 1px)` : "1px"};
            height: ${circleSize};
            width: ${circleSize};
            content: '';
            border-radius: 50%;
            transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
          }
          &:before {
            ${apply`bg-transparent absolute border(brand-primary r t-0 b-0 l-0) ${isTrue2 ? "right-1" : "left-1"}`}
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
        inner: style`px-1 text-content-white text-xs transition-all duration-300  ${css`
      margin: ${isTrue2 ? `0 ${circleSize} 0 0` : `0 0 0 ${circleSize}`};
      i {
        width: ${circleSize};
        height: ${circleSize};
        text-align: center;
      }
    `}`,
        inactiveText: style`${!isTrue2 ? "text-brand-primary" : ""}`,
        activeText: style`${isTrue2 ? "text-brand-primary" : ""}`
      };
    };
    const slots = useSlots();
    const disableChange = useInjectProp("FormDisabled", false, props.disabled);
    const isTrue = computed(() => props.modelValue === props.trueValue);
    const large = computed(() => !!(props.size && props.size === "large"));
    const small = computed(() => !!(props.size && props.size === "small"));
    const innerRender = computed(
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
    const styles = getComputedStyle(
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
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.as), {
        class: normalizeClass({
          [unref(styles).wrapper]: true,
          [unref(styles).wrapperLoading]: _ctx.loading
        }),
        onClick: handleChange
      }, {
        default: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass(unref(styles).switchWrap)
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(styles).outer)
            }, null, 2),
            createElementVNode("span", {
              class: normalizeClass(unref(styles).inner)
            }, [
              createVNode(unref(CustomRender), { render: innerRender.value }, null, 8, ["render"])
            ], 2)
          ], 2)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
export { _sfc_main as Switch };
