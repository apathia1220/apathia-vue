(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.affix = {}, global.Vue, global.twind));
})(this, function(exports2, vue, apathia_twind) {
  "use strict";
  const _sfc_main = vue.defineComponent({
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
      const affixRef = vue.ref(null);
      const pointRef = vue.ref(null);
      const affix = vue.ref(false);
      const styles = vue.ref({});
      const slot = vue.ref(false);
      const slotStyle = vue.ref({});
      const offsetType = vue.computed(
        () => props.offsetBottom !== void 0 && props.offsetBottom >= 0 ? "bottom" : "top"
      );
      const fixedStyles = apathia_twind.tw`${apathia_twind.apply`fixed z-50`}`;
      const classes = vue.computed(() => ({
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
      vue.onMounted(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });
      });
      vue.onBeforeUnmount(() => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "affixRef",
          ref: affixRef
        }, [
          vue.createElementVNode("div", {
            ref_key: "pointRef",
            ref: pointRef,
            class: vue.normalizeClass(classes.value),
            style: vue.normalizeStyle(styles.value)
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 6),
          vue.withDirectives(vue.createElementVNode("div", {
            style: vue.normalizeStyle(slotStyle.value)
          }, null, 4), [
            [vue.vShow, slot.value]
          ])
        ], 512);
      };
    }
  });
  exports2.Affix = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
