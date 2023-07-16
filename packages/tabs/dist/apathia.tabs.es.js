import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, Fragment, renderList, toDisplayString } from "vue";
import { useScrollX } from "@apathia/apathia.hooks";
import { tw, apply } from "@apathia/apathia.twind";
const _hoisted_1 = ["onClick"];
const _sfc_main = defineComponent({
  ...{
    name: "Tabs"
  },
  __name: "Tabs",
  props: {
    modelValue: {},
    list: {},
    underline: { type: Boolean, default: false },
    showLabel: { type: Function, default: (tab) => tab }
  },
  emits: ["update:modelValue", "navChange"],
  setup(__props, { emit }) {
    const props = __props;
    const styleFn = (str) => tw`${apply`${str}`}`;
    function initStyle(underline) {
      const Theme = {
        default: {
          tab: "rounded hover:(text-brand-active) list-none",
          tabActive: "bg-brand-light text-brand-active"
        },
        underline: {
          tab: "border-b-2 border-transparent hover:(text-brand-active) list-none",
          tabActive: "border-brand-active text-brand-active"
        }
      };
      const theme = underline ? Theme.underline : Theme.default;
      return {
        outContainerClass: styleFn("p-1 overflow-hidden text-lg"),
        containerClass: styleFn("flex"),
        tabClass: styleFn(
          `font-medium m-1 p-2 cursor-pointer duration-300 ${theme.tab}`
        ),
        tabActiveClass: styleFn(`${theme.tabActive}`)
      };
    }
    const style = initStyle(props.underline);
    const { contentRef } = useScrollX();
    function changeNav(tab) {
      emit("update:modelValue", tab);
      emit("navChange", tab);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(style).outContainerClass)
      }, [
        createElementVNode("ul", {
          ref_key: "contentRef",
          ref: contentRef,
          class: normalizeClass(unref(style).containerClass)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (tab, index) => {
            return openBlock(), createElementBlock("li", {
              key: index,
              class: normalizeClass([
                unref(style).tabClass,
                _ctx.modelValue === tab ? unref(style).tabActiveClass : ""
              ]),
              onClick: ($event) => changeNav(tab)
            }, toDisplayString(_ctx.showLabel(tab)), 11, _hoisted_1);
          }), 128))
        ], 2)
      ], 2);
    };
  }
});
export { _sfc_main as Tabs };
