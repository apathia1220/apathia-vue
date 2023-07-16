import { defineComponent, h, Transition, watch, openBlock, createElementBlock, Fragment, renderSlot, unref, createElementVNode, normalizeClass, normalizeStyle, createVNode, withCtx, createCommentVNode, toDisplayString, withDirectives, vShow } from "vue";
import { Icon } from "@apathia/apathia.icon";
import { useToggle } from "@apathia/apathia.hooks";
import { style } from "@apathia/apathia.twind";
import { raf } from "@apathia/apathia.shared";
import { ArrowRight } from "@apathia/apathia.icon-svg";
function useTransition(props) {
  function onEnter(el) {
    setHeight(el, "0px");
    setTransition(el, props.duration);
    raf(() => {
      setHeight(el, `${el.scrollHeight}px`);
    });
  }
  function onLeave(el) {
    setHeight(el, `${el.scrollHeight}px`);
    setTransition(el, props.duration);
    raf(() => {
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
var CollapseTransition = defineComponent({
  name: "CollapseTransition",
  props: {
    duration: {
      type: Number,
      default: 400
    }
  },
  setup(props, { slots }) {
    const { getTransitionProps } = useTransition(props);
    return () => h(Transition, getTransitionProps(), slots);
  }
});
const _sfc_main = defineComponent({
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
    const [show, toggleShow, setShow] = useToggle(props.expand);
    const styles = initStyle();
    watch(
      () => props.expand,
      (val) => setShow(val)
    );
    const handleClick = () => {
      if (!props.disabled) {
        toggleShow();
      }
    };
    function initStyle() {
      const headerClass = style`flex items-center h-10 leading-10 bg-fill-light rounded cursor-pointer`;
      const rollClass = style`rotate-90 translate-y-0.5 duration-300`;
      const headerDisableClass = style`cursor-not-allowed`;
      const icon = style`mx-2 transition`;
      return {
        headerClass,
        rollClass,
        headerDisableClass,
        icon
      };
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        renderSlot(_ctx.$slots, "toggleHeader", {
          show: unref(show),
          toggleShow: unref(toggleShow)
        }, () => [
          createElementVNode("div", {
            class: normalizeClass([unref(styles).headerClass, _ctx.disabled ? unref(styles).headerDisableClass : ""]),
            onClick: handleClick
          }, [
            _ctx.showArrow ? (openBlock(), createElementBlock("span", {
              key: 0,
              style: normalizeStyle({ transform: `rotate(${unref(show) ? 90 : 0}deg)` })
            }, [
              createVNode(unref(Icon), {
                class: normalizeClass(unref(styles).icon)
              }, {
                default: withCtx(() => [
                  createVNode(unref(ArrowRight))
                ]),
                _: 1
              }, 8, ["class"])
            ], 4)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "header", {}, () => [
              createElementVNode("div", null, toDisplayString(_ctx.header), 1)
            ])
          ], 2)
        ]),
        createVNode(unref(CollapseTransition), { duration: _ctx.duration }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", null, [
              renderSlot(_ctx.$slots, "default")
            ], 512), [
              [vShow, unref(show)]
            ])
          ]),
          _: 3
        }, 8, ["duration"])
      ], 64);
    };
  }
});
export { _sfc_main as Collapse, CollapseTransition };
