(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.shared")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.shared"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.icon = {}, global.Vue, global.shared));
})(this, function(exports2, vue, apathia_shared) {
  "use strict";
  var Icon_vue_vue_type_style_index_0_lang = "";
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Icon",
      inheritAttrs: false
    },
    __name: "Icon",
    props: {
      color: {},
      size: {}
    },
    setup(__props) {
      const props = __props;
      const styles = () => {
        if (!props.color && !props.size)
          return {};
        return {
          fontSize: props.size ? apathia_shared.isString(props.size) ? props.size : `${props.size}px` : void 0,
          color: props.color || void 0
        };
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
          style: styles()
        }, _ctx.$attrs), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 16);
      };
    }
  });
  exports2.Icon = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
