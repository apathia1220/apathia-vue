import { isRef, ref, watch, onMounted, onUnmounted, nextTick, defineComponent, computed, openBlock, createElementBlock, Fragment, mergeProps, unref, renderSlot, createCommentVNode, createBlock, Transition, withCtx, withDirectives, createVNode, createElementVNode, vShow, Teleport, createTextVNode, toDisplayString, h, getCurrentInstance } from "vue";
import { tw, css, apply } from "@apathia/apathia.twind";
import { CustomRender } from "@apathia/apathia.custom-render";
import { createPopper } from "@popperjs/core";
import { useEventListener, onClickOutside } from "@apathia/apathia.hooks";
import { mountContainerDom, mountComponent } from "@apathia/apathia.shared";
const isHTMLElement = (val) => val instanceof HTMLElement;
const isRefType = (val) => isRef(val);
const getArrowStyle = (color, bgc, borderc) => {
  const getArrowBase = () => {
    const popperArrowBefore = css`
      width: 10px;
      height: 10px;
      &:before {
        ${apply`
          absolute bg-content-primary inset-0 z-0 box-border transform rotate-45 
          border-solid border border-${borderc} bg-${bgc}
        `}
        content: ' ';
        width: 10px;
        height: 10px;
      }
    `;
    return apply`absolute z-0 ${popperArrowBefore}`;
  };
  const arrowBase = tw(getArrowBase());
  const getContent = () => {
    const placeMap = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    const placeArr = Object.keys(placeMap);
    const arrowPosition = placeArr.map((v) => css`
          &[data-popper-placement^=${v}] .${arrowBase} {
            ${placeMap[v]}: -5px;
          }
        `);
    const borderMap = {
      top: "left",
      bottom: "right",
      left: "bottom",
      right: "top"
    };
    const borderArr = Object.keys(borderMap);
    const arrowBorder = borderArr.map((v) => css`
        &[data-popper-placement^=${v}] .${arrowBase}{
          &:before {
            border-${borderMap[v]}-color: transparent;
            border-${v}-color: transparent;
          }
        }
      `);
    return apply`bg-${bgc} max-w-md box-border rounded border-solid border border-${borderc} 
    p-3 z-50 text(${color} justify sm) shadow break-all ${arrowPosition} ${arrowBorder}`;
  };
  const content = getContent();
  return {
    arrowBase,
    content: tw`${content}`
  };
};
function usePopper(option, emitOption) {
  const contentRef = ref(null);
  const arrowRef = ref(null);
  const { emitVisible, emitHide, emitShow } = emitOption;
  mountContainerDom("popper");
  let target;
  if (option.component) {
    target = option.component;
  } else if (option.target) {
    target = option.target;
  } else {
    target = ref(null);
  }
  let instance = null;
  const getTarget = () => {
    if (isHTMLElement(target)) {
      return target;
    }
    return isRefType(target) ? target.value : target.$el;
  };
  const visibility = ref(!!option.modelValue);
  const detachPopper = () => {
    var _a;
    (_a = instance === null || instance === void 0 ? void 0 : instance.destroy) === null || _a === void 0 ? void 0 : _a.call(instance);
    instance = null;
  };
  let timer;
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const show = () => {
    if (option.disabled)
      return;
    visibility.value = true;
    if (typeof option.modelValue === "boolean") {
      emitVisible(true);
    }
    if (option.delayClose && option.trigger !== "hover") {
      clearTimer();
      timer = setTimeout(() => {
        close();
      }, option.delayClose);
    }
  };
  const close = () => {
    visibility.value = false;
    clearTimer();
    if (typeof option.modelValue === "boolean") {
      emitVisible(false);
    }
    if (option.disabled) {
      detachPopper();
    }
  };
  let stopArr = [];
  const handleEvent = () => {
    const targetEl = getTarget();
    if (!targetEl)
      return;
    if (option.trigger === "hover") {
      stopArr.push(useEventListener(targetEl, "mouseenter", () => {
        clearTimer();
        if (visibility.value) {
          return;
        }
        show();
      }));
      stopArr.push(useEventListener(targetEl, "mouseleave", () => {
        clearTimer();
        timer = setTimeout(() => {
          close();
        }, option.delayClose || option.delay);
      }));
    }
    if (option.trigger === "click") {
      stopArr.push(useEventListener(targetEl, "click", (e) => {
        e.stopPropagation();
        if (visibility.value) {
          close();
        } else {
          show();
        }
      }));
      stopArr.push(onClickOutside(targetEl, () => {
        if (visibility.value) {
          close();
        }
      }));
    }
    if (option.trigger === "focus") {
      stopArr.push(useEventListener(targetEl, "focusin", () => {
        if (visibility.value)
          return;
        show();
      }));
      stopArr.push(useEventListener(targetEl, "focusout", () => {
        close();
      }));
    }
  };
  const modifiersArr = [
    {
      name: "offset",
      options: {
        offset: [option.skidding, option.distance]
      }
    },
    {
      name: "computeStyles",
      options: {
        adaptive: false,
        gpuAcceleration: false
      }
    }
  ];
  const initPopper = () => {
    if (!visibility.value) {
      return;
    }
    if (option.showArrow) {
      modifiersArr.push({
        name: "arrow",
        phase: "main",
        options: {
          element: arrowRef.value
        }
      });
    }
    const targetEl = getTarget();
    const contentEl = contentRef.value;
    if (targetEl && contentEl) {
      createPopper(targetEl, contentEl, {
        placement: option.placement,
        modifiers: modifiersArr
      });
    }
  };
  const handleContentEvent = () => {
    const contentEl = contentRef.value;
    if (!contentEl)
      return;
    if (option.trigger === "hover") {
      stopArr.push(useEventListener(contentEl, "mouseenter", () => {
        clearTimer();
      }));
      stopArr.push(useEventListener(contentEl, "mouseleave", () => {
        clearTimer();
        timer = setTimeout(() => {
          close();
        }, option.delayClose || option.delay);
      }));
    }
    if (option.trigger === "click") {
      stopArr.push(useEventListener(contentEl, "mouseup", (e) => {
        e.stopPropagation();
      }));
      stopArr.push(useEventListener(contentEl, "click", (e) => {
        e.stopPropagation();
      }));
    }
  };
  const hasMounted = ref(visibility.value);
  const update = () => {
    if (!visibility.value)
      return;
    if (instance) {
      instance.update();
    } else {
      initPopper();
    }
  };
  const watchVisible = (val) => {
    if (!hasMounted.value) {
      hasMounted.value = true;
      nextTick(() => {
        update();
        handleContentEvent();
      });
      if (val) {
        emitShow(val, instance);
        return;
      }
    }
    if (val) {
      update();
      emitShow(val, instance);
      return;
    }
    emitHide(val, instance);
  };
  watch(visibility, watchVisible);
  const detachEvent = () => {
    stopArr.forEach((v) => {
      v();
    });
    stopArr = [];
  };
  onMounted(() => {
    handleEvent();
    initPopper();
  });
  onUnmounted(() => {
    if (timer)
      clearTimeout(timer);
    detachPopper();
    detachEvent();
  });
  const getContentProps = () => ({
    ref: (el) => {
      contentRef.value = el;
    }
  });
  const getArrowProps = () => ({
    ref: (el) => {
      arrowRef.value = el;
    }
  });
  const getTargetProps = () => ({
    ref: (el) => {
      if (isRefType(target)) {
        target.value = el;
      }
    }
  });
  return {
    getContentProps,
    getArrowProps,
    getTargetProps,
    update,
    instance,
    initPopper,
    detachPopper,
    visibility,
    getArrowStyle,
    hasMounted,
    show,
    close
  };
}
const _sfc_main = defineComponent({
  ...{
    name: "Popper",
    inheritAttrs: false
  },
  __name: "Popper",
  props: {
    distance: { default: 15 },
    skidding: { default: 0 },
    trigger: { default: "click" },
    dark: { type: Boolean, default: false },
    placement: { default: "top" },
    content: {},
    transitionClass: { default: () => ({
      "enter-active-class": tw`transition-opacity duration-200`,
      "leave-active-class": tw`transition-opacity duration-200`,
      "enter-from-class": tw`opacity-0`,
      "leave-to-class": tw`opacity-0`
    }) },
    showArrow: { type: Boolean, default: true },
    delay: { default: 300 },
    disabled: { type: Boolean, default: false },
    component: {},
    modelValue: { type: Boolean, default: void 0 },
    popperClass: { default: "" },
    appendToBody: { type: Boolean, default: true },
    render: { type: [String, Function], default: void 0 },
    target: { default: void 0 },
    delayClose: { default: void 0 }
  },
  emits: ["update:modelValue", "hide", "show", "afterHide"],
  setup(__props, { expose: __expose, emit }) {
    const props = __props;
    const {
      visibility,
      getArrowStyle: getArrowStyle2,
      hasMounted,
      getContentProps,
      getArrowProps,
      getTargetProps,
      show,
      close,
      update
    } = usePopper(props, {
      emitVisible: (val) => {
        emit("update:modelValue", val);
      },
      emitHide: (val, instance) => {
        emit("hide", val, instance);
      },
      emitShow: (val, instance) => {
        emit("show", val, instance);
      }
    });
    __expose({ update });
    if (props.trigger === "manual" || props.trigger === "hover" || props.trigger === "click") {
      watch(
        () => props.modelValue,
        (val) => {
          if (val !== void 0 && !props.disabled) {
            if (val) {
              show();
            } else {
              close();
            }
          }
        }
      );
    }
    const handleAfterHide = () => {
      emit("afterHide");
    };
    const getArrowStyles = (dark) => {
      if (dark) {
        return getArrowStyle2("content-white", "content-primary", "content-primary");
      }
      return getArrowStyle2("content-accent", "fill-white", "fill-light");
    };
    const styles = computed(() => ({
      popper: tw`inline-block`,
      ...getArrowStyles(props.dark)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        !_ctx.target ? (openBlock(), createElementBlock("div", mergeProps({ key: 0 }, { ...unref(getTargetProps)(), ..._ctx.$attrs }, {
          class: styles.value.popper
        }), [
          renderSlot(_ctx.$slots, "default")
        ], 16)) : createCommentVNode("", true),
        _ctx.render ? (openBlock(), createBlock(Transition, mergeProps({ key: 1 }, _ctx.transitionClass, { onAfterLeave: handleAfterHide }), {
          default: withCtx(() => [
            unref(hasMounted) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({ key: 0 }, { ...unref(getContentProps)() }, {
              class: `${styles.value.content} ${_ctx.popperClass}`
            }), [
              createVNode(unref(CustomRender), { render: _ctx.render }, null, 8, ["render"]),
              withDirectives(createElementVNode("div", mergeProps({ ...unref(getArrowProps)() }, {
                class: styles.value.arrowBase
              }), null, 16), [
                [vShow, _ctx.showArrow]
              ])
            ], 16)), [
              [vShow, unref(visibility)]
            ]) : createCommentVNode("", true)
          ]),
          _: 1
        }, 16)) : (openBlock(), createBlock(Teleport, {
          key: 2,
          to: ".apathia-popper",
          disabled: !_ctx.appendToBody
        }, [
          createVNode(Transition, mergeProps(_ctx.transitionClass, { onAfterLeave: handleAfterHide }), {
            default: withCtx(() => [
              unref(hasMounted) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({ key: 0 }, { ...unref(getContentProps)() }, {
                class: `${styles.value.content} ${_ctx.popperClass}`
              }), [
                renderSlot(_ctx.$slots, "content", {}, () => [
                  createTextVNode(toDisplayString(_ctx.content), 1)
                ]),
                _ctx.showArrow ? (openBlock(), createElementBlock("div", mergeProps({ key: 0 }, { ...unref(getArrowProps)() }, {
                  class: styles.value.arrowBase
                }), null, 16)) : createCommentVNode("", true)
              ], 16)), [
                [vShow, unref(visibility)]
              ]) : createCommentVNode("", true)
            ]),
            _: 3
          }, 16)
        ], 8, ["disabled"]))
      ], 64);
    };
  }
});
const PopperDefaultProp = {
  modelValue: false,
  delayClose: 1e3,
  trigger: "manual"
};
const PopperContainer = defineComponent({
  name: "PopperContainer",
  props: {
    popperList: {
      type: Array,
      default: () => []
    }
  },
  emits: ["updateContainer", "remove"],
  setup(props, { emit }) {
    const remove = (id) => emit("remove", id);
    const updateModelValue = (id, val) => emit("updateContainer", val, id);
    return () => h(Fragment, {}, props.popperList.map((option) => h(_sfc_main, Object.assign(Object.assign({}, option.props), { "onUpdate:modelValue": (e) => updateModelValue(option.id, e), key: option.id, onAfterHide: () => remove(option.id) }))));
  }
});
const popperList = ref([]);
const getID = () => `${Math.random()}`;
const removePopper = (id) => {
  const index = popperList.value.findIndex((item) => item.id === id);
  popperList.value.splice(index, 1);
};
const addPopper = (props) => {
  const id = getID();
  const popperInstance = { props: Object.assign(Object.assign({}, PopperDefaultProp), props), id };
  popperList.value.push(popperInstance);
  const { length } = popperList.value;
  nextTick(() => {
    popperList.value[length - 1].props.modelValue = true;
  });
};
const handleUpdateModelValue = (val, id) => {
  const index = popperList.value.findIndex((item) => item.id === id);
  popperList.value[index].props.modelValue = val;
};
function usePoppertip() {
  var _a;
  const appContext = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.appContext;
  mountContainerDom("popper");
  mountComponent(h(PopperContainer, {
    popperList: popperList.value,
    onUpdateContainer: handleUpdateModelValue,
    onRemove: removePopper
  }), ".apathia-popper", appContext);
  return {
    popper: addPopper
  };
}
const placement = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end"
];
export { _sfc_main as Popper, placement, usePoppertip };
