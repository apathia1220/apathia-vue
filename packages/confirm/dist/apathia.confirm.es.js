import { defineComponent, openBlock, createElementBlock, createVNode, unref, createBlock, normalizeClass, withCtx, createTextVNode, toDisplayString, h } from "vue";
import { BaseButton } from "@apathia/apathia.button";
import { CustomRender } from "@apathia/apathia.custom-render";
import { apply, tw } from "@apathia/apathia.twind";
import { useModal } from "@apathia/apathia.modal";
const _sfc_main = defineComponent({
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
      const baseLayout = apply`mt-4 flex`;
      const position = {
        left: apply`justify-start`,
        center: apply`justify-center`,
        right: apply`justify-end`
      };
      return tw`${baseLayout} ${position[pos] || position.left}`;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(unref(CustomRender), { render: _ctx.render }, null, 8, ["render"]),
        _ctx.renderFooter ? (openBlock(), createBlock(unref(CustomRender), {
          key: 0,
          render: _ctx.renderFooter,
          confirm: _ctx.confirm,
          cancel: _ctx.cancel
        }, null, 8, ["render", "confirm", "cancel"])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(btnLayout))
        }, [
          createVNode(unref(BaseButton), {
            secondary: "",
            onClick: _ctx.cancel
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.cancelText), 1)
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(unref(BaseButton), {
            primary: "",
            onClick: _ctx.confirm
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.confirmText), 1)
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
  const { modal, remove } = useModal();
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
      modal(Object.assign(Object.assign({ showClose: false, width: 450 }, modalOptions), { render: () => h(_sfc_main, Object.assign(Object.assign({}, confirmOptions), { confirm: doConfirm, cancel: doCancel })) }));
    });
  }
  return { confirm, remove };
}
export { _sfc_main as Confirm, useConfirm };
