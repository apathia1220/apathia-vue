import { defineComponent, inject, computed, openBlock, createElementBlock, normalizeClass, unref, createCommentVNode, renderSlot, createTextVNode, toDisplayString, provide, ref, toRef, resolveComponent, createVNode, TransitionGroup, withCtx, Fragment, renderList, createBlock, mergeProps, withKeys } from "vue";
import { style } from "@apathia/apathia.twind";
import { cloneDeep } from "lodash-es";
import { BaseButton } from "@apathia/apathia.button";
import { useToggle, useInjectProp } from "@apathia/apathia.hooks";
const _sfc_main$1 = defineComponent({
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
      const size = style`text-xs`;
      const theme = {
        default: style`bg-fill-gray text-content-accent`,
        primary: style`bg-brand-light text-brand-primary`,
        success: style`bg-success-light text-success-primary`,
        danger: style`bg-error-light text-error-primary`,
        warning: style`bg-warning-light text-warning-primary`
      };
      const hollow = style`border bg-opacity-40`;
      const icon = style`inline-block`;
      const layout = style`inline-flex items-center mr-1 px-1.5 py-1 rounded cursor-default font-medium`;
      const delIcon = style`inline-block cursor-pointer ml-1.5 hover:(text-error-primary)`;
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
    const formDisabled = inject("FormDisabled", false);
    const withinTags = inject("WithinTags", false);
    const handleClose = () => {
      emit("close");
    };
    const themeClasses = computed(() => ({
      [styles.theme.default]: !(props.primary || props.success || props.danger || props.warning),
      [styles.theme.primary]: props.primary,
      [styles.theme.success]: props.success,
      [styles.theme.danger]: props.danger,
      [styles.theme.warning]: props.warning,
      [styles.hollow]: props.hollow
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        class: normalizeClass({
          ...themeClasses.value,
          [unref(styles).size]: true,
          [unref(styles).layout]: true
        })
      }, [
        _ctx.iconClass ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass({
            [_ctx.iconClass]: true,
            [unref(styles).icon]: true
          })
        }, null, 2)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.text), 1)
        ]),
        _ctx.closable && !unref(formDisabled) && unref(withinTags) ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(unref(styles).delIcon),
          onClick: handleClose
        }, " \u2715 ", 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _sfc_main = defineComponent({
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
      const tagClass = style`duration-300 my-1`;
      const inputWrap = style`inline-block w-20 m-1`;
      const addBtn = style`w-20 text-xs`;
      const list = style`inline-block`;
      return {
        list,
        addBtn,
        tagClass,
        inputWrap
      };
    };
    provide("WithinTags", true);
    const styles = getTagsStyle();
    const [isAdding, , toggleAdding] = useToggle(false);
    const tagText = ref("");
    const disabledTags = useInjectProp(
      "FormDisabled",
      false,
      toRef(props, "disabled")
    );
    function handleStartAdd() {
      if (disabledTags.value)
        return;
      toggleAdding(true);
    }
    function handleAppend() {
      const tags = [props.handleTag(tagText.value), ...cloneDeep(props.modelValue)];
      emit("update:modelValue", tags);
      emit("change", tags);
      tagText.value = "";
      toggleAdding(false);
    }
    const handleClose = (tag, index) => {
      const tags = cloneDeep(props.modelValue);
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
    const tagList = computed(
      () => props.modelValue.map((tag) => ({
        className: styles.tagClass,
        text: props.showTag(tag),
        iconClass: getIconClass(tag),
        theme: getTheme(tag),
        closable: getCloseable(tag)
      }))
    );
    return (_ctx, _cache) => {
      const _component_Input = resolveComponent("Input");
      return openBlock(), createElementBlock("div", null, [
        createVNode(TransitionGroup, {
          tag: "ul",
          name: "transition-primary",
          class: normalizeClass(unref(styles).list)
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(tagList.value, (tag, index) => {
              return openBlock(), createBlock(_sfc_main$1, mergeProps(tag.theme, {
                key: tag.text,
                class: tag.className,
                "icon-class": tag.iconClass,
                closable: tag.closable,
                text: tag.text,
                hollow: _ctx.hollow,
                onClose: ($event) => handleClose(tag, index)
              }), null, 16, ["class", "icon-class", "closable", "text", "hollow", "onClose"]);
            }), 128)),
            unref(isAdding) ? (openBlock(), createElementBlock("div", {
              key: "tag-inoupwrap",
              class: normalizeClass(unref(styles).inputWrap)
            }, [
              createVNode(_component_Input, {
                modelValue: tagText.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tagText.value = $event),
                onKeyup: withKeys(handleAppend, ["enter"]),
                onBlur: _cache[1] || (_cache[1] = ($event) => unref(toggleAdding)(false))
              }, null, 8, ["modelValue", "onKeyup"])
            ], 2)) : (openBlock(), createBlock(unref(BaseButton), {
              key: "tag-btn",
              primary: "",
              small: "",
              disabled: unref(disabledTags),
              class: normalizeClass(unref(styles).addBtn),
              onClick: _cache[2] || (_cache[2] = ($event) => handleStartAdd())
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "create", {}, () => [
                  createTextVNode("+")
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
export { _sfc_main$1 as Tag, _sfc_main as Tags };
