(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.hooks", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.textarea = {}, global.Vue, global.hooks, global.twind));
})(this, function(exports2, vue, apathia_hooks, apathia_twind) {
  "use strict";
  const _hoisted_1 = ["disabled"];
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Textarea"
    },
    __name: "Textarea",
    props: {
      modelValue: {},
      disabled: { type: Boolean, default: void 0 }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit }) {
      const props = __props;
      const getStyles = () => ({
        commonTextarea: apathia_twind.style`block border border-line-accent rounded pt-2 px-2 text-sm outline-none focus:(bg-fill-white border-brand-primary)`,
        fullWidth: apathia_twind.style`w-full`
      });
      const attr = vue.useAttrs();
      const disableInput = apathia_hooks.useInjectProp(
        "FormDisabled",
        false,
        vue.toRef(props, "disabled")
      );
      const styles = getStyles();
      const classes = vue.computed(() => ({
        [styles.commonTextarea]: true,
        [styles.fullWidth]: attr.cols === void 0
      }));
      const inputValue = vue.computed({
        get: () => props.modelValue,
        set: (value) => {
          emit("update:modelValue", value);
        }
      });
      const attrs = vue.computed(() => ({
        ...attr,
        rows: attr.rows === void 0 ? "3" : attr.rows
      }));
      return (_ctx, _cache) => {
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
          disabled: !!vue.unref(disableInput),
          class: classes.value
        }, attrs.value), null, 16, _hoisted_1)), [
          [vue.vModelText, inputValue.value]
        ]);
      };
    }
  });
  exports2.Textarea = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
