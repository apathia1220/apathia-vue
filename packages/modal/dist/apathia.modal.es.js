import { ref, watch, nextTick, defineComponent, useSlots, unref, openBlock, createBlock, Teleport, createVNode, Transition, mergeProps, withCtx, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, renderSlot, toDisplayString, createCommentVNode, withDirectives, vShow, h, TransitionGroup, inject } from "vue";
import { keyframes, css, style, tw } from "@apathia/apathia.twind";
import { CustomRender } from "@apathia/apathia.custom-render";
import { useEventListener, onClickOutside } from "@apathia/apathia.hooks";
import { mountContainerDom, mountComponent } from "@apathia/apathia.shared";
const modalStack = [];
let stopListener = () => {
};
function popModalStack() {
  modalStack.pop();
}
function tryCloseLastModal(isEsc) {
  if (modalStack.length > 0) {
    const lastModal = modalStack[modalStack.length - 1];
    if (lastModal.props.beforeClose && !lastModal.props.beforeClose())
      return;
    if (!lastModal.props.keyboard && isEsc)
      return;
    lastModal === null || lastModal === void 0 ? void 0 : lastModal.close();
    if (modalStack.length === 0)
      stopListener();
  }
}
function pushModal(modal) {
  modalStack.push(modal);
  if (modalStack.length === 1) {
    stopListener = useEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        tryCloseLastModal(true);
      }
    });
  }
}
function hideScrollbar() {
  if (typeof window === "undefined")
    return;
  const html = document.documentElement;
  if (html.scrollHeight - html.clientHeight > 0) {
    document.body.style.overflow = "hidden";
    document.body.style.width = "calc(100% - 15px)";
  }
}
function showScrollbar() {
  if (typeof window === "undefined")
    return;
  if (modalStack.length === 0) {
    document.body.style.overflow = "auto";
    document.body.style.width = "auto";
  }
}
function createModal(props, emit, slots) {
  const shadeRef = ref(null);
  const modalRef = ref(null);
  const widthStyle = getWidthStyle(props.width, props.top);
  const isTemplate = !!slots.default;
  mountContainerDom("modal");
  function templateClose() {
    if (props.beforeClose && props.beforeClose()) {
      emit("update:modelValue", false);
      popModalStack();
    }
  }
  function functionClose() {
    if (props.beforeClose && props.beforeClose()) {
      emit("close");
      popModalStack();
    }
  }
  const close = isTemplate ? templateClose : functionClose;
  function bindClickOutside() {
    if (props.maskClosable === false)
      return;
    function handleClose() {
      if (props.beforeClose && props.beforeClose()) {
        close();
      }
    }
    nextTick(() => {
      onClickOutside(modalRef, handleClose);
    });
  }
  watch(() => props.modelValue, (show) => {
    if (show) {
      pushModal({ close, props });
      hideScrollbar();
      bindClickOutside();
      if (shadeRef.value) {
        shadeRef.value.scrollTop = 0;
      }
    } else {
      emit("close");
    }
  });
  return {
    shadeRef,
    modalRef,
    widthStyle,
    close,
    isTemplate
  };
}
function getWidthStyle(width, top) {
  return `
    width: ${width}${typeof width === "number" ? "px" : ""};
    margin-top: ${top}${typeof top === "number" ? "px" : ""};
  `;
}
const _sfc_main = defineComponent({
  ...{
    name: "Modal"
  },
  __name: "Modal",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { default: "" },
    subTitle: { default: "" },
    render: { type: [String, Function], default: () => null },
    renderHeader: { type: [String, Function], default: () => null },
    top: { default: 60 },
    width: { default: 640 },
    showClose: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: false },
    keyboard: { type: Boolean, default: true },
    beforeClose: { type: Function, default: () => true },
    onClose: {}
  },
  emits: ["update:modelValue", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const slots = useSlots();
    const { shadeRef, modalRef, widthStyle, close, isTemplate } = createModal(
      props,
      emits,
      slots
    );
    const slideIn = keyframes`
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `;
    const slideInCss = css({
      animation: "0.5s ease",
      animationName: slideIn,
      animationFillMode: "forwards"
    });
    const flash = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;
    const flashCss = css({
      animation: "0.5s ease",
      animationName: flash
    });
    const shadeClass = style`fixed inset-0 h-full bg-fill-gray bg-opacity-50 overflow-auto ${flashCss}`;
    const modalClass = style`mx-auto rounded bg-fill-white mb-8 -translate-y-5 ${slideInCss}`;
    const modalHeaderClass = style`flex justify-between p-4 rounded-t text-content-primary border(b solid fill-neutral)`;
    const modalContentClass = style`p-4`;
    const delIconClass = style`font-medium self-start ml-3 cursor-pointer hover:(text-error-primary)`;
    const titleClass = tw`text-lg`;
    const subTitleClass = tw`text-content-accent text-sm mt-0.5`;
    const transitionClass = {
      "leave-to-class": tw`opacity-0`
    };
    const durationClass = tw`duration-500`;
    return (_ctx, _cache) => {
      return unref(isTemplate) ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: ".apathia-modal"
      }, [
        createVNode(Transition, mergeProps(transitionClass, { onAfterLeave: unref(showScrollbar) }), {
          default: withCtx(() => [
            _ctx.modelValue ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(durationClass)
            }, [
              createElementVNode("div", {
                ref_key: "shadeRef",
                ref: shadeRef,
                class: normalizeClass(shadeClass)
              }, [
                createElementVNode("div", {
                  ref_key: "modalRef",
                  ref: modalRef,
                  style: normalizeStyle(unref(widthStyle)),
                  class: normalizeClass(modalClass)
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(modalHeaderClass)
                  }, [
                    renderSlot(_ctx.$slots, "header", { close: unref(close) }, () => [
                      createElementVNode("div", null, [
                        createElementVNode("p", {
                          class: normalizeClass(titleClass)
                        }, toDisplayString(_ctx.title), 1),
                        _ctx.subTitle ? (openBlock(), createElementBlock("p", {
                          key: 0,
                          class: normalizeClass(subTitleClass)
                        }, toDisplayString(_ctx.subTitle), 1)) : createCommentVNode("", true)
                      ]),
                      _ctx.showClose ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(delIconClass),
                        onClick: _cache[0] || (_cache[0] = (...args) => unref(close) && unref(close)(...args))
                      }, "\u2715")) : createCommentVNode("", true)
                    ])
                  ]),
                  createElementVNode("div", {
                    class: normalizeClass(modalContentClass)
                  }, [
                    renderSlot(_ctx.$slots, "default", { close: unref(close) })
                  ])
                ], 4)
              ], 512)
            ])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16, ["onAfterLeave"])
      ])) : withDirectives((openBlock(), createElementBlock("div", {
        key: 1,
        ref_key: "shadeRef",
        ref: shadeRef,
        class: normalizeClass(shadeClass)
      }, [
        createElementVNode("div", {
          ref_key: "modalRef",
          ref: modalRef,
          style: normalizeStyle(unref(widthStyle)),
          class: normalizeClass(modalClass)
        }, [
          _ctx.renderHeader ? (openBlock(), createBlock(unref(CustomRender), {
            key: 0,
            render: _ctx.renderHeader
          }, null, 8, ["render"])) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(modalHeaderClass)
          }, [
            createElementVNode("div", null, [
              createElementVNode("p", {
                class: normalizeClass(titleClass)
              }, toDisplayString(_ctx.title), 1),
              _ctx.subTitle ? (openBlock(), createElementBlock("p", {
                key: 0,
                class: normalizeClass(subTitleClass)
              }, toDisplayString(_ctx.subTitle), 1)) : createCommentVNode("", true)
            ]),
            _ctx.showClose ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(delIconClass),
              onClick: _cache[1] || (_cache[1] = (...args) => unref(close) && unref(close)(...args))
            }, "\u2715")) : createCommentVNode("", true)
          ])),
          createElementVNode("div", {
            class: normalizeClass(modalContentClass)
          }, [
            createVNode(unref(CustomRender), { render: _ctx.render }, null, 8, ["render"])
          ])
        ], 4)
      ], 512)), [
        [vShow, _ctx.modelValue]
      ]);
    };
  }
});
const modalDefaultProps = {
  modelValue: false,
  title: "Title",
  subTitle: "",
  top: 60,
  width: 640,
  showClose: true,
  maskClosable: false,
  keyboard: true,
  render: ""
};
const ModalContainer = defineComponent({
  name: "ModalContainer",
  props: {
    modalList: {
      type: Array,
      default: () => []
    }
  },
  emits: ["remove"],
  setup(props, { emit }) {
    const remove = (id) => emit("remove", id);
    const transitionGroupClass = {
      "enter-from-class": tw`opacity-0`,
      "enter-active-class": tw`duration-500`,
      "leave-to-class": tw`opacity-0`,
      "leave-active-class": tw`duration-500`
    };
    return () => h(TransitionGroup, Object.assign(Object.assign({}, transitionGroupClass), { onAfterLeave: showScrollbar, tag: "div" }), {
      default() {
        return props.modalList.map((option) => h("div", { key: option.id }, h(_sfc_main, Object.assign(Object.assign({}, option.props), { onClose: () => {
          var _a, _b;
          remove(option.id);
          (_b = (_a = option.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
        } }))));
      }
    });
  }
});
const modalList = ref([]);
const getID = () => `${Date.now()}`;
const removeModal = (id) => {
  const index = modalList.value.findIndex((item) => item.id === id);
  modalList.value.splice(index, 1);
};
const addModal = (props) => {
  const id = getID();
  const modalInstance = ref({ props: Object.assign(Object.assign({}, modalDefaultProps), props), id });
  modalList.value.push(modalInstance.value);
  nextTick(() => {
    modalInstance.value.props.modelValue = true;
  });
};
const modalKey = "apathia-modal";
function modalInstall(app, injectKey) {
  const appContext = app._context;
  mountContainerDom("modal");
  mountComponent(h(ModalContainer, {
    modalList: modalList.value,
    onRemove: removeModal
  }), ".apathia-modal", appContext);
  function open(props) {
    addModal(props);
    hideScrollbar();
  }
  const modalUtils = {
    modal: open,
    remove: tryCloseLastModal
  };
  app.provide(injectKey || modalKey, modalUtils);
  app.config.globalProperties.$modal = open;
  app.config.globalProperties.$removeModal = tryCloseLastModal;
}
function useModal(key) {
  return inject(key || modalKey);
}
export { _sfc_main as Modal, modalInstall, useModal };
