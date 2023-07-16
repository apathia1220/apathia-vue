(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.loading = {}, global.Vue, global.twind));
})(this, function(exports2, vue, apathia_twind) {
  "use strict";
  const _hoisted_1 = { class: "lds-spinner" };
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Loading"
    },
    __name: "Loading",
    setup(__props) {
      const getStyles = () => ({
        spinnerItem: apathia_twind.style`after:bg-brand-primary`
      });
      const styles = getStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).spinnerItem)
          }, null, 2)
        ]);
      };
    }
  });
  exports2.Loading = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
