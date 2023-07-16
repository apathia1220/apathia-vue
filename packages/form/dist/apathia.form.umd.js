(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("@apathia/apathia.hooks")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "@apathia/apathia.hooks"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.form = {}, global.Vue, global.twind, global.hooks));
})(this, function(exports2, vue, apathia_twind, apathia_hooks) {
  "use strict";
  const FORM_DISABLE_KEY = "FormDisabled";
  const FORM_LABEL_WIDTH_KEY = "FormLabelWidth";
  const FORM_LABEL_ALIGN_KEY = "FormItemAlign";
  const FORM_LABEL_POSITION_KEY = "FormLabelPosition";
  const FORM_ITEM_INLINE_KEY = "FormItemInline";
  const _sfc_main$1 = vue.defineComponent({
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
      vue.provide(
        FORM_ITEM_INLINE_KEY,
        vue.computed(() => props.inline)
      );
      vue.provide(
        FORM_DISABLE_KEY,
        vue.computed(() => !!props.disabled)
      );
      vue.provide(
        FORM_LABEL_WIDTH_KEY,
        vue.computed(() => props.labelWidth)
      );
      vue.provide(
        FORM_LABEL_POSITION_KEY,
        vue.computed(() => props.labelPosition)
      );
      vue.provide(
        FORM_LABEL_ALIGN_KEY,
        vue.computed(() => props.labelAlign)
      );
      const getFromStyle = () => ({
        form: apathia_twind.style`mb-2`
      });
      const styles = getFromStyle();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(styles).form)
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  const _sfc_main = vue.defineComponent({
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
      const realLabelPosition = apathia_hooks.useInjectProp(
        FORM_LABEL_POSITION_KEY,
        "left",
        vue.toRef(props, "labelPosition")
      );
      const realLabelAlign = apathia_hooks.useInjectProp(
        FORM_LABEL_ALIGN_KEY,
        "top",
        vue.toRef(props, "labelAlign")
      );
      const realLabelWidth = apathia_hooks.useInjectProp(
        FORM_LABEL_WIDTH_KEY,
        80,
        vue.toRef(props, "labelWidth")
      );
      const realFormItemInline = apathia_hooks.useInjectProp(
        FORM_ITEM_INLINE_KEY,
        false,
        vue.toRef(props, "inline")
      );
      const containerClasses = vue.computed(() => ({
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
      const labelStyle = vue.computed(() => ({
        width: parseWidth(realLabelWidth.value),
        display: realLabelPosition.value === "top" ? "block" : "",
        "text-align": realLabelPosition.value === "right" ? "right" : "left",
        "margin-bottom": realLabelPosition.value === "top" ? "0.5rem" : ""
      }));
      const labelClasses = vue.computed(() => ({
        [styles.labelBlock]: realLabelPosition.value === "top",
        [styles.labelInline]: realLabelPosition.value !== "top",
        [styles.labelAlignTop]: realLabelAlign.value === "top",
        [styles.labelAlignCenter]: realLabelAlign.value === "center",
        [styles.labelAlignBottom]: realLabelAlign.value === "bottom",
        [styles.labelRequired]: props.required
      }));
      const getFormItemStyle = () => {
        const label = apathia_twind.apply`text-sm text-content-primary`;
        const mark = apathia_twind.css`
    &:before {
      content: '*';
      ${apathia_twind.apply`text-error-primary align-top`}
    }
  `;
        return {
          container: apathia_twind.style`mb-2 ml-2`,
          flex: apathia_twind.style`flex`,
          inlineFlex: apathia_twind.style`inline-flex mr-2 last:mr-0`,
          labelBlock: apathia_twind.style`w-full ${label}`,
          labelInline: apathia_twind.style`mr-2 flex-shrink-0 ${label}`,
          labelAlignTop: apathia_twind.style`self-start`,
          labelAlignCenter: apathia_twind.style`self-center`,
          labelAlignBottom: apathia_twind.style`self-end`,
          labelRequired: apathia_twind.tw`${mark}`,
          content: apathia_twind.style`flex-auto`
        };
      };
      const styles = getFormItemStyle();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(containerClasses.value)
        }, [
          _ctx.label || _ctx.offset || _ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock("label", {
            key: 0,
            class: vue.normalizeClass(labelClasses.value),
            style: vue.normalizeStyle(labelStyle.value)
          }, [
            vue.renderSlot(_ctx.$slots, "label", {}, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
            ])
          ], 6)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", {
            class: vue.normalizeClass([vue.unref(styles).content, _ctx.contentClass])
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2)
        ], 2);
      };
    }
  });
  exports2.Form = _sfc_main$1;
  exports2.FormItem = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
