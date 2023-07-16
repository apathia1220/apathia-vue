(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("lodash-es"), require("@apathia/apathia.button"), require("@apathia/apathia.hooks")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "lodash-es", "@apathia/apathia.button", "@apathia/apathia.hooks"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.tag = {}, global.Vue, global.twind, global["lodash-es"], global.button, global.hooks));
})(this, function(exports2, vue, apathia_twind, lodashEs, apathia_button, apathia_hooks) {
  "use strict";
  const _sfc_main$1 = vue.defineComponent({
    ...{
      name: "Tag"
    },
    __name: "Tag",
    props: {
      text: { default: "" },
      iconClass: { default: "" },
      primary: { type: Boolean },
      success: { type: Boolean },
      danger: { type: Boolean },
      warning: { type: Boolean },
      hollow: { type: Boolean },
      closable: { type: Boolean, default: false }
    },
    emits: ["close"],
    setup(__props, { emit }) {
      const props = __props;
      const getTagStyle = () => {
        const size = apathia_twind.style`text-xs`;
        const theme = {
          default: apathia_twind.style`bg-fill-gray text-content-accent`,
          primary: apathia_twind.style`bg-brand-light text-brand-primary`,
          success: apathia_twind.style`bg-success-light text-success-primary`,
          danger: apathia_twind.style`bg-error-light text-error-primary`,
          warning: apathia_twind.style`bg-warning-light text-warning-primary`
        };
        const hollow = apathia_twind.style`border bg-opacity-40`;
        const icon = apathia_twind.style`inline-block`;
        const layout = apathia_twind.style`inline-flex items-center mr-1 px-1.5 py-1 rounded cursor-default font-medium`;
        const delIcon = apathia_twind.style`inline-block cursor-pointer ml-1.5 hover:(text-error-primary)`;
        return {
          theme,
          layout,
          delIcon,
          icon,
          size,
          hollow
        };
      };
      const styles = getTagStyle();
      const formDisabled = vue.inject("FormDisabled", false);
      const withinTags = vue.inject("WithinTags", false);
      const handleClose = () => {
        emit("close");
      };
      const themeClasses = vue.computed(() => ({
        [styles.theme.default]: !(props.primary || props.success || props.danger || props.warning),
        [styles.theme.primary]: props.primary,
        [styles.theme.success]: props.success,
        [styles.theme.danger]: props.danger,
        [styles.theme.warning]: props.warning,
        [styles.hollow]: props.hollow
      }));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("li", {
          class: vue.normalizeClass({
            ...themeClasses.value,
            [vue.unref(styles).size]: true,
            [vue.unref(styles).layout]: true
          })
        }, [
          _ctx.iconClass ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass({
              [_ctx.iconClass]: true,
              [vue.unref(styles).icon]: true
            })
          }, null, 2)) : vue.createCommentVNode("", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString(_ctx.text), 1)
          ]),
          _ctx.closable && !vue.unref(formDisabled) && vue.unref(withinTags) ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            class: vue.normalizeClass(vue.unref(styles).delIcon),
            onClick: handleClose
          }, " \u2715 ", 2)) : vue.createCommentVNode("", true)
        ], 2);
      };
    }
  });
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Tags"
    },
    __name: "Tags",
    props: {
      modelValue: {},
      primary: { type: Boolean },
      success: { type: Boolean },
      danger: { type: Boolean },
      warning: { type: Boolean },
      hollow: { type: Boolean },
      closable: { type: Boolean, default: false },
      showTag: { type: Function, default: (tag) => tag },
      handleTag: { type: Function, default: (str) => str },
      disabled: { type: Boolean, default: void 0 }
    },
    emits: ["change", "update:modelValue"],
    setup(__props, { emit }) {
      const props = __props;
      const getTagsStyle = () => {
        const tagClass = apathia_twind.style`duration-300 my-1`;
        const inputWrap = apathia_twind.style`inline-block w-20 m-1`;
        const addBtn = apathia_twind.style`w-20 text-xs`;
        const list = apathia_twind.style`inline-block`;
        return {
          list,
          addBtn,
          tagClass,
          inputWrap
        };
      };
      vue.provide("WithinTags", true);
      const styles = getTagsStyle();
      const [isAdding, , toggleAdding] = apathia_hooks.useToggle(false);
      const tagText = vue.ref("");
      const disabledTags = apathia_hooks.useInjectProp(
        "FormDisabled",
        false,
        vue.toRef(props, "disabled")
      );
      function handleStartAdd() {
        if (disabledTags.value)
          return;
        toggleAdding(true);
      }
      function handleAppend() {
        const tags = [props.handleTag(tagText.value), ...lodashEs.cloneDeep(props.modelValue)];
        emit("update:modelValue", tags);
        emit("change", tags);
        tagText.value = "";
        toggleAdding(false);
      }
      const handleClose = (tag, index) => {
        const tags = lodashEs.cloneDeep(props.modelValue);
        tags.splice(index, 1);
        emit("update:modelValue", tags);
        emit("change", tags);
      };
      const getCloseable = (tag) => typeof tag !== "string" && tag.closable !== void 0 ? tag.closable : props.closable;
      const getTheme = (tag) => typeof tag !== "string" && tag.type !== void 0 ? { [tag.type]: true } : {
        default: !(props.success || props.primary || props.danger || props.warning),
        success: props.success,
        primary: props.primary,
        danger: props.danger,
        warning: props.warning
      };
      const getIconClass = (tag) => typeof tag !== "string" && tag.iconClass !== void 0 ? tag.iconClass : "";
      const tagList = vue.computed(
        () => props.modelValue.map((tag) => ({
          className: styles.tagClass,
          text: props.showTag(tag),
          iconClass: getIconClass(tag),
          theme: getTheme(tag),
          closable: getCloseable(tag)
        }))
      );
      return (_ctx, _cache) => {
        const _component_Input = vue.resolveComponent("Input");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(vue.TransitionGroup, {
            tag: "ul",
            name: "transition-primary",
            class: vue.normalizeClass(vue.unref(styles).list)
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tagList.value, (tag, index) => {
                return vue.openBlock(), vue.createBlock(_sfc_main$1, vue.mergeProps(tag.theme, {
                  key: tag.text,
                  class: tag.className,
                  "icon-class": tag.iconClass,
                  closable: tag.closable,
                  text: tag.text,
                  hollow: _ctx.hollow,
                  onClose: ($event) => handleClose(tag, index)
                }), null, 16, ["class", "icon-class", "closable", "text", "hollow", "onClose"]);
              }), 128)),
              vue.unref(isAdding) ? (vue.openBlock(), vue.createElementBlock("div", {
                key: "tag-inoupwrap",
                class: vue.normalizeClass(vue.unref(styles).inputWrap)
              }, [
                vue.createVNode(_component_Input, {
                  modelValue: tagText.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tagText.value = $event),
                  onKeyup: vue.withKeys(handleAppend, ["enter"]),
                  onBlur: _cache[1] || (_cache[1] = ($event) => vue.unref(toggleAdding)(false))
                }, null, 8, ["modelValue", "onKeyup"])
              ], 2)) : (vue.openBlock(), vue.createBlock(vue.unref(apathia_button.BaseButton), {
                key: "tag-btn",
                primary: "",
                small: "",
                disabled: vue.unref(disabledTags),
                class: vue.normalizeClass(vue.unref(styles).addBtn),
                onClick: _cache[2] || (_cache[2] = ($event) => handleStartAdd())
              }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "create", {}, () => [
                    vue.createTextVNode("+")
                  ])
                ]),
                _: 3
              }, 8, ["disabled", "class"]))
            ]),
            _: 3
          }, 8, ["class"])
        ]);
      };
    }
  });
  exports2.Tag = _sfc_main$1;
  exports2.Tags = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
