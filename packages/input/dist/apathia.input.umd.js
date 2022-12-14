(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("string-width"), require("vue"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind"), require("@apathia/apathia.icon")) : typeof define === "function" && define.amd ? define(["exports", "string-width", "vue", "@apathia/apathia.hooks", "@apathia/apathia.twind", "@apathia/apathia.icon"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.input = {}, global["string-width"], global.Vue, global.hooks, global.twind, global.icon));
})(this, function(exports2, stringwidth, vue, apathia_hooks, apathia_twind, apathia_icon) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var stringwidth__default = /* @__PURE__ */ _interopDefaultLegacy(stringwidth);
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main = vue.defineComponent({
    name: "Input",
    components: {
      Icon: apathia_icon.Icon
    },
    inheritAttrs: false,
    props: {
      type: {
        type: String,
        default: "text"
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      inputClass: {
        type: [String, Object],
        default: ""
      },
      search: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: void 0
      },
      maxwords: {
        type: Number
      }
    },
    emits: ["update:modelValue", "input", "search"],
    setup(props, ctx) {
      const inputRef = vue.ref(null);
      const activeVal = vue.ref(false);
      const withPrepend = vue.computed(() => ctx.slots.prepend !== void 0);
      const withAppend = vue.computed(() => ctx.slots.append !== void 0);
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
          const strWidth = stringwidth__default["default"](val);
          if (props.maxwords !== void 0 && strWidth > 2 * props.maxwords) {
            if (inputRef.value) {
              inputRef.value.value = getStringByWords(val, props.maxwords * 2);
            }
            return;
          }
          ctx.emit("update:modelValue", val);
        }
      });
      const handleInput = (e) => {
        ctx.emit("input", e);
      };
      const getStringByWords = (str, width) => {
        let totalCnt = 0;
        let res = "";
        for (const char of str) {
          totalCnt += stringwidth__default["default"](char);
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
        ctx.emit("search", props.modelValue);
      };
      const clear = () => {
        ctx.emit("update:modelValue", "");
        vue.nextTick(() => {
          if (inputRef.value) {
            inputRef.value.dispatchEvent(new Event("input"));
          }
        });
      };
      const styles = getStyles();
      return {
        inputRef,
        inputVal,
        activeVal,
        handleInput,
        attrs,
        withPrepend,
        withAppend,
        disableInput,
        showClearIcon,
        onSearch,
        clear,
        styles
      };
    }
  });
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
  const _hoisted_1 = ["type", "disabled"];
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Icon = vue.resolveComponent("Icon");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([
        {
          [_ctx.styles.inputContainer]: true,
          [_ctx.styles.active]: _ctx.activeVal,
          [_ctx.styles.disabled]: !!_ctx.disableInput
        },
        _ctx.$attrs.class
      ]),
      style: vue.normalizeStyle(_ctx.attrs.style)
    }, [
      _ctx.withPrepend ? (vue.openBlock(), vue.createElementBlock("span", {
        key: 0,
        class: vue.normalizeClass(_ctx.styles.prepend)
      }, [
        vue.renderSlot(_ctx.$slots, "prepend")
      ], 2)) : vue.createCommentVNode("", true),
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.styles.inputWrapper)
      }, [
        vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
          ref: "inputRef",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.inputVal = $event)
        }, _ctx.attrs, {
          type: _ctx.type,
          class: [
            {
              [_ctx.styles.input]: true,
              [_ctx.styles.disabled]: !!_ctx.disableInput
            },
            _ctx.inputClass
          ],
          disabled: !!_ctx.disableInput,
          onInput: _cache[1] || (_cache[1] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
          onBlur: _cache[2] || (_cache[2] = () => _ctx.activeVal = false),
          onFocus: _cache[3] || (_cache[3] = () => _ctx.activeVal = true)
        }), null, 16, _hoisted_1), [
          [vue.vModelDynamic, _ctx.inputVal]
        ]),
        _ctx.showClearIcon ? (vue.openBlock(), vue.createBlock(_component_Icon, {
          key: 0,
          class: vue.normalizeClass([_ctx.styles.clearableIcon, _ctx.search ? _ctx.styles.clearWithSuffix : ""]),
          name: ["fa", "times"],
          onClick: vue.withModifiers(_ctx.clear, ["stop"])
        }, null, 8, ["class", "onClick"])) : vue.createCommentVNode("", true),
        _ctx.search ? (vue.openBlock(), vue.createBlock(_component_Icon, {
          key: 1,
          class: vue.normalizeClass(_ctx.styles.suffixBtn),
          name: ["fa", "search"],
          onClick: _ctx.onSearch
        }, null, 8, ["class", "onClick"])) : vue.createCommentVNode("", true)
      ], 2),
      _ctx.withAppend ? (vue.openBlock(), vue.createElementBlock("span", {
        key: 1,
        class: vue.normalizeClass(_ctx.styles.append)
      }, [
        vue.renderSlot(_ctx.$slots, "append")
      ], 2)) : vue.createCommentVNode("", true)
    ], 6);
  }
  var Input = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  exports2.Input = Input;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
