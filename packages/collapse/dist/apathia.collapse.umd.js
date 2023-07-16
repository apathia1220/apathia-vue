(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.icon"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind"), require("@apathia/apathia.shared"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.icon", "@apathia/apathia.hooks", "@apathia/apathia.twind", "@apathia/apathia.shared", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.collapse = {}, global.Vue, global.icon, global.hooks, global.twind, global.shared, global["icon-svg"]));
})(this, function(exports2, vue, apathia_icon, apathia_hooks, apathia_twind, apathia_shared, apathia_iconSvg) {
  "use strict";
  function useTransition(props) {
    function onEnter(el) {
      setHeight(el, "0px");
      setTransition(el, props.duration);
      apathia_shared.raf(() => {
        setHeight(el, `${el.scrollHeight}px`);
      });
    }
    function onLeave(el) {
      setHeight(el, `${el.scrollHeight}px`);
      setTransition(el, props.duration);
      apathia_shared.raf(() => {
        setHeight(el, "0px");
      });
    }
    const getTransitionProps = () => ({
      onEnter,
      onLeave,
      onAfterEnter: resetStyle,
      onAfterLeave: resetStyle
    });
    return {
      getTransitionProps
    };
  }
  function setTransition(el, time) {
    el.style.transition = `height ${time}ms`;
    el.style.overflow = "hidden";
  }
  function setHeight(el, height) {
    el.style.height = height;
  }
  function resetStyle(el) {
    el.style.height = "";
    el.style.transition = "";
    el.style.overflow = "";
  }
  var CollapseTransition = vue.defineComponent({
    name: "CollapseTransition",
    props: {
      duration: {
        type: Number,
        default: 400
      }
    },
    setup(props, { slots }) {
      const { getTransitionProps } = useTransition(props);
      return () => vue.h(vue.Transition, getTransitionProps(), slots);
    }
  });
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Collapse"
    },
    __name: "Collapse",
    props: {
      expand: { type: Boolean, default: true },
      duration: { default: 400 },
      header: { default: "header" },
      showArrow: { type: Boolean, default: true },
      disabled: { type: Boolean, default: false }
    },
    setup(__props) {
      const props = __props;
      const [show, toggleShow, setShow] = apathia_hooks.useToggle(props.expand);
      const styles = initStyle();
      vue.watch(
        () => props.expand,
        (val) => setShow(val)
      );
      const handleClick = () => {
        if (!props.disabled) {
          toggleShow();
        }
      };
      function initStyle() {
        const headerClass = apathia_twind.style`flex items-center h-10 leading-10 bg-fill-light rounded cursor-pointer`;
        const rollClass = apathia_twind.style`rotate-90 translate-y-0.5 duration-300`;
        const headerDisableClass = apathia_twind.style`cursor-not-allowed`;
        const icon = apathia_twind.style`mx-2 transition`;
        return {
          headerClass,
          rollClass,
          headerDisableClass,
          icon
        };
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.renderSlot(_ctx.$slots, "toggleHeader", {
            show: vue.unref(show),
            toggleShow: vue.unref(toggleShow)
          }, () => [
            vue.createElementVNode("div", {
              class: vue.normalizeClass([vue.unref(styles).headerClass, _ctx.disabled ? vue.unref(styles).headerDisableClass : ""]),
              onClick: handleClick
            }, [
              _ctx.showArrow ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                style: vue.normalizeStyle({ transform: `rotate(${vue.unref(show) ? 90 : 0}deg)` })
              }, [
                vue.createVNode(vue.unref(apathia_icon.Icon), {
                  class: vue.normalizeClass(vue.unref(styles).icon)
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(apathia_iconSvg.ArrowRight))
                  ]),
                  _: 1
                }, 8, ["class"])
              ], 4)) : vue.createCommentVNode("", true),
              vue.renderSlot(_ctx.$slots, "header", {}, () => [
                vue.createElementVNode("div", null, vue.toDisplayString(_ctx.header), 1)
              ])
            ], 2)
          ]),
          vue.createVNode(vue.unref(CollapseTransition), { duration: _ctx.duration }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createElementVNode("div", null, [
                vue.renderSlot(_ctx.$slots, "default")
              ], 512), [
                [vue.vShow, vue.unref(show)]
              ])
            ]),
            _: 3
          }, 8, ["duration"])
        ], 64);
      };
    }
  });
  exports2.Collapse = _sfc_main;
  exports2.CollapseTransition = CollapseTransition;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
