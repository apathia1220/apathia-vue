(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("string-width"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind"), require("@apathia/apathia.icon"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "string-width", "@apathia/apathia.hooks", "@apathia/apathia.twind", "@apathia/apathia.icon", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.input = {}, global.Vue, global["string-width"], global.hooks, global.twind, global.icon, global["icon-svg"]));
})(this, function(exports2, vue, stringWidth, apathia_hooks, apathia_twind, apathia_icon, apathia_iconSvg) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var stringWidth__default = /* @__PURE__ */ _interopDefaultLegacy(stringWidth);
  const _hoisted_1 = ["type", "disabled"];
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Input",
      inheritAttrs: false
    },
    __name: "Input",
    props: {
      type: { default: "text" },
      modelValue: { default: "" },
      inputClass: { default: "" },
      search: { type: Boolean, default: false },
      clearable: { type: Boolean, default: false },
      disabled: { type: Boolean, default: void 0 },
      maxWords: {}
    },
    emits: ["update:modelValue", "input", "search"],
    setup(__props, { emit }) {
      const props = __props;
      const slots = vue.useSlots();
      const inputRef = vue.ref(null);
      const activeVal = vue.ref(false);
      const withPrepend = vue.computed(() => slots.prepend !== void 0);
      const withAppend = vue.computed(() => slots.append !== void 0);
      const disableInput = apathia_hooks.useInjectProp(
        "FormDisabled",
        false,
        vue.toRef(props, "disabled")
      );
      const showClearIcon = vue.computed(
        () => props.clearable && props.modelValue && !disableInput.value
      );
      const attrs = apathia_hooks.useAttrs();
      const inputVal = vue.computed({
        get: () => props.modelValue,
        set: (val) => {
          const strWidth = stringWidth__default["default"](val);
          if (props.maxWords !== void 0 && strWidth > 2 * props.maxWords) {
            if (inputRef.value) {
              inputRef.value.value = getStringByWords(val, props.maxWords * 2);
            }
            return;
          }
          emit("update:modelValue", val);
        }
      });
      const handleInput = (e) => {
        emit("input", e);
      };
      const getStringByWords = (str, width) => {
        let totalCnt = 0;
        let res = "";
        for (const char of str) {
          totalCnt += stringWidth__default["default"](char);
          if (totalCnt > width) {
            return res;
          }
          res += char;
        }
        return res;
      };
      const onSearch = () => {
        if (inputRef.value) {
          inputRef.value.focus();
        }
        emit("search", props.modelValue);
      };
      const clear = () => {
        emit("update:modelValue", "");
        vue.nextTick(() => {
          if (inputRef.value) {
            inputRef.value.dispatchEvent(new Event("input"));
          }
        });
      };
      const getStyles = () => {
        const prependAndAppend = apathia_twind.apply`text(content-accent sm) px-2 inline-flex items-center bg-fill-gray`;
        const commonIcon = apathia_twind.apply`absolute self-center text-fill-secondary`;
        const interactiveIcon = apathia_twind.apply`${commonIcon}cursor-pointer hover:(text-fill-accent)`;
        return {
          inputContainer: apathia_twind.style`relative flex w-full h-8 border rounded border-line-accent bg-content-white shadow`,
          inputWrapper: apathia_twind.style`relative flex rounded flex-grow-1 bg-content-white`,
          input: apathia_twind.style`w-full h-full rounded block text-sm outline-none py-1.5 pl-2`,
          withPrefix: apathia_twind.style`pl-9`,
          disabled: apathia_twind.style(
            "cursor-not-allowed pointer-events-none bg-info-forbid placeholder-content-secondary text-content-neutral"
          ),
          active: apathia_twind.style`border-brand-primary`,
          prepend: apathia_twind.tw`${prependAndAppend}${apathia_twind.apply`rounded-l border-r-0`}`,
          clearableIcon: apathia_twind.tw`${interactiveIcon}${apathia_twind.apply`right-2`}`,
          clearWithSuffix: apathia_twind.tw`${interactiveIcon}${apathia_twind.apply`right-8`}`,
          append: apathia_twind.tw`${prependAndAppend}${apathia_twind.apply`rounded-r`}`,
          suffixBtn: apathia_twind.tw`${interactiveIcon}${apathia_twind.apply`right-2`}`
        };
      };
      const styles = getStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass([
            {
              [vue.unref(styles).inputContainer]: true,
              [vue.unref(styles).active]: activeVal.value,
              [vue.unref(styles).disabled]: !!vue.unref(disableInput)
            },
            _ctx.$attrs.class
          ]),
          style: vue.normalizeStyle(vue.unref(attrs).style)
        }, [
          withPrepend.value ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass(vue.unref(styles).prepend)
          }, [
            vue.renderSlot(_ctx.$slots, "prepend")
          ], 2)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).inputWrapper)
          }, [
            vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
              ref_key: "inputRef",
              ref: inputRef,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputVal.value = $event)
            }, vue.unref(attrs), {
              type: _ctx.type,
              class: [
                {
                  [vue.unref(styles).input]: true,
                  [vue.unref(styles).disabled]: !!vue.unref(disableInput)
                },
                _ctx.inputClass
              ],
              disabled: !!vue.unref(disableInput),
              onInput: handleInput,
              onBlur: _cache[1] || (_cache[1] = () => activeVal.value = false),
              onFocus: _cache[2] || (_cache[2] = () => activeVal.value = true)
            }), null, 16, _hoisted_1), [
              [vue.vModelDynamic, inputVal.value]
            ]),
            showClearIcon.value ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_icon.Icon), {
              key: 0,
              class: vue.normalizeClass([vue.unref(styles).clearableIcon, _ctx.search ? vue.unref(styles).clearWithSuffix : ""]),
              onClick: vue.withModifiers(clear, ["stop"])
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(apathia_iconSvg.Close))
              ]),
              _: 1
            }, 8, ["class", "onClick"])) : vue.createCommentVNode("", true),
            _ctx.search ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_icon.Icon), {
              key: 1,
              class: vue.normalizeClass(vue.unref(styles).suffixBtn),
              onClick: onSearch
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(apathia_iconSvg.Search))
              ]),
              _: 1
            }, 8, ["class"])) : vue.createCommentVNode("", true)
          ], 2),
          withAppend.value ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            class: vue.normalizeClass(vue.unref(styles).append)
          }, [
            vue.renderSlot(_ctx.$slots, "append")
          ], 2)) : vue.createCommentVNode("", true)
        ], 6);
      };
    }
  });
  exports2.Input = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
