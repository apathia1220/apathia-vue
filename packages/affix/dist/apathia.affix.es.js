import { defineComponent, ref, computed, onMounted, onBeforeUnmount, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, renderSlot, withDirectives, vShow } from "vue";
import { tw, apply } from "@apathia/apathia.twind";
const _sfc_main = defineComponent({
  ...{
    name: "Affix"
  },
  __name: "Affix",
  props: {
    offsetTop: { default: 0 },
    offsetBottom: {}
  },
  emits: ["change"],
  setup(__props, { emit }) {
    const props = __props;
    const affixRef = ref(null);
    const pointRef = ref(null);
    const affix = ref(false);
    const styles = ref({});
    const slot = ref(false);
    const slotStyle = ref({});
    const offsetType = computed(
      () => props.offsetBottom !== void 0 && props.offsetBottom >= 0 ? "bottom" : "top"
    );
    const fixedStyles = tw`${apply`fixed z-50`}`;
    const classes = computed(() => ({
      [fixedStyles]: affix.value
    }));
    const getWindowScroll = (top = false) => window[top ? "pageYOffset" : "pageXOffset"];
    const getOffset = (elem) => {
      const rect = elem.getBoundingClientRect();
      const scrollTop = getWindowScroll(true);
      const scrollLeft = getWindowScroll();
      const docEl = window.document.body || {};
      const clientTop = docEl.clientTop || 0;
      const clientLeft = docEl.clientLeft || 0;
      return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
      };
    };
    const isElHidden = (elem) => elem.offsetParent === null;
    const handleScroll = () => {
      const el = affixRef.value;
      if (!el) {
        return;
      }
      const scrollTop = getWindowScroll(true);
      const elOffset = getOffset(el);
      const isHidden = isElHidden(el);
      const windowHeight = window.innerHeight;
      const elHeight = el.getElementsByTagName("div")[0].offsetHeight;
      const isLeftChanged = styles.value && styles.value.left !== `${elOffset.left}px`;
      if (!isHidden && isLeftChanged && affix) {
        styles.value.left = `${elOffset.left}px`;
      }
      if (elOffset.top - props.offsetTop < scrollTop && offsetType.value === "top" && !affix.value) {
        if (!pointRef.value || !affixRef.value) {
          return;
        }
        affix.value = true;
        slot.value = true;
        styles.value = {
          top: `${props.offsetTop}px`,
          left: `${elOffset.left}px`,
          width: `${affixRef.value.offsetWidth}px`
        };
        emit("change", true);
      } else if (elOffset.top - props.offsetTop > scrollTop && offsetType.value === "top" && affix) {
        slot.value = false;
        slotStyle.value = {};
        affix.value = false;
        styles.value = {};
        emit("change", false);
      }
      if (props.offsetBottom !== void 0 && elOffset.top + props.offsetBottom + elHeight > scrollTop + windowHeight && offsetType.value === "bottom" && !affix.value) {
        if (!affixRef.value) {
          return;
        }
        affix.value = true;
        styles.value = {
          bottom: `${props.offsetBottom}px`,
          left: `${elOffset.left}px`,
          width: `${affixRef.value.offsetWidth}px`
        };
        emit("change", true);
      } else if (props.offsetBottom !== void 0 && elOffset.top + props.offsetBottom + elHeight < scrollTop + windowHeight && offsetType.value === "bottom" && affix) {
        affix.value = false;
        styles.value = {};
        emit("change", false);
      }
    };
    const handleResize = () => {
      const el = affixRef.value;
      if (!el) {
        return;
      }
      const elOffset = getOffset(el);
      if (affix.value) {
        const style = {
          left: `${elOffset.left}px`,
          width: `${el.offsetWidth}px`
        };
        if (offsetType.value === "top") {
          style.top = `${props.offsetTop}px`;
        } else {
          style.bottom = `${props.offsetBottom || 0}px`;
        }
        styles.value = style;
      }
      handleScroll();
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "affixRef",
        ref: affixRef
      }, [
        createElementVNode("div", {
          ref_key: "pointRef",
          ref: pointRef,
          class: normalizeClass(classes.value),
          style: normalizeStyle(styles.value)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6),
        withDirectives(createElementVNode("div", {
          style: normalizeStyle(slotStyle.value)
        }, null, 4), [
          [vShow, slot.value]
        ])
      ], 512);
    };
  }
});
export { _sfc_main as Affix };
