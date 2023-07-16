import { defineComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, unref } from "vue";
import { style } from "@apathia/apathia.twind";
const _hoisted_1 = { class: "lds-spinner" };
const _sfc_main = defineComponent({
  ...{
    name: "Loading"
  },
  __name: "Loading",
  setup(__props) {
    const getStyles = () => ({
      spinnerItem: style`after:bg-brand-primary`
    });
    const styles = getStyles();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).spinnerItem)
        }, null, 2)
      ]);
    };
  }
});
export { _sfc_main as Loading };
