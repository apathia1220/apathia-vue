import { computed, unref, defineComponent, ref, toRefs, openBlock, createElementBlock, normalizeClass, createElementVNode, withModifiers, withKeys, renderSlot, createCommentVNode } from "vue";
import { useInjectProp } from "@apathia/apathia.hooks";
import { style, tw, css, apply } from "@apathia/apathia.twind";
function useCheckbox(userProps, emit) {
  const { disabled, modelValue, trueValue, falseValue, value, inputEl } = userProps;
  const isArrayCheckbox = computed(() => Array.isArray(modelValue.value));
  const arrayTrueValue = computed(() => typeof value.value !== "undefined" ? value.value : trueValue.value);
  const isChecked = computed(() => {
    if (isArrayCheckbox.value) {
      const valArr = modelValue.value;
      return valArr.indexOf(arrayTrueValue.value) > -1;
    }
    return trueValue.value === modelValue.value;
  });
  const handleChange = () => {
    if (disabled.value) {
      return;
    }
    let newValue;
    if (isArrayCheckbox.value) {
      const valArr = modelValue.value;
      const valueTrue = arrayTrueValue.value;
      newValue = valArr.slice();
      const index = newValue.indexOf(valueTrue);
      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(valueTrue);
      }
    } else {
      newValue = trueValue.value;
      if (isChecked.value) {
        newValue = falseValue.value;
      }
    }
    emit("update:modelValue", newValue);
    const input = inputEl && unref(inputEl);
    if (input) {
      input.focus();
    }
    emit("change", newValue);
  };
  return {
    isChecked,
    handleChange
  };
}
const _hoisted_1 = ["checked", "disabled", "value"];
const _sfc_main = defineComponent({
  ...{
    name: "Checkbox"
  },
  __name: "Checkbox",
  props: {
    disabled: { type: Boolean, default: void 0 },
    modelValue: { type: [String, Number, Boolean, Array], default: false },
    trueValue: { type: [String, Number, Boolean], default: true },
    falseValue: { type: [String, Number, Boolean], default: false },
    value: { default: void 0 },
    indeterminate: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const inputEl = ref(null);
    const { modelValue, trueValue, falseValue, value, disabled } = toRefs(props);
    const disableInput = useInjectProp(
      "FormDisabled",
      false,
      disabled
    );
    const userProps = {
      modelValue,
      trueValue,
      falseValue,
      value,
      disabled: disableInput,
      inputEl
    };
    const { isChecked, handleChange } = useCheckbox(userProps, emit);
    const getCheckboxStyles = () => ({
      wrapper: style`inline-flex mr-2 p-0 list-none cursor-pointer items-center text-sm`,
      disabledWrapper: style`text-fill-accent cursor-not-allowed`,
      checkbox: style`relative inline-block p-0 whitespace-nowrap outline-none align-middle`,
      inner: tw(
        style`relative block w-4 h-4 top-0 left-0 bg-fill-white border border-fill-accent rounded outline-none`,
        css`
      transition: all 0.3s;
      &::after {
        content: '';
        display: table;
        position: absolute;
        width: 5px;
        height: 9px;
        top: 1px;
        left: 5px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0);
        transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
      }
    `
      ),
      checkedBlueBorder: style`bg-brand-primary border-brand-primary`,
      checkedAfter: tw(css`
    &::after {
      transform: rotate(45deg) scale(1);
      transition: all 0.15s cubic-bezier(0.12, 0.4, 0.29, 1.46);
    }
  `),
      indeterAfter: tw(css`
    &::after {
      transform: rotate(90deg) scale(1);
      border-bottom: 0;
    }
  `),
      disabledInner: tw(
        style`bg-fill-gray border-fill-accent cursor-not-allowed outline-none`,
        css`
      &::after {
        ${apply`border-fill-accent`}
      }
    `
      ),
      ring: style`focus:ring-2 focus:ring-brand-primary`,
      input: style`hidden`,
      contentWrap: style`mx-1`
    });
    const styles = getCheckboxStyles();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass({ [unref(styles).wrapper]: true, [unref(styles).disabledWrapper]: unref(disableInput) })
      }, [
        createElementVNode("span", {
          class: normalizeClass({ [unref(styles).checkbox]: true })
        }, [
          createElementVNode("input", {
            type: "checkbox",
            class: normalizeClass({ [unref(styles).input]: true }),
            checked: unref(isChecked),
            disabled: unref(disableInput),
            value: unref(trueValue),
            onClick: _cache[0] || (_cache[0] = withModifiers(
              (...args) => unref(handleChange) && unref(handleChange)(...args),
              ["stop"]
            )),
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
              [unref(styles).inner]: true,
              [unref(styles).disabledInner]: unref(disableInput),
              [unref(styles).checkedBlueBorder]: !unref(disableInput) && (unref(isChecked) || _ctx.indeterminate),
              [unref(styles).checkedAfter]: unref(isChecked) && !_ctx.indeterminate,
              [unref(styles).indeterAfter]: !unref(isChecked) && _ctx.indeterminate,
              [unref(styles).ring]: !unref(disableInput)
            }),
            tabindex: "-1"
          }, null, 2)
        ], 2),
        _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(styles).contentWrap)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
export { _sfc_main as Checkbox };
