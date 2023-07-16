(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("@apathia/apathia.custom-render"), require("@apathia/apathia.hooks"), require("@apathia/apathia.shared")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "@apathia/apathia.custom-render", "@apathia/apathia.hooks", "@apathia/apathia.shared"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.modal = {}, global.Vue, global.twind, global["custom-render"], global.hooks, global.shared));
})(this, function(exports2, vue, apathia_twind, apathia_customRender, apathia_hooks, apathia_shared) {
  "use strict";
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
      stopListener = apathia_hooks.useEventListener("keydown", (event) => {
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
    const shadeRef = vue.ref(null);
    const modalRef = vue.ref(null);
    const widthStyle = getWidthStyle(props.width, props.top);
    const isTemplate = !!slots.default;
    apathia_shared.mountContainerDom("modal");
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
      vue.nextTick(() => {
        apathia_hooks.onClickOutside(modalRef, handleClose);
      });
    }
    vue.watch(() => props.modelValue, (show) => {
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
  const _sfc_main = vue.defineComponent({
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
      const slots = vue.useSlots();
      const { shadeRef, modalRef, widthStyle, close, isTemplate } = createModal(
        props,
        emits,
        slots
      );
      const slideIn = apathia_twind.keyframes`
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `;
      const slideInCss = apathia_twind.css({
        animation: "0.5s ease",
        animationName: slideIn,
        animationFillMode: "forwards"
      });
      const flash = apathia_twind.keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;
      const flashCss = apathia_twind.css({
        animation: "0.5s ease",
        animationName: flash
      });
      const shadeClass = apathia_twind.style`fixed inset-0 h-full bg-fill-gray bg-opacity-50 overflow-auto ${flashCss}`;
      const modalClass = apathia_twind.style`mx-auto rounded bg-fill-white mb-8 -translate-y-5 ${slideInCss}`;
      const modalHeaderClass = apathia_twind.style`flex justify-between p-4 rounded-t text-content-primary border(b solid fill-neutral)`;
      const modalContentClass = apathia_twind.style`p-4`;
      const delIconClass = apathia_twind.style`font-medium self-start ml-3 cursor-pointer hover:(text-error-primary)`;
      const titleClass = apathia_twind.tw`text-lg`;
      const subTitleClass = apathia_twind.tw`text-content-accent text-sm mt-0.5`;
      const transitionClass = {
        "leave-to-class": apathia_twind.tw`opacity-0`
      };
      const durationClass = apathia_twind.tw`duration-500`;
      return (_ctx, _cache) => {
        return vue.unref(isTemplate) ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
          key: 0,
          to: ".apathia-modal"
        }, [
          vue.createVNode(vue.Transition, vue.mergeProps(transitionClass, { onAfterLeave: vue.unref(showScrollbar) }), {
            default: vue.withCtx(() => [
              _ctx.modelValue ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: vue.normalizeClass(durationClass)
              }, [
                vue.createElementVNode("div", {
                  ref_key: "shadeRef",
                  ref: shadeRef,
                  class: vue.normalizeClass(shadeClass)
                }, [
                  vue.createElementVNode("div", {
                    ref_key: "modalRef",
                    ref: modalRef,
                    style: vue.normalizeStyle(vue.unref(widthStyle)),
                    class: vue.normalizeClass(modalClass)
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(modalHeaderClass)
                    }, [
                      vue.renderSlot(_ctx.$slots, "header", { close: vue.unref(close) }, () => [
                        vue.createElementVNode("div", null, [
                          vue.createElementVNode("p", {
                            class: vue.normalizeClass(titleClass)
                          }, vue.toDisplayString(_ctx.title), 1),
                          _ctx.subTitle ? (vue.openBlock(), vue.createElementBlock("p", {
                            key: 0,
                            class: vue.normalizeClass(subTitleClass)
                          }, vue.toDisplayString(_ctx.subTitle), 1)) : vue.createCommentVNode("", true)
                        ]),
                        _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("span", {
                          key: 0,
                          class: vue.normalizeClass(delIconClass),
                          onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(close) && vue.unref(close)(...args))
                        }, "\u2715")) : vue.createCommentVNode("", true)
                      ])
                    ]),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(modalContentClass)
                    }, [
                      vue.renderSlot(_ctx.$slots, "default", { close: vue.unref(close) })
                    ])
                  ], 4)
                ], 512)
              ])) : vue.createCommentVNode("", true)
            ]),
            _: 3
          }, 16, ["onAfterLeave"])
        ])) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          ref_key: "shadeRef",
          ref: shadeRef,
          class: vue.normalizeClass(shadeClass)
        }, [
          vue.createElementVNode("div", {
            ref_key: "modalRef",
            ref: modalRef,
            style: vue.normalizeStyle(vue.unref(widthStyle)),
            class: vue.normalizeClass(modalClass)
          }, [
            _ctx.renderHeader ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_customRender.CustomRender), {
              key: 0,
              render: _ctx.renderHeader
            }, null, 8, ["render"])) : (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(modalHeaderClass)
            }, [
              vue.createElementVNode("div", null, [
                vue.createElementVNode("p", {
                  class: vue.normalizeClass(titleClass)
                }, vue.toDisplayString(_ctx.title), 1),
                _ctx.subTitle ? (vue.openBlock(), vue.createElementBlock("p", {
                  key: 0,
                  class: vue.normalizeClass(subTitleClass)
                }, vue.toDisplayString(_ctx.subTitle), 1)) : vue.createCommentVNode("", true)
              ]),
              _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: vue.normalizeClass(delIconClass),
                onClick: _cache[1] || (_cache[1] = (...args) => vue.unref(close) && vue.unref(close)(...args))
              }, "\u2715")) : vue.createCommentVNode("", true)
            ])),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(modalContentClass)
            }, [
              vue.createVNode(vue.unref(apathia_customRender.CustomRender), { render: _ctx.render }, null, 8, ["render"])
            ])
          ], 4)
        ], 512)), [
          [vue.vShow, _ctx.modelValue]
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
  const ModalContainer = vue.defineComponent({
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
        "enter-from-class": apathia_twind.tw`opacity-0`,
        "enter-active-class": apathia_twind.tw`duration-500`,
        "leave-to-class": apathia_twind.tw`opacity-0`,
        "leave-active-class": apathia_twind.tw`duration-500`
      };
      return () => vue.h(vue.TransitionGroup, Object.assign(Object.assign({}, transitionGroupClass), { onAfterLeave: showScrollbar, tag: "div" }), {
        default() {
          return props.modalList.map((option) => vue.h("div", { key: option.id }, vue.h(_sfc_main, Object.assign(Object.assign({}, option.props), { onClose: () => {
            var _a, _b;
            remove(option.id);
            (_b = (_a = option.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
          } }))));
        }
      });
    }
  });
  const modalList = vue.ref([]);
  const getID = () => `${Date.now()}`;
  const removeModal = (id) => {
    const index = modalList.value.findIndex((item) => item.id === id);
    modalList.value.splice(index, 1);
  };
  const addModal = (props) => {
    const id = getID();
    const modalInstance = vue.ref({ props: Object.assign(Object.assign({}, modalDefaultProps), props), id });
    modalList.value.push(modalInstance.value);
    vue.nextTick(() => {
      modalInstance.value.props.modelValue = true;
    });
  };
  const modalKey = "apathia-modal";
  function modalInstall(app, injectKey) {
    const appContext = app._context;
    apathia_shared.mountContainerDom("modal");
    apathia_shared.mountComponent(vue.h(ModalContainer, {
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
    return vue.inject(key || modalKey);
  }
  exports2.Modal = _sfc_main;
  exports2.modalInstall = modalInstall;
  exports2.useModal = useModal;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
