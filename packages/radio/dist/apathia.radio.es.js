import { isRef, computed, unref, defineComponent, toRefs, inject, ref, openBlock, createElementBlock, normalizeClass, createElementVNode, withKeys, renderSlot, createCommentVNode, provide } from "vue";
import { noop } from "lodash";
import { style, tw, css, apply } from "@apathia/apathia.twind";
import { useInjectProp } from "@apathia/apathia.hooks";
function useRadio(userProps, emit) {
  const { disabled, modelValue, value, groupState, changeHandler, inputEl } = userProps;
  let isSelected;
  if (isRef(groupState)) {
    isSelected = computed(() => unref(groupState).value === value.value);
  } else {
    isSelected = computed(() => modelValue.value === value.value);
  }
  const select = () => {
    if (disabled.value) {
      return;
    }
    emit("update:modelValue", value.value);
    const input = inputEl && unref(inputEl);
    input && input.focus();
    emit("change", value.value);
    changeHandler(value.value);
  };
  return {
    isSelected,
    handleChange: select
  };
}
const _hoisted_1 = ["value", "checked", "disabled"];
const _sfc_main$1 = defineComponent({
  ...{
    name: "Radio"
  },
  __name: "Radio",
  props: {
    value: { type: [Number, String, Boolean], default: false },
    modelValue: { type: [String, Number, Boolean], default: false },
    disabled: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const { value, modelValue } = toRefs(props);
    const groupState = inject("groupState", null);
    const changeHandler = inject("changeHandler", noop);
    const isDisabled = computed(() => {
      if (props.disabled !== void 0) {
        return props.disabled;
      }
      return isRef(groupState) ? groupState.value.disabled : false;
    });
    const inputEl = ref(null);
    const userProps = {
      value,
      modelValue,
      disabled: isDisabled,
      groupState,
      changeHandler,
      inputEl
    };
    const { isSelected, handleChange } = useRadio(userProps, emit);
    const styles = {
      wrapper: style`inline-flex mr-2 p-0 list-none cursor-pointer items-center text-sm`,
      wrapperDisabled: style`text-content-neutral cursor-not-allowed`,
      radio: style`relative inline-block m-0 p-0 whitespace-nowrap align-middle`,
      inner: tw(
        style`relative block w-4 h-4 top-0 left-0 bg-content-white border border-fill-accent outline-none`,
        css`
      border-radius: 100px;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        display: table;
        left: 3px;
        top: 3px;
        ${apply`w-2 h-2 bg-brand-primary rounded`}
        opacity: 0;
        transform: scale(0);
        transition: all 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
    `
      ),
      innerSelected: tw(
        style`border-brand-hover`,
        css`
      &::after {
        opacity: 1;
        transform: scale(0.875);
        transition: all 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
    `
      ),
      innerDisabled: style`bg-info-forbid border-line-accent cursor-not-allowed outline-none`,
      innerSelectedDisabled: tw(css`
    &::after {
      opacity: 1;
      transform: scale(0.875);
      transition: all 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
  `),
      ring: style`focus:ring-2 focus:ring-brand-primary`,
      input: style`hidden`,
      contentWrap: style`mx-1`
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass({ [styles.wrapper]: true, [styles.wrapperDisabled]: isDisabled.value })
      }, [
        createElementVNode("span", {
          class: normalizeClass({ [styles.radio]: true })
        }, [
          createElementVNode("input", {
            type: "radio",
            tabindex: "0",
            class: normalizeClass({ [styles.input]: true }),
            value: unref(value),
            checked: unref(isSelected),
            disabled: isDisabled.value,
            onClick: _cache[0] || (_cache[0] = (...args) => unref(handleChange) && unref(handleChange)(...args)),
            onKeydown: [
              _cache[1] || (_cache[1] = withKeys(
                (...args) => unref(handleChange) && unref(handleChange)(...args),
                ["space"]
              )),
              _cache[2] || (_cache[2] = withKeys(
                (...args) => unref(handleChange) && unref(handleChange)(...args),
                ["enter"]
              ))
            ]
          }, null, 42, _hoisted_1),
          createElementVNode("span", {
            ref_key: "inputEl",
            ref: inputEl,
            class: normalizeClass({
              [styles.inner]: true,
              [styles.innerDisabled]: isDisabled.value,
              [styles.innerSelected]: unref(isSelected) && !isDisabled.value,
              [styles.innerSelectedDisabled]: isDisabled.value && unref(isSelected),
              [styles.ring]: !isDisabled.value
            }),
            tabindex: "-1"
          }, null, 2)
        ], 2),
        _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(styles.contentWrap)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _sfc_main = defineComponent({
  ...{
    name: "RadioGroup"
  },
  __name: "RadioGroup",
  props: {
    modelValue: { type: [String, Number, Boolean], default: false },
    disabled: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const { modelValue, disabled } = toRefs(props);
    const isDisabled = useInjectProp("FormDisabled", false, disabled);
    const groupState = computed(() => ({
      value: modelValue.value,
      disabled: isDisabled.value
    }));
    provide("groupState", groupState);
    provide("changeHandler", (val) => {
      emit("update:modelValue", val);
      emit("change", val);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
export { _sfc_main$1 as Radio, _sfc_main as RadioGroup };
