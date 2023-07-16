import { defineComponent, onMounted, openBlock, createElementBlock, normalizeClass, unref, Fragment, renderSlot, createVNode, withCtx, createBlock, resolveDynamicComponent, createCommentVNode, createElementVNode, toDisplayString, h, TransitionGroup, ref, inject } from "vue";
import { style, tw, apply } from "@apathia/apathia.twind";
import { mountComponent } from "@apathia/apathia.shared";
import { CustomRender } from "@apathia/apathia.custom-render";
import { Icon } from "@apathia/apathia.icon";
import { InfoFilled, WarningFilled, SuccessFilled, CircleCloseFilled, Notification } from "@apathia/apathia.icon-svg";
const _sfc_main = defineComponent({
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
      info: InfoFilled,
      warning: WarningFilled,
      success: SuccessFilled,
      danger: CircleCloseFilled,
      default: Notification
    };
    function initAlertStyle(type) {
      const Theme = {
        info: {
          layout: style`bg-fill-light text-fill-primary`
        },
        danger: {
          layout: style`bg-error-light text-error-primary`
        },
        success: {
          layout: style`bg-success-light text-success-primary`
        },
        warning: {
          layout: style`bg-warning-light text-warning-primary`
        },
        default: {
          layout: style`bg-brand-light text-brand-primary`
        }
      };
      const theme = Theme[type] || Theme.default;
      const layout2 = tw`${theme.layout} ${apply`p-2.5 rounded flex mt-2 duration-300`}`;
      const iconWrap2 = style`flex-shrink-0 w-4 mr-3 mt-0.5`;
      const delIcon2 = style`ml-2 cursor-pointer hover:(text-error-active)`;
      const contentClass2 = style`inline-block font-normal flex-grow break-all`;
      const titleClass2 = style`text-lg`;
      const messageClass2 = style`text-xs leading-normal`;
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
    onMounted(resetTimer);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(layout)),
        onMouseenter: clearTimer,
        onMouseleave: resetTimer
      }, [
        !_ctx.render ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _ctx.showIcon ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(iconWrap))
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(unref(Icon), { size: 20 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(iconMap[_ctx.type])))
                ]),
                _: 1
              })
            ])
          ], 2)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass(unref(contentClass))
          }, [
            _ctx.title ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(unref(titleClass))
            }, toDisplayString(_ctx.title), 3)) : createCommentVNode("", true),
            _ctx.message ? (openBlock(), createElementBlock("p", {
              key: 1,
              class: normalizeClass(unref(messageClass))
            }, toDisplayString(_ctx.message), 3)) : createCommentVNode("", true)
          ], 2),
          createElementVNode("span", {
            class: normalizeClass(unref(delIcon)),
            onClick: close
          }, " \u2715 ", 2)
        ], 64)) : (openBlock(), createBlock(unref(CustomRender), {
          key: 1,
          render: () => _ctx.render && _ctx.render({ close })
        }, null, 8, ["render"]))
      ], 34);
    };
  }
});
const AlertContainer = defineComponent({
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
    const rootClass = style`left-1/2 -translate-x-1/2 w-96 fixed z-alert top-1` + " alert-open";
    const transitionGroupClass = {
      "enter-from-class": tw`opacity-0`,
      "leave-to-class": tw`opacity-0`,
      "leave-active-class": tw`absolute w-full`
    };
    return () => h("div", {
      class: rootClass
    }, [h(TransitionGroup, Object.assign(Object.assign({}, transitionGroupClass), {
      tag: "div"
    }), {
      default: () => props.alertList.map((option) => h(_sfc_main, Object.assign(Object.assign({}, option.props), {
        key: option.id,
        onClose: () => {
          remove2(option.id);
        }
      })))
    })]);
  }
});
const alertList = ref([]);
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
    mountComponent(h(AlertContainer, {
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
  return inject(key || alertKey);
}
export { Alert as toast, toastInstall, useToast };
