(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.button"), require("@apathia/apathia.custom-render"), require("@apathia/apathia.twind"), require("@apathia/apathia.modal")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.button", "@apathia/apathia.custom-render", "@apathia/apathia.twind", "@apathia/apathia.modal"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.confirm = {}, global.Vue, global.button, global["custom-render"], global.twind, global.modal));
})(this, function(exports2, vue, apathia_button, apathia_customRender, apathia_twind, apathia_modal) {
  "use strict";
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Confirm"
    },
    __name: "Confirm",
    props: {
      render: {},
      renderFooter: {},
      confirmText: { default: "\u786E\u8BA4" },
      cancelText: { default: "\u53D6\u6D88" },
      confirm: {},
      cancel: {},
      btnPosition: { default: "right" }
    },
    setup(__props) {
      const props = __props;
      const btnLayout = initStyle(props.btnPosition);
      function initStyle(pos) {
        const baseLayout = apathia_twind.apply`mt-4 flex`;
        const position = {
          left: apathia_twind.apply`justify-start`,
          center: apathia_twind.apply`justify-center`,
          right: apathia_twind.apply`justify-end`
        };
        return apathia_twind.tw`${baseLayout} ${position[pos] || position.left}`;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(vue.unref(apathia_customRender.CustomRender), { render: _ctx.render }, null, 8, ["render"]),
          _ctx.renderFooter ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_customRender.CustomRender), {
            key: 0,
            render: _ctx.renderFooter,
            confirm: _ctx.confirm,
            cancel: _ctx.cancel
          }, null, 8, ["render", "confirm", "cancel"])) : (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: vue.normalizeClass(vue.unref(btnLayout))
          }, [
            vue.createVNode(vue.unref(apathia_button.BaseButton), {
              secondary: "",
              onClick: _ctx.cancel
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(_ctx.cancelText), 1)
              ]),
              _: 1
            }, 8, ["onClick"]),
            vue.createVNode(vue.unref(apathia_button.BaseButton), {
              primary: "",
              onClick: _ctx.confirm
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(_ctx.confirmText), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ], 2))
        ]);
      };
    }
  });
  function __rest(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  const defaultOptions = {
    title: "",
    render: "",
    confirmText: "\u786E\u8BA4",
    cancelText: "\u53D6\u6D88",
    btnPosition: "right"
  };
  function useConfirm() {
    const { modal, remove } = apathia_modal.useModal();
    function confirm(options) {
      const _a = Object.assign(Object.assign({}, defaultOptions), options), { render, renderFooter, confirmText, cancelText, btnPosition } = _a, modalOptions = __rest(_a, ["render", "renderFooter", "confirmText", "cancelText", "btnPosition"]);
      const confirmOptions = {
        render,
        renderFooter,
        confirmText,
        cancelText,
        btnPosition
      };
      return new Promise((resolve, reject) => {
        function doConfirm() {
          resolve(null);
          remove();
        }
        function doCancel() {
          reject();
          remove();
        }
        modal(Object.assign(Object.assign({ showClose: false, width: 450 }, modalOptions), { render: () => vue.h(_sfc_main, Object.assign(Object.assign({}, confirmOptions), { confirm: doConfirm, cancel: doCancel })) }));
      });
    }
    return { confirm, remove };
  }
  exports2.Confirm = _sfc_main;
  exports2.useConfirm = useConfirm;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
