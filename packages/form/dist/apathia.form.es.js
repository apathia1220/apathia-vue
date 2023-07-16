import { defineComponent, provide, computed, openBlock, createElementBlock, normalizeClass, unref, renderSlot, toRef, normalizeStyle, createTextVNode, toDisplayString, createCommentVNode, createElementVNode } from "vue";
import { style, apply, css, tw } from "@apathia/apathia.twind";
import { useInjectProp } from "@apathia/apathia.hooks";
const FORM_DISABLE_KEY = "FormDisabled";
const FORM_LABEL_WIDTH_KEY = "FormLabelWidth";
const FORM_LABEL_ALIGN_KEY = "FormItemAlign";
const FORM_LABEL_POSITION_KEY = "FormLabelPosition";
const FORM_ITEM_INLINE_KEY = "FormItemInline";
const _sfc_main$1 = defineComponent({
  ...{
    name: "Form"
  },
  __name: "Form",
  props: {
    disabled: { type: Boolean, default: void 0 },
    inline: { type: Boolean, default: false },
    labelWidth: { default: 80 },
    labelPosition: { default: "left" },
    labelAlign: { default: "top" }
  },
  setup(__props) {
    const props = __props;
    provide(
      FORM_ITEM_INLINE_KEY,
      computed(() => props.inline)
    );
    provide(
      FORM_DISABLE_KEY,
      computed(() => !!props.disabled)
    );
    provide(
      FORM_LABEL_WIDTH_KEY,
      computed(() => props.labelWidth)
    );
    provide(
      FORM_LABEL_POSITION_KEY,
      computed(() => props.labelPosition)
    );
    provide(
      FORM_LABEL_ALIGN_KEY,
      computed(() => props.labelAlign)
    );
    const getFromStyle = () => ({
      form: style`mb-2`
    });
    const styles = getFromStyle();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(styles).form)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
const _sfc_main = defineComponent({
  ...{
    name: "FormItem"
  },
  __name: "FormItem",
  props: {
    prop: {},
    labelAlign: {},
    labelPosition: {},
    label: {},
    required: { type: Boolean },
    offset: { type: Boolean },
    labelWidth: {},
    inline: { type: Boolean, default: void 0 },
    contentClass: {}
  },
  setup(__props) {
    const props = __props;
    const realLabelPosition = useInjectProp(
      FORM_LABEL_POSITION_KEY,
      "left",
      toRef(props, "labelPosition")
    );
    const realLabelAlign = useInjectProp(
      FORM_LABEL_ALIGN_KEY,
      "top",
      toRef(props, "labelAlign")
    );
    const realLabelWidth = useInjectProp(
      FORM_LABEL_WIDTH_KEY,
      80,
      toRef(props, "labelWidth")
    );
    const realFormItemInline = useInjectProp(
      FORM_ITEM_INLINE_KEY,
      false,
      toRef(props, "inline")
    );
    const containerClasses = computed(() => ({
      [styles.container]: true,
      [styles.inlineFlex]: realLabelPosition.value !== "top" && !!realFormItemInline.value,
      [styles.flex]: realLabelPosition.value !== "top" && !realFormItemInline.value
    }));
    const parseWidth = (width) => {
      if (typeof width === "undefined" || width === "") {
        return "auto";
      }
      if (typeof width === "number") {
        return `${width}px`;
      }
      return /^\d+$/.test(width) ? `${width}px` : width;
    };
    const labelStyle = computed(() => ({
      width: parseWidth(realLabelWidth.value),
      display: realLabelPosition.value === "top" ? "block" : "",
      "text-align": realLabelPosition.value === "right" ? "right" : "left",
      "margin-bottom": realLabelPosition.value === "top" ? "0.5rem" : ""
    }));
    const labelClasses = computed(() => ({
      [styles.labelBlock]: realLabelPosition.value === "top",
      [styles.labelInline]: realLabelPosition.value !== "top",
      [styles.labelAlignTop]: realLabelAlign.value === "top",
      [styles.labelAlignCenter]: realLabelAlign.value === "center",
      [styles.labelAlignBottom]: realLabelAlign.value === "bottom",
      [styles.labelRequired]: props.required
    }));
    const getFormItemStyle = () => {
      const label = apply`text-sm text-content-primary`;
      const mark = css`
    &:before {
      content: '*';
      ${apply`text-error-primary align-top`}
    }
  `;
      return {
        container: style`mb-2 ml-2`,
        flex: style`flex`,
        inlineFlex: style`inline-flex mr-2 last:mr-0`,
        labelBlock: style`w-full ${label}`,
        labelInline: style`mr-2 flex-shrink-0 ${label}`,
        labelAlignTop: style`self-start`,
        labelAlignCenter: style`self-center`,
        labelAlignBottom: style`self-end`,
        labelRequired: tw`${mark}`,
        content: style`flex-auto`
      };
    };
    const styles = getFormItemStyle();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value)
      }, [
        _ctx.label || _ctx.offset || _ctx.$slots.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass(labelClasses.value),
          style: normalizeStyle(labelStyle.value)
        }, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ])
        ], 6)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass([unref(styles).content, _ctx.contentClass])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)
      ], 2);
    };
  }
});
export { _sfc_main$1 as Form, _sfc_main as FormItem };
