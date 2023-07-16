(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.hooks", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.tabs = {}, global.Vue, global.hooks, global.twind));
})(this, function(exports2, vue, apathia_hooks, apathia_twind) {
  "use strict";
  const _hoisted_1 = ["onClick"];
  const _sfc_main = vue.defineComponent({
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
      const styleFn = (str) => apathia_twind.tw`${apathia_twind.apply`${str}`}`;
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
      const { contentRef } = apathia_hooks.useScrollX();
      function changeNav(tab) {
        emit("update:modelValue", tab);
        emit("navChange", tab);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(style).outContainerClass)
        }, [
          vue.createElementVNode("ul", {
            ref_key: "contentRef",
            ref: contentRef,
            class: vue.normalizeClass(vue.unref(style).containerClass)
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.list, (tab, index) => {
              return vue.openBlock(), vue.createElementBlock("li", {
                key: index,
                class: vue.normalizeClass([
                  vue.unref(style).tabClass,
                  _ctx.modelValue === tab ? vue.unref(style).tabActiveClass : ""
                ]),
                onClick: ($event) => changeNav(tab)
              }, vue.toDisplayString(_ctx.showLabel(tab)), 11, _hoisted_1);
            }), 128))
          ], 2)
        ], 2);
      };
    }
  });
  exports2.Tabs = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
