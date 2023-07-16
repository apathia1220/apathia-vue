import { defineComponent, useSlots, ref, computed, toRef, openBlock, createElementBlock, normalizeClass, unref, normalizeStyle, renderSlot, createCommentVNode, createElementVNode, withDirectives, mergeProps, vModelDynamic, createBlock, withModifiers, withCtx, createVNode, nextTick } from "vue";
import stringWidth from "string-width";
import { useInjectProp, useAttrs } from "@apathia/apathia.hooks";
import { apply, style, tw } from "@apathia/apathia.twind";
import { Icon } from "@apathia/apathia.icon";
import { Close, Search } from "@apathia/apathia.icon-svg";
const _hoisted_1 = ["type", "disabled"];
const _sfc_main = defineComponent({
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
    const slots = useSlots();
    const inputRef = ref(null);
    const activeVal = ref(false);
    const withPrepend = computed(() => slots.prepend !== void 0);
    const withAppend = computed(() => slots.append !== void 0);
    const disableInput = useInjectProp(
      "FormDisabled",
      false,
      toRef(props, "disabled")
    );
    const showClearIcon = computed(
      () => props.clearable && props.modelValue && !disableInput.value
    );
    const attrs = useAttrs();
    const inputVal = computed({
      get: () => props.modelValue,
      set: (val) => {
        const strWidth = stringWidth(val);
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
        totalCnt += stringWidth(char);
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
      nextTick(() => {
        if (inputRef.value) {
          inputRef.value.dispatchEvent(new Event("input"));
        }
      });
    };
    const getStyles = () => {
      const prependAndAppend = apply`text(content-accent sm) px-2 inline-flex items-center bg-fill-gray`;
      const commonIcon = apply`absolute self-center text-fill-secondary`;
      const interactiveIcon = apply`${commonIcon}cursor-pointer hover:(text-fill-accent)`;
      return {
        inputContainer: style`relative flex w-full h-8 border rounded border-line-accent bg-content-white shadow`,
        inputWrapper: style`relative flex rounded flex-grow-1 bg-content-white`,
        input: style`w-full h-full rounded block text-sm outline-none py-1.5 pl-2`,
        withPrefix: style`pl-9`,
        disabled: style(
          "cursor-not-allowed pointer-events-none bg-info-forbid placeholder-content-secondary text-content-neutral"
        ),
        active: style`border-brand-primary`,
        prepend: tw`${prependAndAppend}${apply`rounded-l border-r-0`}`,
        clearableIcon: tw`${interactiveIcon}${apply`right-2`}`,
        clearWithSuffix: tw`${interactiveIcon}${apply`right-8`}`,
        append: tw`${prependAndAppend}${apply`rounded-r`}`,
        suffixBtn: tw`${interactiveIcon}${apply`right-2`}`
      };
    };
    const styles = getStyles();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          {
            [unref(styles).inputContainer]: true,
            [unref(styles).active]: activeVal.value,
            [unref(styles).disabled]: !!unref(disableInput)
          },
          _ctx.$attrs.class
        ]),
        style: normalizeStyle(unref(attrs).style)
      }, [
        withPrepend.value ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(styles).prepend)
        }, [
          renderSlot(_ctx.$slots, "prepend")
        ], 2)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).inputWrapper)
        }, [
          withDirectives(createElementVNode("input", mergeProps({
            ref_key: "inputRef",
            ref: inputRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputVal.value = $event)
          }, unref(attrs), {
            type: _ctx.type,
            class: [
              {
                [unref(styles).input]: true,
                [unref(styles).disabled]: !!unref(disableInput)
              },
              _ctx.inputClass
            ],
            disabled: !!unref(disableInput),
            onInput: handleInput,
            onBlur: _cache[1] || (_cache[1] = () => activeVal.value = false),
            onFocus: _cache[2] || (_cache[2] = () => activeVal.value = true)
          }), null, 16, _hoisted_1), [
            [vModelDynamic, inputVal.value]
          ]),
          showClearIcon.value ? (openBlock(), createBlock(unref(Icon), {
            key: 0,
            class: normalizeClass([unref(styles).clearableIcon, _ctx.search ? unref(styles).clearWithSuffix : ""]),
            onClick: withModifiers(clear, ["stop"])
          }, {
            default: withCtx(() => [
              createVNode(unref(Close))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : createCommentVNode("", true),
          _ctx.search ? (openBlock(), createBlock(unref(Icon), {
            key: 1,
            class: normalizeClass(unref(styles).suffixBtn),
            onClick: onSearch
          }, {
            default: withCtx(() => [
              createVNode(unref(Search))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true)
        ], 2),
        withAppend.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(unref(styles).append)
        }, [
          renderSlot(_ctx.$slots, "append")
        ], 2)) : createCommentVNode("", true)
      ], 6);
    };
  }
});
export { _sfc_main as Input };
