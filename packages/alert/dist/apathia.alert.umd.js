(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("@apathia/apathia.shared"), require("@apathia/apathia.custom-render"), require("@apathia/apathia.icon"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "@apathia/apathia.shared", "@apathia/apathia.custom-render", "@apathia/apathia.icon", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.alert = {}, global.Vue, global.twind, global.shared, global["custom-render"], global.icon, global["icon-svg"]));
})(this, function(exports2, vue, apathia_twind, apathia_shared, apathia_customRender, apathia_icon, apathia_iconSvg) {
  "use strict";
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Alert"
    },
    __name: "Alert",
    props: {
      type: { default: "default" },
      duration: { default: 3e3 },
      title: { default: "" },
      message: { default: "" },
      showIcon: { type: Boolean, default: true },
      showClose: { type: Boolean, default: true },
      render: {}
    },
    emits: ["close"],
    setup(__props, { emit }) {
      const props = __props;
      const iconMap = {
        info: apathia_iconSvg.InfoFilled,
        warning: apathia_iconSvg.WarningFilled,
        success: apathia_iconSvg.SuccessFilled,
        danger: apathia_iconSvg.CircleCloseFilled,
        default: apathia_iconSvg.Notification
      };
      function initAlertStyle(type) {
        const Theme = {
          info: {
            layout: apathia_twind.style`bg-fill-light text-fill-primary`
          },
          danger: {
            layout: apathia_twind.style`bg-error-light text-error-primary`
          },
          success: {
            layout: apathia_twind.style`bg-success-light text-success-primary`
          },
          warning: {
            layout: apathia_twind.style`bg-warning-light text-warning-primary`
          },
          default: {
            layout: apathia_twind.style`bg-brand-light text-brand-primary`
          }
        };
        const theme = Theme[type] || Theme.default;
        const layout2 = apathia_twind.tw`${theme.layout} ${apathia_twind.apply`p-2.5 rounded flex mt-2 duration-300`}`;
        const iconWrap2 = apathia_twind.style`flex-shrink-0 w-4 mr-3 mt-0.5`;
        const delIcon2 = apathia_twind.style`ml-2 cursor-pointer hover:(text-error-active)`;
        const contentClass2 = apathia_twind.style`inline-block font-normal flex-grow break-all`;
        const titleClass2 = apathia_twind.style`text-lg`;
        const messageClass2 = apathia_twind.style`text-xs leading-normal`;
        return {
          layout: layout2,
          iconWrap: iconWrap2,
          delIcon: delIcon2,
          contentClass: contentClass2,
          titleClass: titleClass2,
          messageClass: messageClass2
        };
      }
      const { layout, iconWrap, delIcon, contentClass, titleClass, messageClass } = initAlertStyle(props.type);
      let timer;
      function close() {
        clearTimer();
        emit("close");
      }
      function clearTimer() {
        clearTimeout(timer);
      }
      function resetTimer() {
        if (props.duration) {
          clearTimer();
          timer = setTimeout(close, props.duration);
        }
      }
      vue.onMounted(resetTimer);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(layout)),
          onMouseenter: clearTimer,
          onMouseleave: resetTimer
        }, [
          !_ctx.render ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            _ctx.showIcon ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(vue.unref(iconWrap))
            }, [
              vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                vue.createVNode(vue.unref(apathia_icon.Icon), { size: 20 }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(iconMap[_ctx.type])))
                  ]),
                  _: 1
                })
              ])
            ], 2)) : vue.createCommentVNode("", true),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(vue.unref(contentClass))
            }, [
              _ctx.title ? (vue.openBlock(), vue.createElementBlock("p", {
                key: 0,
                class: vue.normalizeClass(vue.unref(titleClass))
              }, vue.toDisplayString(_ctx.title), 3)) : vue.createCommentVNode("", true),
              _ctx.message ? (vue.openBlock(), vue.createElementBlock("p", {
                key: 1,
                class: vue.normalizeClass(vue.unref(messageClass))
              }, vue.toDisplayString(_ctx.message), 3)) : vue.createCommentVNode("", true)
            ], 2),
            vue.createElementVNode("span", {
              class: vue.normalizeClass(vue.unref(delIcon)),
              onClick: close
            }, " \u2715 ", 2)
          ], 64)) : (vue.openBlock(), vue.createBlock(vue.unref(apathia_customRender.CustomRender), {
            key: 1,
            render: () => _ctx.render && _ctx.render({ close })
          }, null, 8, ["render"]))
        ], 34);
      };
    }
  });
  const AlertContainer = vue.defineComponent({
    name: "AlertContainer",
    props: {
      alertList: {
        type: Array,
        default: () => []
      }
    },
    emits: ["remove"],
    setup(props, {
      emit
    }) {
      const remove2 = (index) => emit("remove", index);
      const rootClass = apathia_twind.style`left-1/2 -translate-x-1/2 w-96 fixed z-alert top-1` + " alert-open";
      const transitionGroupClass = {
        "enter-from-class": apathia_twind.tw`opacity-0`,
        "leave-to-class": apathia_twind.tw`opacity-0`,
        "leave-active-class": apathia_twind.tw`absolute w-full`
      };
      return () => vue.h("div", {
        class: rootClass
      }, [vue.h(vue.TransitionGroup, Object.assign(Object.assign({}, transitionGroupClass), {
        tag: "div"
      }), {
        default: () => props.alertList.map((option) => vue.h(_sfc_main, Object.assign(Object.assign({}, option.props), {
          key: option.id,
          onClose: () => {
            remove2(option.id);
          }
        })))
      })]);
    }
  });
  const alertList = vue.ref([]);
  const remove = (id) => {
    const index = alertList.value.findIndex((item) => item.id === id);
    alertList.value.splice(index, 1);
  };
  const getID = () => `${Date.now()}`;
  const Alert = (props) => {
    const id = getID();
    alertList.value.push({
      props,
      id
    });
    if (!document.querySelector(".apathia-alert")) {
      const alertContainerDom = document.createElement("div");
      alertContainerDom.className = "apathia-alert";
      document.body.appendChild(alertContainerDom);
      apathia_shared.mountComponent(vue.h(AlertContainer, {
        alertList: alertList.value,
        onRemove: remove
      }), alertContainerDom);
    }
  };
  Alert.closeAll = () => alertList.value = [];
  Alert.info = (title, message, props) => Alert(Object.assign({
    type: "info",
    title,
    message
  }, props));
  Alert.warning = (title, message, props) => Alert(Object.assign({
    type: "warning",
    title,
    message
  }, props));
  Alert.danger = (title, message, props) => Alert(Object.assign({
    type: "danger",
    title,
    message
  }, props));
  Alert.success = (title, message, props) => Alert(Object.assign({
    type: "success",
    title,
    message
  }, props));
  Alert.default = (title, message, props) => Alert(Object.assign({
    type: "default",
    title,
    message
  }, props));
  const alertKey = "apathia-toast";
  function toastInstall(app, injectKey) {
    app.provide(injectKey || alertKey, Alert);
    app.config.globalProperties.$toast = Alert;
  }
  function useToast(key) {
    return vue.inject(key || alertKey);
  }
  exports2.toast = Alert;
  exports2.toastInstall = toastInstall;
  exports2.useToast = useToast;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
