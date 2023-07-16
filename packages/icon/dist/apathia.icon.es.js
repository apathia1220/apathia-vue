import { defineComponent, openBlock, createElementBlock, mergeProps, renderSlot } from "vue";
import { isString } from "@apathia/apathia.shared";
var Icon_vue_vue_type_style_index_0_lang = "";
const _sfc_main = defineComponent({
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
        fontSize: props.size ? isString(props.size) ? props.size : `${props.size}px` : void 0,
        color: props.color || void 0
      };
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", mergeProps({
        style: styles()
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default")
      ], 16);
    };
  }
});
export { _sfc_main as Icon };
